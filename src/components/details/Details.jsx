import { useLocation } from 'react-router'
import Nav from '../navbar/Nav'
import WatchlistButton from './WatchlistButton'
import ReviewButton from './ReviewButton'
import AllReviews from './AllReviews'
import { useEffect, useState } from 'react'

const Details = () => {
    const [url, setUrl] = useState('')
    const info = useLocation().state.info

    useEffect(() => {
        const url = `https://image.tmdb.org/t/p/w200/${info.poster}`
        setUrl(url)
    }, [])

    return (
        <>
            <Nav/>
            <img src = {url} alt=""/>
            <div>
                <h3>{info.title}</h3>
                <p><b>Rating:</b> {info.rating}</p>
                <p>{info.overview}</p>
            </div>
            {localStorage.getItem('token').length !== 0 ? 
                <>
                    <WatchlistButton id = {info._id} title = {info.title}/>
                    <ReviewButton info = {info}/>
                </> : <p>Log in to review this film</p>}
            
            <AllReviews id = {info._id}/>
        </>
    )
}

export default Details