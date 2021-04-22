import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import Movie from '../movie/Movie'
import Nav from '../navbar/Nav'


const Watchlist = () => {
  const [ids, setIds] = useState({})

  const history = useHistory()

  useEffect(() => {
      const getWatchlist = async () => {
      const username = localStorage.getItem('username')
      let data = null
      const token = `Bearer ${localStorage.getItem('token')}`
      const url = `https://limitless-wildwood-09344.herokuapp.com/${username}/watchlist`
      if (localStorage.getItem('username').length!==0) {
         data = (await axios.get(url, {headers: {authorization: token}})).data
      }
      setIds(data)
    }
    getWatchlist()   
  }, [])

  //Remove a film from watchlist 
  const removeFromWatchlist = async (id) => {
    const url = 'https://limitless-wildwood-09344.herokuapp.com/watchlist/delete'
    const token = `Bearer ${localStorage.getItem('token')}`
    const data = {username: localStorage.getItem('username'), id: id}
    await axios.put(url, data, {headers: {authorization: token}})
    history.go(0)
  }

  const showMovies = ids => {
    return (Object.entries(ids).map(item => 
      <div key = {item[0]}>
         <Movie id = {item[0]}/>
          <button type="button"
                  className="btn btn-primary" 
                  onClick = {() => removeFromWatchlist(item[0])}>
              Remove
          </button>        
      </div>)) 
  } 
  console.log(ids)

  return (
    <>
      <Nav/>
      {(ids !== null) ? (ids.length != 0 ? showMovies(ids) : <h3>You don't have any movies in your watchlist</h3>)
         : <h3>Nothing in watchlist. Please log in to use this feature</h3>}
    </>
  )
}

export default Watchlist
