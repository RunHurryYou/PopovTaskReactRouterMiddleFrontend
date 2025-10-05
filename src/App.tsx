import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {publickRoutes} from './routes/routes'
import { Home } from './pages/Home/Home'
import { Characters } from './pages/Characters/Characters'
import { Locations } from './pages/Locations/Locations'
import { Episodes } from './pages/Episodes/Episodes'
import { NotFound } from './pages/NotFound/NotFound'
import { CharacterCard } from './pages/CharacterCard/CharacterCard'
import { LocationCard } from './pages/LocationCard/LocationCard'
import { EpisodeCard } from './pages/EpisodeCard/EpisodeCard'
import { Anchor } from 'antd'

function App() {

	const navigate = useNavigate();

	const handleClick = (
		e: React.MouseEvent<HTMLElement>,
		link: {
			title: React.ReactNode;
			href: string;
		},
		) => {
		e.preventDefault();
		navigate(link.href);
	};
	
	return (
		<>
			<div style={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
				<Anchor
					style={{ justifyContent: 'center', gap: '20px', fontSize: '40px', backgroundColor: 'white' }}
					affix={false}
					onClick={handleClick}
					direction="horizontal"
					items={[
					{
						key: 'home',
						href: publickRoutes.home,
						title: 'Главная',
					},
					{
						key: 'locations',
						href: publickRoutes.locations,
						title: 'Локации',
					},
					{
						key: 'episodes',
						href: publickRoutes.episodes,
						title: 'Эпизоды',
					},
					{
						key: 'characters',
						href: publickRoutes.characters,
						title: 'Персонажи',
					}
					]}
				/>
			</div>
			<Routes>
				<Route path={publickRoutes.home} element={<Home />} />
				<Route path={publickRoutes.characters}>
					<Route index element={<Characters />} />
					<Route path=":id" element={<CharacterCard />} />
				</Route>
				<Route path={publickRoutes.locations}>
					<Route index element={<Locations />} />
					<Route path=":id" element={<LocationCard />} />
				</Route>
				<Route path={publickRoutes.episodes}>
					<Route index element={<Episodes />} />
					<Route path=":id" element={<EpisodeCard />} />
				</Route>
				<Route path={publickRoutes.notFound} element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
