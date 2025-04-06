import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserData } from './context/UserContext'
import { Loading } from './components/Loading'
import Navbar from './components/Navbar'
import TrailPage from './pages/TrailPage'
import Create from './pages/Create'

const App = () => {
    const {loading, isAuth, user} = UserData();
    return (
        <>
            {
                loading ? <Loading/> : 
                <BrowserRouter>
                    {isAuth && <Navbar user={user} />}
                    <Routes>
                        <Route path="/" element={isAuth ? <Home /> : <Login/>} />
                        <Route path="/create" element={isAuth ? <Create/> : <Login/>} />
                        <Route path="/trail/:id" element={isAuth ? <TrailPage user={user}/> : <Login/>} />
                        <Route path="/login" element={isAuth ? <Home /> : <Login/>} />
                        <Route path="/register" element={isAuth ? <Home /> : <Register/>} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    )
}

export default App