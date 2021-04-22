import axios from "axios"

const { useState } = require("react")


const ReviewButton = props => {
    const [isReviewed, setIsReviewed] = useState(false)

    const [content, setContent] = useState('')

    const token = `Bearer ${localStorage.getItem('token')}`

    const username = localStorage.getItem('username')

    //Add a review to the user's data
    const addReviewToUser = async () => {
        const url = 'https://limitless-wildwood-09344.herokuapp.com/review/add'
        const review = {username: localStorage.getItem('username'), id: props.info._id, content: content}
        axios.post(url, review, {headers: {authorization:token}})
    }

    //Add a review to the movie's data
    const addReviewToMovie = async () => {
        //Add a review to an existing movie
        if (await isInDatabase(props.info._id)) {
            const url = 'https://limitless-wildwood-09344.herokuapp.com/movies/reviews/add'
            await axios.put(url, 
                            {id: props.info._id, username: username, content}, 
                            {headers: {authorization: token}})
        }
        
        //Add the movie to the database if it has no reviews yet
        else {
            const url = 'https://limitless-wildwood-09344.herokuapp.com/movies/add'
            const movie = {
                id: props.info._id,
                title: props.info.title,
                overview: props.info.overview,
                poster_path: props.info.poster,
                vote_average: props.info.rating,
                reviews: {[username]: content} 
            }
            await axios.post(url, {movie: movie}, {headers: {authorization: token}})
        }
    } 

    //Check if a movie is in the database 
    const isInDatabase = async id => {
        const url = 'https://limitless-wildwood-09344.herokuapp.com/data/movies'
        const data = (await axios.get(url, {params: {id: id}, headers: {authorization: token}})).data
        return data.length == 0 ? false : true
    }

    return (
        <>
             <button type="button" 
                    className = "btn btn-primary" 
                    onClick = {() => setIsReviewed(prev => !prev)}>
                        Review
            </button>
            {isReviewed && <>
                                <textarea name="content"
                                 onChange = {event => setContent(event.target.value)} 
                                 value = {content}
                                 cols="30" rows="10"></textarea>
                                <button type="button" 
                                        onClick = {() => {
                                            addReviewToUser() 
                                            addReviewToMovie()
                                            setIsReviewed(prev => !prev)
                                        }}
                                        className = "btn btn-primary">Save</button>                          
                           </>}
        </>
    )
}

export default ReviewButton