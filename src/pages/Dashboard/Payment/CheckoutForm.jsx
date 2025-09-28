import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCarts();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate()

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log(`payment error`, error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }


    //payment confirm
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          categories: cart.map((item)=>item.category),
          cartIds: cart.map((item) => item._id),
          menuItemId: cart.map((item) => item.menuId),
          status: "pending",
        };
        console.log(payment)
        try {
          const res = await axiosSecure.post("/payments", payment);
          // console.log("Server response:", res.data);
          refetch()
          if (
            res.status === 200 &&
            res.data?.paymentResult?.insertedId // check backend response
          ) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thanks for your payment, it was successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/dashboard/paymentHistory')
          }
        } catch (error) {
          console.error("Payment API error:", error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Payment failed. Please try again.",
          });
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-ghost bg-orange-400 mt-6"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>

        <p className="text-red-500">{error}</p>
        {transactionId && (
          <p className="text-green-400">
            {" "}
            Your Transaction Id : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
