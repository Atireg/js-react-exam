export default function Login(){
    return(
        <div class="login-container">
        <h2>Login</h2>
        <form action="dashboard.html" method="POST">
            <div class="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Login</button>
            <p class="register-link">Don't have an account? <a href="register.html">Register</a></p>
        </form>
    </div>
    )
}