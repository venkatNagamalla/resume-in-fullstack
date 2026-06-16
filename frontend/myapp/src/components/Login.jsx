import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@gmail.com")) {
      setErrorState(true);
      setError("Enter valid email!");
    } else if (password === "") {
      setErrorState(true);
      setError("Enter Password!");
    } else {
      setLoading(true);
      setErrorState(false);
      setError("");
      const url = "https://resume-in-backend.onrender.com/auth/login";
      const userData = JSON.stringify({ email, password });
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        const err = await response.json();
        setErrorState(true);
        setLoading(false);
        setError(err.message);
        return;
      }
      const data = await response.json();

      localStorage.setItem("token", data.token);
      setLoading(false);
      navigate("/", { replace: true });
    }
  };

  const handleShowPass = () => setShowPass((prev) => !prev);

  const renderLogin = () => (
    <form className="p-2 flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="bg-gray-300 text-sm rounded outline-0 mt-1 px-2 h-8"
          placeholder="Enter email here..."
        />
      </div>
      <div className="flex flex-col mt-3">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={`${showPass ? "text" : "password"}`}
          id="password"
          className="bg-gray-300 text-sm rounded outline-0 mt-1 px-2 h-8"
          placeholder="Enter password here..."
        />
      </div>
      <div className="mt-3 flex items-center">
        <input
          onClick={handleShowPass}
          id="loginShowPass"
          className="h-4 w-4"
          type="checkbox"
        />
        <label
          htmlFor="loginShowPass"
          className="ml-1 text-sm font-semibold cursor-pointer"
        >
          Show Password
        </label>
      </div>
      <p className="text-xs mt-1 text-red-500">
        {errorState ? `*${error}` : ""}
      </p>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-[#B500B2] text-center rounded cursor-pointer text-white px-3 mt-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>
      <p className="text-center mt-3 text-sm">
        Not Registered?{" "}
        <Link className="text-[#B500B2]" to="/register">
          Create
        </Link>{" "}
        an Account
      </p>
    </form>
  );

  return (
    <section className="p-2 min-h-screen flex flex-col md:flex-row border border-black justify-center items-center">
      <div className="md:flex flex-col w-[90%] md:w-[40%] lg:w-[35%] md:mr-4">
        <div className="md:flex flex-col justify-start items-start md:p-2">
          <h1 className="text-[#B500B2] font-semibold text-center head-font text-2xl md:text-4xl lg:text-6xl">
            Resume In
          </h1>
          <p className="text-sm md:text-md lg:text-lg mt-2 text-center">
            AI-powered resume analysis in seconds
          </p>
        </div>
        {/** laptop card */}
        <div className="hidden md:flex rounded-2xl px-2 py-4 mb-2 flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#1a1a2e] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs">🤖</span>
              </div>
              <p className="text-md text-gray-600">
                AI analysis powered by Gemini
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#1a1a2e] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs">⚡</span>
              </div>
              <p className="text-md text-gray-600">
                Get results in under 10 seconds
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#1a1a2e] rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-md text-gray-600">
                Score, skills, strengths and suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 w-[90%] border border-gray-400 hover:border-[#B500B2] md:w-[50%] lg:w-[40%] xl:w-[35%] py-6 rounded-xl px-2 md:px-3">
        <h3 className="text-md font-semibold md:text-lg text-center">
          login here
        </h3>
        {renderLogin()}
      </div>
    </section>
  );
};

export default Login;
