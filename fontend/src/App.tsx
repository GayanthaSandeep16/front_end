import { Routes, Route } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import Demo from './Demo';
import SignInPage from './SignInPage';
import MemberPage from './MemberPage'; // Import the MemberPage component
import { SignUp } from '@clerk/clerk-react';

const App = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/sign-up/sso-callback"
        element={<SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl="/member" />}
      />
      <Route path="/member" element={<MemberPage />} /> {/* Route for the member page */}
    </Routes>
  );
};

export default App;