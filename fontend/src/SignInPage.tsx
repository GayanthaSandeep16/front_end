import { useSignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  const { signIn } = useSignIn();

  if (!signIn) {
    return null; // Handle loading state if needed
  }

  const handleGoogleSignIn = () => {
    signIn
      .authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: 'http://localhost:5173/sign-up/',  
        redirectUrlComplete: '/member',
      })
      .then((res) => {
        console.log('OAuth successful:', res);
      })
      .catch((err) => {
        console.error('OAuth error:', err);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignInPage;