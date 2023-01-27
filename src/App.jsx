import { useReducer } from 'react';
import { BoxParts } from './BoxParts';
import { PropertyEditor } from './PropertyEditor';
import styles from './App.module.css';

function App() {
	const [model, handleModelChange] = useReducer(applyChange, null, initModel);

	return (
		<div>
			<h1>Box maker</h1>

			<div className={styles.layout}>
				<svg
					width={500}
					height={500}
					style={{
						backgroundColor: '#fff',
					}}
				>
					<g transform={`${model.zoom ? 'scale(2) ' : ''} translate(20,20)`}>
						<BoxParts box={model.box} partSpacing={model.partSpacing} />
					</g>
				</svg>
				<div>
					<PropertyEditor model={model} onChange={handleModelChange} />
				</div>
			</div>
		</div>
	);
}

export default App;

const defaultModel = {
	box: {
		materialThickness: 3,
		width: 70,
		length: 80,
		depth: 30,
		dividers: [],
	},
	partSpacing: 4,
	zoom: true,
};

function initModel() {
	// TODO: load from localStorage?
	return defaultModel;
}

function applyChange(model, partial) {
	return {
		...model,
		...partial,
		box: {
			...model.box,
			...partial.box,
		},
	};
}
