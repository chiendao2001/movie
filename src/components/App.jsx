import {Switch, Route} from 'react-router-dom'
import Register from './login/Register'
import Login from './login/Login'
import Home from './home/Home'
import Result from './search/Result'
import Details from './details/Details'
import Watchlist from './watchlist/Watchlist.jsx'
import Review from './review/Review'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
    return (
        <>
            <Switch>
                <Route path = '/watchlist'><Watchlist/></Route>
                <Route path = '/reviews'><Review/></Route>
                <Route path = '/search/:title'><Result/></Route>
                <Route path = '/register'><Register/></Route>
                <Route path = '/login'><Login/></Route>
                <Route path = '/:movieName'><Details/></Route>
                <Route path = '/' exact><Home/></Route>
            </Switch>
        </>
    )
}

export default App