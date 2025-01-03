import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { loginValidation } from "../../validation/validationSchema";
import { auth, loginUser } from "../../database/firebaseAuth";
import { setLoginUserDataToRedux } from "../../features/auth/authSlice";
import { createUserProfile, getProfile } from "../../database/firebaseUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

// LogInPage Component
function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  // Check if user is already logged in (via localStorage or Redux)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setLoginUserDataToRedux(user));
      // Navigate based on user role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [dispatch, navigate]);

  const onSubmit = async (data) => {
    const resp = await loginUser(data);
    try {
      if (resp.error) {
        return;
      }

      // Login User;
      let userProfile = await getProfile(resp.id);
      const loginUserInfo = {
        id: resp.id,
        email: resp.email,
        name: userProfile.name,
        role: userProfile.role,
      };

      // Save user data to Redux
      dispatch(setLoginUserDataToRedux(loginUserInfo));

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(loginUserInfo));

      reset();

      // Navigate based on user role
      if (loginUserInfo.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const resp = await signInWithPopup(auth, googleAuthProvider);
      const user = resp.user;

      const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };

      const userProfile = await getProfile(user.uid);

      if (!userProfile || userProfile.email !== user.email) {
        // Create a new user profile
        createUserProfile({
          ...newUser,
          role: "user", // Default role
        });

        dispatch(
          setLoginUserDataToRedux({
            ...newUser,
            role: "user",
          })
        );
      } else {
        // Set user information to Redux
        dispatch(
          setLoginUserDataToRedux({
            ...newUser,
            role: userProfile.role,
          })
        );
      }

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));

      // Navigate based on user role
      if (newUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Clear user data from Redux store
    dispatch(setLoginUserDataToRedux(null));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Sign in to your account
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Please login with your credentials or Google account.
        </p>

        {/* Login with Email and Password */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Separator className="mb-4" />

          <div className="relative mb-4">
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative mb-4">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-6">
            Login
          </Button>
        </form>

        <Separator className="my-6" />

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="flex items-center justify-center w-full px-4 py-2 mt-4 space-x-3 bg-white border rounded-md hover:bg-gray-200"
        >
          {/* Google SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24" // ছোট আকারের জন্য
            height="24"
            className="z-50 mr-2"
          >
            <path
              fill="#4285F4"
              d="M23.49 12.28c0-.74-.06-1.44-.18-2.11H12v4.15h6.36c-.27 1.44-1.06 2.66-2.26 3.34v2.76h3.64c2.13-1.96 3.34-4.89 3.34-8.14z"
            ></path>
            <path
              fill="#34A853"
              d="M12 7.29c1.12 0 2.07.38 2.83 1.01l2.11-2.11C15.55 4.33 13.76 3 12 3 8.69 3 6 5.69 6 8.99c0 1.18.36 2.26.98 3.14l2.11-2.11c-.66-.93-1.04-2.08-1.04-3.03C9.99 5.71 10.94 7.29 12 7.29z"
            ></path>
            <path
              fill="#FBBC05"
              d="M9.98 5.29c-.66-.93-1.04-2.08-1.04-3.03 0-1.22.36-2.34.98-3.14l-2.11 2.11c-.92-.66-2.08-1.04-3.03-1.04C2.74 1 1 2.74 1 4.99c0 1.25.46 2.38 1.23 3.22l2.11-2.11c-.28-.39-.43-.87-.43-1.37 0-.98.4-1.88 1.02-2.55 1.16 1.2 2.84 1.88 4.79 1.88z"
            ></path>
            <path
              fill="#EA4335"
              d="M12 3c-1.76 0-3.42.58-4.79 1.58L4.1 2.47C5.79 1.3 8.19 0 10.99 0c2.54 0 4.85.93 6.62 2.55l-2.11 2.11c-1.19-.81-2.66-1.27-4.2-1.27z"
            ></path>
          </svg>
          <span>Login with Google</span>
        </Button>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;
