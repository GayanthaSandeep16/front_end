import './css/mstyle.css';
import {useNavigate} from "react-router-dom";

export default function MembershipForm() {

    const navigate = useNavigate();

    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        navigate('/demo');
    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="form-container">
                <h2>Membership</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="Enter your Email" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>National ID</label>
                            <input type="text" placeholder="200019356778" />
                        </div>
                        <div>
                            <label>Sector</label>
                            <input type="text" placeholder="Enter your Sector" />
                        </div>
                    </div>
                    <div>
                        <label>Organization Name</label>
                        <input type="text" placeholder="Colombo Hospital" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Enter your Password" />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Re-enter your Password" />
                        </div>
                    </div>
                    <div>
                        <label>Tell us why you use this</label>
                        <textarea placeholder="Tell us.."></textarea>
                    </div>
                     <button onClick={handleSubmit} >Create Account</button>
                </form>
                <p className="text-center text-sm mt-4">Already have an account? <a href="/sign-in" className="text-blue-500 font-semibold">Log in</a></p>
            </div>
        </div>
    );
}
