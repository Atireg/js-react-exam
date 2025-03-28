import { Routes, Route } from 'react-router'

import Header from './components/header/Header'
import Details from './components/details/Details'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import './App.css'

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/login' element={<Login />}/>
				<Route path='/projects' element={<Details />}/>
				//TO DOs: Add all routes
			</Routes>

			<Footer />
		</>
	)
}

export default App
