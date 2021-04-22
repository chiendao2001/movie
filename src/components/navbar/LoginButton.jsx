const Login = () => {
    const setButton = () => {
        const token = localStorage.getItem('token')

        if (token != null && token.length === 0) {
            return  (
                <li className="nav-item">
                    <a className="nav-link" href="/login">
                        Login
                    </a>
                </li>
            )
        } 
        return (
            <li className="nav-item">
                <a className="nav-link" 
                href="/"
                    onClick = {() => {
                        localStorage.setItem('token', '')
                        localStorage.setItem('username', '')}}> 
                    Logout
                </a>
          </li>
        )
        
    }
    return setButton()
}

export default Login