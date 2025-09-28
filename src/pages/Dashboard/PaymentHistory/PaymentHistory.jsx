import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <SectionTitle
        heading={"Payment History"}
        subHeading={"give and take"}
      ></SectionTitle>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Total payment : {payments.length}</h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>price</th>
                  <th>Transaction Id</th>
                  <th>category</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>${payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>
                      {Array.isArray(payment.categories)
                        ? payment.categories.join(", ")
                        : payment.categories || "N/A"}
                    </td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
