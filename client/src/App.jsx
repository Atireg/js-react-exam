import { Routes, Route } from 'react-router'

import Header from './components/header/Header'
import Details from './components/details/Details'
import Footer from './components/footer/Footer'
import './App.css'

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Details />}/>
			</Routes>
			{/* <Details /> */}
			<Footer />
		</>
	)
}

export default App
