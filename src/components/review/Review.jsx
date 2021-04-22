import axios from "axios"
import { useEffect, useState } from "react"
import Nav from '../navbar/Nav'
import ReviewContent from './ReviewContent'

const Review = () => {
    const [reviews, setReviews] = useState({})

    const token = localStorage.getItem('token')

    //Get all reviews of a user
    const getReviews = async () => {
        const url = 'https://limitless-wildwood-09344.herokuapp.com/reviews'
        const auth = `Bearer ${token}`
        let data = null
        if (token.length !== 0) data = (await axios.get(url, 
                    {
                        params: {username: localStorage.getItem('username')},
                        headers: {authorization: auth}
                    })).data
        setReviews(data)
    }

    useEffect(() => {
        getReviews()
    },[])

    return (
        <>
            <Nav/>
            {reviews != null ? Object.entries(reviews).map(item =>
                                <div key = {item[0]}>
                                    <ReviewContent id = {item[0]} content = {item[1]}/>
                                </div>)
                             : (token.length === 0 && <h3>
                                 No reviews. Please log in to use this feature
                             </h3>)}
        </>
    )
}

export default Review