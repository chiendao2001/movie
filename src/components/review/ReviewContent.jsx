import Movie from '../movie/Movie'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const ReviewContent = props => {
    const history = useHistory()
    
    const token = `Bearer ${localStorage.getItem('token')}`

    //Remove review from the user and movie data
    const removeReview = async (id) => {
        //Remove from the user
        const url = 'https://limitless-wildwood-09344.herokuapp.com/user/reviews/delete'
        const data = {username: localStorage.getItem('username'), id: id}
        await axios.put(url, data, {params: {id: 'new'}, headers: {authorization: token}})

        //Remove from the movie
        const url2 = 'https://limitless-wildwood-09344.herokuapp.com/movies/reviews/delete'
        const data2 = {username: localStorage.getItem('username'), id: props.id}
        await axios.put(url2, data2, {headers: {authorization: token}})

        //Refresh after the review has been removed
        history.go(0)
    }

    return (
        <>
            <button type="button" 
                    className="btn btn-primary" 
                    onClick = {() => removeReview(props.id)}>
                            Remove</button>        
            <Movie key = {props.id} id = {props.id}/>
            <p>{props.content}</p>
        </>
    )
}

export default ReviewContent