import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// Interface for API response
interface LoginResponse {
  jwt_token: string;
  error_msg?: string;
}

const SignupForm: React.FC = () => {
  // State management with useState
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSubmitError, setShowSubmitError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useNavigate replaces history from props
  const navigate = useNavigate();

  // Event handlers
  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
    setShowSubmitError(false); // Clear error when typing
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setShowSubmitError(false); // Clear error when typing
  };

  const onSubmitSuccess = (jwtToken: string): void => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMessage: string): void => {
    setShowSubmitError(true);
    setErrorMsg(errorMessage);
    setIsLoading(false);
  };

  const submitForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setShowSubmitError(false);

    const userDetails = { username, password };
    const url = "http://localhost:3000/signup";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(url, userDetails, options);

      console.log(response);
      alert("Signed Up");
      setIsLoading(false);

      navigate("/login", {replace : true});
    } catch (error) {
      onSubmitFailure("Network error occurred");
    }
  };

  const renderPasswordField = (): React.ReactNode => {
    return (
      <div className="w-full">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          value={password}
          onChange={onChangePassword}
          placeholder="Enter your password"
          required
        />
      </div>
    );
  };

  const renderUsernameField = (): React.ReactNode => {
    return (
      <div className="w-full">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          value={username}
          onChange={onChangeUsername}
          placeholder="Enter your username"
          required
        />
      </div>
    );
  };

  // Early return for authenticated users
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please sign up to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={submitForm}>
            {renderUsernameField()}
            {renderPasswordField()}

            {/* Error Message */}
            {showSubmitError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 transform ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
              } shadow-lg`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
