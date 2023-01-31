import { useReducer, useRef } from 'react';
import { BoxParts } from './BoxParts';
import { PropertyEditor } from './PropertyEditor';

function App() {
	const invisibleDownloadLink = useRef(null);

	const [model, handleModelChange] = useReducer(applyChange, null, initModel);
	const { box, partSpacing, zoom } = model;

	const handleSave = async () => {
		const aDownload = invisibleDownloadLink.current;

		const { renderToStaticMarkup } = await import('react-dom/server');

		const staticRendering = renderToStaticMarkup(
			<BoxParts forExport box={box} partSpacing={partSpacing} />
		);

		// revoke last object url (safe to revoke `null`) before assigning a new one
		URL.revokeObjectURL(aDownload.href);
		aDownload.href = URL.createObjectURL(
			new Blob(
				[
					`<svg width="500mm" height="500mm" viewBox="0 0 500 500">${staticRendering}</svg>`,
				],
				{
					type: 'image/svg+xml',
				}
			)
		);

		aDownload.click();
	};

	return (
		<section>
			<a
				ref={invisibleDownloadLink}
				download="box.svg"
				sx={{ display: 'none' }}
			/>
			<h1>Box maker</h1>

			<div
				sx={{
					display: 'flex',
					gap: '24px',
					'@media (width <= 1010px)': {
						flexDirection: 'column',
					},
				}}
			>
				<div>
					<svg
						width={640}
						height={500}
						sx={{
							backgroundColor: '#fff',
							width: '100%',
						}}
					>
						<g transform={`${zoom ? 'scale(2) ' : ''} translate(10,10)`}>
							<BoxParts box={box} partSpacing={partSpacing} />
						</g>
					</svg>
					<p>(whole path will be included, even if preview is cut off)</p>
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
