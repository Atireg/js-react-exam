import { Routes, Route } from 'react-router'

import Header from './components/header/Header'
import ProjectDetails from './components/project-details/ProjectDetails'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import ProjectAdd from './components/project-add/ProjectAdd'
import ProjectsCatalog from './components/projects-catalog/ProjectsCatalog'
import ProjectEdit from './components/project-edit/ProjectEdit'
import { useState } from 'react'
import './App.css'

function App() {

	//TODO Change this later

	const [user, setUser] = useState('');

	const userLoginHandler = (authData) => {
		setUser(authData.email);

		console.log(authData);
		
	}

	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/projects' element={<ProjectsCatalog />}/>
				<Route path='/projects/add' element={<ProjectAdd />}/>
				<Route path='/projects/:projectId/edit' element={<ProjectEdit />}/>
				<Route path='/projects/:projectId/details' element={<ProjectDetails user={user} />}/>

				<Route path='/login' element={<Login onLogin={userLoginHandler}/>}/>
			</Routes>

			<Footer />
		</>
	)
}

export default App
