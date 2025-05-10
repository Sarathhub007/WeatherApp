import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-wrapper">
        <SignIn path="/login" routing="path" />
      </div>
    </div>
  );
};

export default Login;
