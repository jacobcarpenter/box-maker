import { useReducer } from 'react';
import { TileTrayParts } from './TileTrayParts';
import { PropertyEditor } from './PropertyEditor';
import { useDownloadSVG } from './useDownloadSVG';

export function TileTray() {
	const [model, handleModelChange] = useReducer(applyChange, null, initModel);

	const [invisibleDownloadLink, handleDownload] = useDownloadSVG();

	return (
		<section>
			<a
				ref={invisibleDownloadLink}
				download="tray.svg"
				sx={{ display: 'none' }}
			/>
			<h1>Tile tray</h1>

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
						<g transform="scale(2,2)">
							<g transform="translate(10,10)">
								<TileTrayParts
									partSpacing={model.partSpacing}
									thickness={model.tray.materialThickness}
									tileAreaSize={model.tray.tileAreaSize}
									sideSize={model.tray.sideSize}
									height={model.tray.height}
									tabLength={tabLength}
									tabGap={tabGap}
								/>
							</g>
						</g>
					</svg>
				</div>
				<div>
					<PropertyEditor
						editableProperties={editableProperties}
						model={model}
						onChange={handleModelChange}
					>
						<div sx={{ marginTop: '24px' }}>
							<button
								onClick={() =>
									handleDownload(() => (
										<TileTrayParts
											forExport
											partSpacing={model.partSpacing}
											thickness={model.tray.materialThickness}
											tileAreaSize={model.tray.tileAreaSize}
											sideSize={model.tray.sideSize}
											height={model.tray.height}
											tabLength={tabLength}
											tabGap={tabGap}
										/>
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

const editableProperties = [
	{
		title: 'material thickness',
		getValue: (model) => model.tray.materialThickness,
		makePartial: (materialThickness) => ({ tray: { materialThickness } }),
		precision: 0.001,
		step: 0.5,
	},
	{
		title: 'height',
		getValue: (model) => model.tray.height,
		makePartial: (height) => ({ tray: { height } }),
		precision: 0.001,
	},
	{
		title: 'tile area size',
		getValue: (model) => model.tray.tileAreaSize,
		makePartial: (tileAreaSize) => ({ tray: { tileAreaSize } }),
		precision: 0.001,
	},
	{
		title: 'side size',
		getValue: (model) => model.tray.sideSize,
		makePartial: (sideSize) => ({ tray: { sideSize } }),
		precision: 0.001,
	},
	{
		title: 'part spacing',
		getValue: (model) => model.partSpacing,
		makePartial: (partSpacing) => ({ partSpacing }),
	},
];

const tabLength = 10;
const tabGap = 15;

const defaultModel = {
	tray: {
		materialThickness: 3,
		height: 21,
		tileAreaSize: 38,
		sideSize: 33,
	},
	partSpacing: 4,
};

function initModel() {
	// TODO: load from localStorage?
	return defaultModel;
}

// TODO: factor out to common utility?
function applyChange(model, partial) {
	return {
		...model,
		...partial,
		tray: {
			...model.tray,
			...partial.tray,
		},
	};
}
