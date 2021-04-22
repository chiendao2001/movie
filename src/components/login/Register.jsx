import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import {Formik, Field, Form} from 'formik'

const Register = () => {
    const [status, setStatus] = useState(null)

    //Send data to the server
    const sendData = async (data) => {
        const server = 'https://limitless-wildwood-09344.herokuapp.com'

        //Email or username exists
        if (await isCreated(`${server}/users`, data.email, data.username)) {
            console.log(status)
            setStatus(false)
        } 
        
        //
        else {
            try {
                setStatus(true)
                await axios.post(`${server}/register`, data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    //Check if username or email already exists
    const isCreated = async (url, email, username) => {
        try {
            const user = await axios.get(url, {
                params: {
                         email: email,
                         username: username
                        }
            })
           
            return user.data.length === 0 ? false : true
        } catch (error) {
           console.log(error)
        }
    }

    //Show user if they register successfully
    const notify = () => {
        if (status) {
            return (
                <div>
                    <span>Register successfully! </span>
                    <Link to = '/login'>Log in now</Link>
                </div>
            )
        } else if (status === false) {
            return <p>Username or email already exists</p>
        }
    }

    return (
        <div>
            <Formik initialValues={{ email: '', username: '', password: '' }}
                    onSubmit = {async (data, {setSubmitting}) => {
                        setSubmitting(true)
                        sendData(data)
                        setSubmitting(false)
                    }}>
                {({isSubmitting}) => (
                    <Form>
                        <Field required type = "email" name = "email" />
                        <Field required type = "text" name = "username" />
                        <Field required type = "password" name = "password" />
                        <button disabled = {isSubmitting || status === true}
                                type = 'submit'
                                className = 'btn btn-primary'>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
            <Link to = '/login'>Already a member? Log in here!</Link>
            {notify()}
        </div>    
    )
}

export default Register