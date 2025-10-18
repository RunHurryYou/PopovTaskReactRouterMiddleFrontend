import './App.css'
import { Routes, Route } from 'react-router-dom'
import {publickRoutes} from './routes/routes'
import { Home } from './pages/Home/Home'
import { Characters } from './pages/Characters/Characters'
import { Locations } from './pages/Locations/Locations'
import { Episodes } from './pages/Episodes/Episodes'
import { NotFound } from './pages/NotFound/NotFound'
import { CharacterCard } from './pages/CharacterCard/CharacterCard'
import { LocationCard } from './pages/LocationCard/LocationCard'
import { EpisodeCard } from './pages/EpisodeCard/EpisodeCard'
import { Login } from './pages/Login/Login'
import { AuthProvider } from './context/AuthProvider/AuthProvider'
import { HeaderLayout } from './layout/HeaderLayout'
import { PrivateRoute } from './components/PrivateRoute'

function App() {	
	return (
		<>
		<AuthProvider>
				<Routes>
					<Route element={<HeaderLayout />}>
						<Route path={publickRoutes.home} element={<Home />} />
						<Route path={publickRoutes.characters}>
							<Route index element={<PrivateRoute><Characters /></PrivateRoute>} />
							<Route path=":id" element={<PrivateRoute><CharacterCard /></PrivateRoute>} />
						</Route>
						<Route path={publickRoutes.locations}>
							<Route index element={<PrivateRoute><Locations /></PrivateRoute>} />
							<Route path=":id" element={<PrivateRoute><LocationCard /></PrivateRoute>} />
						</Route>
						<Route path={publickRoutes.episodes}>
							<Route index element={<PrivateRoute><Episodes /></PrivateRoute>} />
							<Route path=":id" element={<PrivateRoute><EpisodeCard /></PrivateRoute>} />
						</Route>
						<Route path={publickRoutes.login} element={<Login/>} />
						<Route path={publickRoutes.notFound} element={<NotFound />} />
					</Route>
				</Routes>
			</AuthProvider>
		</>
		
	)
}

export default App
