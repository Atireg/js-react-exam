import { Link, useNavigate } from 'react-router'
import { useRegister } from '../../api/authApi';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
    
export default function Register(){
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler }  = useContext(UserContext);
    
    const registerHandler = async (formData) => {
        console.log(Object.fromEntries(formData));
        
        const { email, password } = Object.fromEntries(formData);

        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword){
            //TODO Add error handling logic
            return;
        }

        const authData = await register(email, password);

        userLoginHandler(authData);

        navigate('/');

    }

    //TODO Add this:

    // const [ _, registerAction, isPending ] = useActionState(registerHandler, { email: '', password: '' });

    return (
        <div className="centered-container">
            <h2>Register</h2>
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
                    <label htmlFor="co-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <button type="submit">Register</button>
                <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}