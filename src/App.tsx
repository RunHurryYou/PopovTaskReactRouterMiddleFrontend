import './App.css'
import { Routes, Route } from 'react-router-dom'
import {publickRoutes} from './shared/config/routes.config'
import { AuthProvider } from './context/AuthProvider/AuthProvider'
import { HeaderLayout } from './layouts/HeaderLayout'
import { PrivateRoute } from './components/PrivateRoute'
import { lazy } from 'react'

const Home = lazy(() => import('./pages/Home/Home').then(module => ({ default: module.Home })));
const Characters = lazy(() => import('./pages/Characters/Characters').then(module => ({ default: module.Characters })));
const Episodes = lazy(() => import('./pages/Episodes/Episodes').then(module => ({ default: module.Episodes })));
const Locations = lazy(() => import('./pages/Locations/Locations').then(module => ({ default: module.Locations })));
const CharacterCard = lazy(() => import('./pages/CharacterCard/CharacterCard').then(module => ({ default: module.CharacterCard })));
const EpisodeCard = lazy(() => import('./pages/EpisodeCard/EpisodeCard').then(module => ({ default: module.EpisodeCard })));
const LocationCard = lazy(() => import('./pages/LocationCard/LocationCard').then(module => ({ default: module.LocationCard })));
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(module => ({ default: module.NotFound })));
const Login = lazy(() => import('./pages/Login/Login').then(module => ({ default: module.Login })));

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
