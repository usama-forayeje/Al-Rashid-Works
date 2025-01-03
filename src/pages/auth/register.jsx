import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../validation/validationSchema";
import { createUserProfile } from "../../database/firebaseUtils";
import InputPasswordWithHookForm from "../../components/ui/password-input";
import { setLoginUserDataToRedux } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Separator } from "@radix-ui/react-separator";
import { registerUser } from "../../database/firebaseAuth";

// RegisterPage Component
function RegisterPage() {
  const navigate = useNavigate(); // For navigation after registration
  const dispatch = useDispatch(); // To update Redux state

  // Initialize form with validation using React Hook Form and Yup
  const methods = useForm({
    resolver: yupResolver(registerValidation),
  });

  const { reset } = methods;

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      // Register the user
      const resp = await registerUser(formData);

      // Handle errors from Firebase
      if (resp.error) {
        if (resp.error.code === "auth/email-already-in-use") {
          methods.setError("email", {
            type: "manual",
            message: "Email is already in use",
          });
        }
        return;
      }

      // Create a new user profile in the database
      await createUserProfile({
        id: resp.id,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: "user", // Default role for new users
      });

      // Update Redux store with user data
      dispatch(
        setLoginUserDataToRedux({
          id: resp.id,
          email: formData.email,
          role: "user",
        })
      );

      // Reset the form after successful registration
      reset();

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Create your account
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Welcome! Please fill in the details to get started.
        </p>

        {/* FormProvider wraps the form for context sharing */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Separator className="mb-4" />

            {/* First and Last Name Fields */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <label className="text-sm font-medium text-gray-700">
                  First name
                </label>
                <Input
                  {...methods.register("firstName")}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full mt-2"
                />
                {methods.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {methods.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="relative flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Last name
                </label>
                <Input
                  {...methods.register("lastName")}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full mt-2"
                />
                {methods.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {methods.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="relative mt-4">
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                {...methods.register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2"
              />
              {methods.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full mt-4">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <InputPasswordWithHookForm
                name="password"
                placeholder="Enter your password"
                className="w-full mt-2"
                setValue={methods.setValue}
              />
              {methods.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-6">
              Continue
            </Button>
          </form>
        </FormProvider>

        {/* Redirect to Login Page */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
