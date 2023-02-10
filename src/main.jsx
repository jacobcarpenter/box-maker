import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import App from './App';
import { TileTray } from './TileTray';
import './index.css';

const router = createHashRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
