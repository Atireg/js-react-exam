import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router"
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler }  = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        const authData = await login(values.email, values.password);
        
        userLoginHandler(authData);

        // navigate('/projects');

        navigate(-1);

        //TODO Check the server --> do not return the password

        return values;
    }

    const [ _, loginAction, isPending ] = useActionState(loginHandler, { email: '', password: '' });
    
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
                <button type="submit" disabled={isPending}>Login</button>
                <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}