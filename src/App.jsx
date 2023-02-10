import { useReducer } from 'react';
import { BoxParts } from './BoxParts';
import { PropertyEditor } from './PropertyEditor';
import { useDownloadSVG } from './useDownloadSVG';

function App() {
	const [model, handleModelChange] = useReducer(applyChange, null, initModel);
	const { box, partSpacing, zoom } = model;

	const [invisibleDownloadLink, handleDownload] = useDownloadSVG();

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
						editableProperties={editableProperties}
						model={model}
						onChange={handleModelChange}
					>
						{/* TODO: move zoom control somewhere else */}
						<div>
							<label>
								<input
									type="checkbox"
									checked={model.zoom}
									onChange={(e) => {
										handleModelChange({ zoom: e.target.checked });
									}}
								/>{' '}
								zoom
							</label>
						</div>

						<div sx={{ marginTop: '16px' }}>
							<button
								onClick={() =>
									handleDownload(() => (
										<BoxParts forExport box={box} partSpacing={partSpacing} />
									))
								}
							>
								Download SVG
							</button>
						</div>
					</PropertyEditor>
				</div>
			</div>
		</section>
	);
}

export default App;

const editableProperties = [
	{
		title: 'material thickness',
		getValue: (model) => model.box.materialThickness,
		makePartial: (materialThickness) => ({ box: { materialThickness } }),
		precision: 0.001,
		step: 0.5,
	},
	{
		title: 'width',
		getValue: (model) => model.box.width,
		makePartial: (width) => ({ box: { width } }),
		precision: 0.001,
		step: 10,
	},
	{
		title: 'length',
		getValue: (model) => model.box.length,
		makePartial: (length) => ({ box: { length } }),
		precision: 0.001,
		step: 10,
	},
	{
		title: 'depth',
		getValue: (model) => model.box.depth,
		makePartial: (depth) => ({ box: { depth } }),
		precision: 0.001,
	},
	{
		title: 'divider count',
		getValue: (model) => model.box.dividerCount,
		makePartial: (dividerCount) => ({ box: { dividerCount } }),
	},
	{
		title: 'part spacing',
		getValue: (model) => model.partSpacing,
		makePartial: (partSpacing) => ({ partSpacing }),
	},
];

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
