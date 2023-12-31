import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUserWithEmail, SignInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const toastId = toast.loading("Logging in ...");
    try {
      loginUserWithEmail(email, password)
        .then((res) => {
          console.log(res.user);
          toast.success("Login successful", { id: toastId });
          navigate(location?.state ? location.state : "/");
        })
        .catch((err) => toast.error(err?.message, { id: toastId }));
    } catch (error) {
      toast.error(error?.message, { id: toastId });
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    try {
      SignInWithGoogle().then((res) => {
        console.log(res.user?.displayName);
        toast.success("Login Successful...");
        navigate(location?.state ? location.state : "/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-slate-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {"Don’t"} have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-slate-700 text-base hover:underline dark:text-slate-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              <div className="optional flex justify-center items-center">
                <hr className="w-full flex-1" />
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 border py-2 px-6 text-gray-900 dark:text-white rounded-lg"
                >
                  <FcGoogle className="text-2xl" />
                  Login with Google
                </button>
                <hr className="w-full flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
