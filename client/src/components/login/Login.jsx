import { Link } from "react-router"

export default function Login() {
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form action="dashboard.html" method="POST">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">Don't have an account? <Link to="register.html">Register</Link></p>
            </form>
        </div>
    )
}