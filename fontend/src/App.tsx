import { Routes, Route } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import Demo from './Demo';
import SignInPage from './SignInPage';
import MemberPage from './MemberPage'; // Import the MemberPage component

const App = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/member" element={<MemberPage />} />
    </Routes>
  );
};

export default App;
