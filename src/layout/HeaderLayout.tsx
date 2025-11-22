import { Anchor, Spin } from "antd"
import { Auth } from "../components/Auth"
import { publickRoutes } from "../routes/routes"
import { Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

export const HeaderLayout = () => {

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
            <div style={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
                    <Auth/>
            </div>
            <ErrorBoundary>
                <Suspense fallback={<Spin size="large" fullscreen/>}>
                    <Outlet/>
                </Suspense>
            </ErrorBoundary>
        </>
    )
}