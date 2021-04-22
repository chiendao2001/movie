import axios from "axios"
import { useEffect, useState } from "react"


const AllReviews = props => {
    const [reviews, setReviews] = useState({})

    //Get all reviews for a film 
    const getAllReviews = async () => {
        const url = 'https://limitless-wildwood-09344.herokuapp.com/data/movies'
        const token = `Bearer ${localStorage.getItem('token')}`
        const movie = (await axios.get(url, {params: {id: props.id}, headers: {authorization: token}})).data   
        setReviews(movie.reviews)
    }

    useEffect(() => getAllReviews(), [])

    //Create all reviews for the film 
    const createReviews = () => {
        if (reviews == null) return <p>There is no reviews for this movie yet</p>
        return Object.entries(reviews).map(
            (item, index) => <div key = {index}>
                                  <h5>{item[0]}</h5>
                                  <p>{item[1]}</p>
                             </div>)  
    }

    return (
        <>
            <h3>Reviews</h3>
            {createReviews()}           
        </>
    )
}

export default AllReviews