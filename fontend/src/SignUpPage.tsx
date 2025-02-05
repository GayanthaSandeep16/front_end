import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        // Redirect to the member page after sign-up
      />
    </div>
  );
};

export default SignUpPage;