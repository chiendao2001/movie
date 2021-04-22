import {Formik, Form, Field} from 'formik'
import {useHistory, useLocation} from 'react-router-dom'

const Search = () => {
    const history = useHistory()

    const location = useLocation()

    return (
        <>
            <Formik initialValues={{title: ''}}
                        onSubmit = {data => {
                            history.push({
                                pathname: `/search/${data.title}`,
                                state: {title: data.title}
                            }) 
                            //Refresh the search to see new results if the user is already on search page
                            location.pathname.includes('search') && history.go(0)
                        }}>

                    {() => (
                        <Form>
                            <Field className="form-control me-2" 
                                placeholder="Search"
                                aria-label="Search" 
                                required type = "text"
                                name = "title" />
                                    <button className="btn btn-outline-success" type="submit">
                                        Search
                                    </button>
                        </Form>)}

                </Formik>
        </>     
    )
}
export default Search