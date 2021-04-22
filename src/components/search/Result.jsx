import {useLocation} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Movie from '../movie/Movie'
import Nav from '../navbar/Nav'

const Result = () => {
    const [results, setResults] = useState([])

    const location = useLocation()

    const title = location.state.title

    console.log(title)
    
    useEffect(() => {
        const searchMovie = async () => {
            const url = 'https://limitless-wildwood-09344.herokuapp.com/movies'

            const token = `Bearer ${localStorage.getItem('token')}`
            
            const res = await axios.get(url, {
                params: {title: title},
                headers: {authorization: token}
            })

            setResults(res.data)  
        }
        searchMovie()
    },[])

   return (
       <>
          <Nav/>
          {results.map(movie => <Movie key = {movie._id} id = {movie._id}/>)}
       </>
   )
}

export default Result