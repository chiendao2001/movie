import axios from 'axios'

const WatchlistButton = props => {
    //Add a film to watchlist
    const addToWatchlist = async () => {
        const token = `Bearer ${localStorage.getItem('token')}`
        const data = {username: localStorage.getItem('username'), id: props.id, title: props.title}
        const url = 'https://limitless-wildwood-09344.herokuapp.com/watchlist/add'
        axios.put(url, data, {headers: {authorization: token}})
    }

    return  <button type="button" className="btn btn-primary" onClick = {addToWatchlist}>Watchlist</button>
}

export default WatchlistButton