import { useReducer, useRef, useCallback } from 'react';
import { BoxParts } from './BoxParts';
import { PropertyEditor } from './PropertyEditor';
import styles from './App.module.css';

function App() {
	const boxPartsRoot = useRef(null);

	const [model, handleModelChange] = useReducer(applyChange, null, initModel);
	const { box, partSpacing, zoom } = model;

	const handleSave = useCallback(async () => {
		const blobURL = URL.createObjectURL(
			new Blob(
				[
					`<svg width="500mm" height="500mm" viewBox="0 0 500 500">${boxPartsRoot.current.innerHTML}</svg>`,
				],
				{
					type: 'image/svg+xml',
				}
			)
		);

		const invisibleDownloadLink = document.createElement('a');
		invisibleDownloadLink.href = blobURL;
		invisibleDownloadLink.download = 'box.svg';
		invisibleDownloadLink.style.display = 'none';
		document.body.appendChild(invisibleDownloadLink);

		invisibleDownloadLink.click();

		setTimeout(() => {
			URL.revokeObjectURL(blobURL);
			invisibleDownloadLink.remove();
		});
	}, []);

	return (
		<section>
			<h1>Box maker</h1>

			<div className={styles.layout}>
				<div>
					<svg
						width={640}
						height={500}
						style={{
							backgroundColor: '#fff',
						}}
					>
						<g
							ref={boxPartsRoot}
							transform={`${zoom ? 'scale(2) ' : ''} translate(10,10)`}
						>
							<BoxParts box={box} partSpacing={partSpacing} />
						</g>
					</svg>
					<p>(whole path will be included, even if rendering is cut off)</p>
				</div>
				<div>
					<PropertyEditor
						model={model}
						onChange={handleModelChange}
						onSave={handleSave}
					/>
				</div>
			</div>
		</section>
	);
}

export default App;

const defaultModel = {
	box: {
		materialThickness: 3,
		width: 80,
		length: 120,
		depth: 30,
		dividerCount: 1, // TODO: custom divider placement
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
