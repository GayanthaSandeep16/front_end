import {useSignIn, useSession, SignIn} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignInPage = () => {
    const { signIn } = useSignIn();
    const { isSignedIn } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate('/demo');
        }
    }, [isSignedIn, navigate]);

    if (!signIn) {
        return null;
    }

    // const handleGoogleSignIn = () => {
    //     signIn
    //         .authenticateWithRedirect({
    //             strategy: 'oauth_google',
    //             redirectUrl: window.location.origin + '/sign-in/continue', // Complete URL for OAuth redirect
    //             redirectUrlComplete: window.location.origin + '/member',   // Final redirect after successful sign-in
    //         })
    //         .catch((err) => {
    //             console.error('OAuth error:', err);
    //         });
    // };

    return (
        <div>
            <SignIn/>
            {/*<button onClick={handleGoogleSignIn}>Sign in with Google</button>*/}
        </div>
    );
};

export default SignInPage;
