import { Link, useNavigate } from "react-router"

export default function Login({
    onLogin,
}) {
    const navigate = useNavigate();

    const loginAction = (formData) => {
        const email = formData.get('email');
        onLogin(email);

        navigate('/projects')
        
    }
    return (
        <div className="centered-container">
            <h2>Login</h2>
            <form action={loginAction}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}