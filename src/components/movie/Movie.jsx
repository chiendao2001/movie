import axios from "axios"
import {Link} from 'react-router-dom'

const { useEffect, useState } = require("react")

const Movie = props => {
    const [movie,setMovie] = useState({})

    useEffect(() => {
        const getMovie = async () => {
            const token = `Bearer ${localStorage.getItem('token')}`
            const url = `https://limitless-wildwood-09344.herokuapp.com/movies/${props.id}`
            const movie = (await axios.get(url, {headers: {authorization: token}})).data
            setMovie(movie)
        }
        getMovie()
    }, [])

    return (
        <>
            {<img src={`https://image.tmdb.org/t/p/w200/${movie.poster}`} alt=""/>}
                <Link to = {{
                    pathname: `/${movie.title}`,
                    state: {info: movie}
                }}>
                    <h3>{movie.title}</h3>
                </Link>
        </>
    )
}

export default Movie