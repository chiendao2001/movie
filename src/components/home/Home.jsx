import Trend from './Trend.jsx'
import Nav from '../navbar/Nav'

const Home = props => {
    const {token, username} = props

   return (
     <>
         <Nav/>
         <h1>Trending today</h1>
         <Trend token = {token} username = {username}/>
     </>
   )
}

export default Home
