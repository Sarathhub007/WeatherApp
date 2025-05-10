import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <SignUp path="/signup" routing="path" />
      </div>
    </div>
  );
};

export default Signup;
