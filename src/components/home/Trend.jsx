import axios from 'axios'
import {useEffect, useState} from 'react'
import Poster from './Poster'

const Trend = (props) => {
    const [trendingMovies, setTrendingMovies] = useState([])

    //Get the trending movies of the day
    useEffect(() => {
        const getTrendingMovies = async () => {
            const token = `Bearer ${localStorage.getItem('token')}`
            const url = "https://limitless-wildwood-09344.herokuapp.com/trending"
            const trendingList = (await axios.get(url, {
                headers: {authorization: token}
            })).data
            setTrendingMovies(trendingList)
        }
        getTrendingMovies()
    },[])
  
   return (
       <div className = 'trendinglist'>
          {trendingMovies.map((movie, index) => <Poster key = {index}
                                                        info = {movie}
                                                        username = {props.username}/>)}
       </div>
   )
}

export default Trend