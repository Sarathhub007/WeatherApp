import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">

      <div className="glass-card--bright w-full max-w-md p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center drop-shadow mb-6">
          Welcome Back
        </h1>

        <SignIn
          path="/login"
          routing="path"
          afterSignInUrl="/weather"
          afterSignUpUrl="/weather"
          appearance={{
            baseTheme: "dark",
            elements: {
              card: "bg-transparent shadow-none text-white",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",

              formFieldLabel: "text-white",
              formFieldInput:
                "bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-xl px-3 py-2",
              socialButtonsBlockButton:
                "bg-white/10 border border-white/20 text-white hover:bg-white/20",

              dividerText: "text-gray-400",

              formButtonPrimary:
                "bg-blue-600 text-white rounded-xl py-2 font-semibold hover:bg-blue-700 shadow-lg",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
