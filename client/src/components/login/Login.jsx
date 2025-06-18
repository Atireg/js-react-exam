import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler }  = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        try {
            const authData = await login(values.email, values.password);
            userLoginHandler(authData);
            toast.success('Successful Login!');  

            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);  
        }
    }

    return (
        <div className="centered-container">
            <h2>Anmelden</h2>
            <form className="formAuth" onSubmit={loginHandler}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Passwort</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">Haben Sie noch kein Konto? <Link to="/register">Registrieren</Link></p>
            </form>
        </div>
    )
}