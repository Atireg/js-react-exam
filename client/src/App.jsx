import { useState } from 'react';
import { Routes, Route } from 'react-router';

import { UserContext } from './contexts/UserContext';

import Header from './components/header/Header';
import ProjectDetails from './components/project-details/ProjectDetails';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import ProjectAdd from './components/project-add/ProjectAdd';
import ProjectsCatalog from './components/projects-catalog/ProjectsCatalog';
import ProjectEdit from './components/project-edit/ProjectEdit';

import './App.css';

function App() {
	const [authData, setAuthData] = useState({});

	const userLoginHandler = (resultData) => {
		setAuthData(resultData);		
	};

	return (
		<UserContext.Provider value={{...authData, userLoginHandler}}>
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/projects' element={<ProjectsCatalog />}/>
				<Route path='/projects/add' element={<ProjectAdd />}/>
				<Route path='/projects/:projectId/edit' element={<ProjectEdit />}/>
				<Route path='/projects/:projectId/details' element={<ProjectDetails />}/>

				<Route path='/login' element={<Login />}/>
			</Routes>

			<Footer />
		</>
		</UserContext.Provider>
	)
}

export default App
