import { Routes, Route } from 'react-router';

import UserProvider from './providers/UserProvider';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Register from './components/register/Register';
import ProjectsCatalog from './components/projects-catalog/ProjectsCatalog';
import ProjectDetails from './components/project-details/ProjectDetails';
import ProjectAdd from './components/project-add/ProjectAdd';
import ProjectEdit from './components/project-edit/ProjectEdit';

import './App.css';

function App() {
	return (
		<UserProvider>
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/projects' element={<ProjectsCatalog />}/>
				<Route path='/projects/add' element={<ProjectAdd />}/>
				<Route path='/projects/:projectId/edit' element={<ProjectEdit />}/>
				<Route path='/projects/:projectId/details' element={<ProjectDetails />}/>

				<Route path='/login' element={<Login />}/>
				<Route path='/register' element={<Register />}/>
				<Route path='/logout' element={<Logout />}/>
			</Routes>

			<Footer />
		</>
		</UserProvider>
	)
}

export default App
