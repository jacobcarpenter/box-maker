import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import App from './App';
import { TileTray } from './TileTray';
import './index.css';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Root />,
			children: [
				{
					index: true,
					element: <App />,
				},
				{
					path: 'tile-tray',
					element: <TileTray />,
				},
			],
		},
	],
	{
		// must agree with vite.config; extract to shared constant?
		basename: '/box-maker',
	}
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
