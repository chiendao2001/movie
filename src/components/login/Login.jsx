import {useEffect, useState} from 'react'
import axios from 'axios'
import {Formik, Field, Form} from 'formik'
import {useHistory, Link} from 'react-router-dom'


const Login =  () => {
    const [message, setMessage] = useState()

    const [token, setToken] = useState('')

    const [username, setUsername] = useState('')

    const history = useHistory()
    
    const validate = async (user) => {
        console.log('yes')
        const url = 'https://limitless-wildwood-09344.herokuapp.com/login'
        const res = await axios.post(url, user)
        console.log(res.data)
        setUsername(user.username)
        setToken(res.data)
        if (res.status === 200) return false
        if (res.status === 204) return null
        return true
    }

    useEffect(() => { 
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
    })

    return(
        <>
            <Formik initialValues={{username: '', password: '' }}
                    onSubmit = {async (data, {setSubmitting}) => {
                        setSubmitting(true)

                        const status = await validate(data)
                        if (status === null) {
                            setMessage('User does not exist')
                        } else if (status === false) {
                            setMessage('Incorrect password')
                        }  else { 
                            setMessage('Login successfully')
                            history.push('/')                    
                        }

                        setSubmitting(false)
                    }}>

                {({isSubmitting}) => (
                    <Form>
                        <Field required type = "text" name = "username" />
                        <Field required type = "password" name = "password" />
                        <button type = 'button'
                                disabled = {isSubmitting}
                                className = 'btn btn-primary'
                                type = 'submit'>
                            Login
                        </button>
                    </Form>)}

            </Formik>
            <Link to = '/register'>Don't have an account?Register here!</Link> <p></p>
            <p>{message}</p>
        </>
    )
}

export default Login