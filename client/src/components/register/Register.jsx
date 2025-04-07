import { Link, useNavigate } from 'react-router'
import { useRegister } from '../../api/authApi';
import { useUserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify'

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();


    const registerHandler = async (formData) => {
        const values = Object.fromEntries(formData);

        if (values.password !== values.confirmPassword) {
            toast.error('Password and confirm-password don\'t match!');

            return;
        }

        try {
            const authData = await register(values.email, values.password);
            userLoginHandler(authData);
            toast.success('Successful Login!');

            navigate('/');
        } catch (error) {
            console.log(error);

            toast.error(error.message);
        }
    }

    // const [ _, registerAction, isPending ] = useActionState(registerHandler, { email: '', password: '', confirmPassword: '' });

    return (
        <div className="centered-container">
            <h2>Register</h2>
            {/* <form action={registerAction}> */}
            <form action={registerHandler}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
                {/* <button type="submit" disabled={isPending}>Register</button> */}
                <button type="submit">Register</button>
                <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}