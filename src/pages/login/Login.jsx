import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation()

   const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const Data = {email, password}
    console.log(email, password);
    signIn(email, password)
    .then((result) => {
      console.log(result.user);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User login successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
    });
  };
  const handleValidedCaptcha = (e) => {
    const user_Captcha_value = e.target.value;
    console.log(user_Captcha_value);
    if (validateCaptcha(user_Captcha_value)) {
      setDisabled(false);
    } else setDisabled(true);
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | login</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  name="captcha"
                  onBlur={handleValidedCaptcha}
                  type="text"
                  placeholder="Type the Captcha above"
                  className="input input-bordered"
                  // required
                />
              </div>
              <div className="form-control mt-6">
                {/* apply disable re chaptcha  */}
                <button disabled={false} className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <span className="px-6">
              {" "}
              Now here ?
              <Link to={"/signUp"} className="text-red-500">
                Create a new account
              </Link>
              <SocialLogin></SocialLogin>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
