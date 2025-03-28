import { Routes, Route } from 'react-router'

import Header from './components/header/Header'
// import Details from './components/details/Details'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import ProjectAdd from './components/project-add/ProjectAdd'
import ProjectsCatalog from './components/projects-catalog/ProjectsCatalog'
import './App.css'

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/login' element={<Login />}/>
				<Route path='/projects' element={<ProjectsCatalog />}/>
				<Route path='/projects/add' element={<ProjectAdd />}/>
			
				{/* //TO DOs: Add all routes */}
			</Routes>

			<Footer />
		</>
	)
}

export default App
