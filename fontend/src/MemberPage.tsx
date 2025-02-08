import {useState, FormEvent, ChangeEvent, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./css/mstyle.css";
import {useUser} from "@clerk/clerk-react";


interface FormData {
    name: string;
    email: string;
    national_id: string;
    sector: string;
    organization: string;
    reason: string;
    role: string;
    clerk_id: string;
}

export default function MembershipForm() {
    const navigate = useNavigate();
    const {user} = useUser();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        national_id: "",
        sector: "",
        organization: "",
        reason: "",
        role: "User",
        clerk_id: "", // Initially empty
    });

    const [error, setError] = useState<string | null>(null);

    // Ensure clerk_id is updated when user data is available
    useEffect(() => {
        if (user?.id) {
            setFormData((prevData) => ({
                ...prevData,
                clerk_id: user.id, // Assign user ID
            }));
        }
    }, [user]);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!formData.clerk_id) {
            setError("User authentication error: Clerk ID is missing.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/createUser", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/demo");
            } else {
                setError(result.error || "An error occurred during sign-up.");
                console.log(result.error)
            }
        } catch (err) {
            setError("An error occurred while making the request.");
            console.log(err)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="form-container">
                <h2>Membership</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email Field */}
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* National ID Field */}
                    <label htmlFor="national_id">National ID</label>
                    <input
                        type="text"
                        id="national_id"
                        name="national_id"
                        value={formData.national_id}
                        onChange={handleChange}
                        required
                    />

                    {/* Sector Field */}
                    <label htmlFor="sector">Sector</label>
                    <input
                        type="text"
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        required
                    />

                    {/* Organization Field */}
                    <label htmlFor="organization">Organization</label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    />


                    {/* Reason Field */}
                    <label htmlFor="reason">Reason for Joining</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    ></textarea>

                    {/* Error Display */}
                    {error && <div style={{color: "red"}}>{error}</div>}

                    {/* Submit Button */}
                    <button type="submit">Create Account</button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/sign-in" className="text-blue-500 font-semibold">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
