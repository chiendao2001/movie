import { Link } from "react-router-dom"

const Poster = props => {
    const url = `https://image.tmdb.org/t/p/w300${props.info.poster}`

    return (
        <Link to = {{
            pathname: `/${props.info.title}`,
            state: {info: props.info, username: localStorage.getItem('username')}
        }} ><img src= {url} alt=""/></Link>
    )

}

export default Poster