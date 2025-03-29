import { Routes, Route } from 'react-router'

import Header from './components/header/Header'
import ProjectDetails from './components/project-details/ProjectDetails'
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
				<Route path='/projects/:projectId/details' element={<ProjectDetails />}/>
			</Routes>

			<Footer />
		</>
	)
}

export default App
