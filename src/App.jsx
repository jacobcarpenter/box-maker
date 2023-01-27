import { useReducer, useId } from 'react';
import { squiggle, tabbed } from './path-util';
import { NumberInput } from './NumberInput';
import './App.css';

const defaultState = {
	boxWidth: 70,
	boxLength: 80,
	boxDepth: 30,
	partSpacing: 4,
	thickness: 3,
	zoom: true,
};

function App() {
	const [
		{ zoom, boxWidth, boxLength, boxDepth, partSpacing, thickness },
		dispatch,
	] = useReducer(reducer, defaultState);

	const widthId = useId();
	const lengthId = useId();
	const depthId = useId();
	const spacingId = useId();
	const materialThicknessId = useId();

	return (
		<div className="App">
			<h1>Box maker</h1>

			<div style={{ display: 'flex', gap: '16px' }}>
				{/* TODO: extract to separate component */}
				<svg
					width={500}
					height={500}
					style={{
						backgroundColor: '#fff',
					}}
				>
					<g transform={`${zoom ? 'scale(2) ' : ''} translate(20,20)`}>
						<g transform={`translate(${boxDepth + partSpacing},0)`}>
							<Path
								d={`M ${thickness},0
									H ${boxWidth}`}
							/>
							<Path d={squiggle.v(boxWidth, 0, thickness, boxDepth)} />
							<Path
								d={`M 0,${boxDepth}
									h ${thickness}
									${tabbed.h(thickness, boxDepth, boxWidth - 2 * thickness, 10, 15, thickness, {
										implicitStart: true,
									})}`}
								stroke="red"
							/>
							<Path d={squiggle.v(thickness, 0, thickness, boxDepth)} />
						</g>

						<g transform={`translate(0,${boxDepth + partSpacing})`}>
							<g transform={`translate(0,0)`}>
								<Path d={squiggle.h(0, 0, thickness, boxDepth)} />
								<Path
									d={`
										${tabbed.v(boxDepth, thickness, boxLength - 2 * thickness, 10, 15, -thickness, {
											implicitEnd: true,
										})}
										V ${boxLength}`}
									stroke="red"
								/>
								<Path
									d={squiggle.h(0, boxLength - thickness, thickness, boxDepth)}
								/>
								<Path
									d={`M 0,${boxLength - thickness}
										L 0,0`}
								/>
							</g>

							<g transform={`translate(${boxDepth + partSpacing},0)`}>
								<Path
									d={tabbed.h(
										thickness,
										thickness,
										boxWidth - 2 * thickness,
										10,
										15,
										thickness
									)}
									stroke="red"
								/>

								<Path
									d={tabbed.v(
										boxWidth - thickness,
										thickness,
										boxLength - 2 * thickness,
										10,
										15,
										thickness
									)}
									stroke="red"
								/>

								<Path
									d={tabbed.h(
										thickness,
										boxLength - thickness,
										boxWidth - 2 * thickness,
										10,
										15,
										-thickness
									)}
									stroke="red"
								/>

								<Path
									d={tabbed.v(
										thickness,
										thickness,
										boxLength - 2 * thickness,
										10,
										15,
										-thickness
									)}
									stroke="red"
								/>
							</g>

							<g
								transform={`translate(${
									boxDepth + partSpacing + boxWidth + partSpacing
								},0)`}
							>
								<Path d={squiggle.h(0, 0, thickness, boxDepth)} />
								<Path
									d={`M ${boxDepth},${thickness}
										V ${boxLength}`}
								/>
								<Path
									d={squiggle.h(0, boxLength - thickness, thickness, boxDepth)}
								/>
								<Path
									d={`M 0,0
										v ${thickness}
										${tabbed.v(0, thickness, boxLength - 2 * thickness, 10, 15, thickness, {
											implicitStart: true,
										})}`}
									stroke="red"
								/>
							</g>
						</g>

						<g
							transform={`translate(${boxDepth + partSpacing},${
								boxDepth + partSpacing + boxLength + partSpacing
							})`}
						>
							<Path
								d={`
									${tabbed.h(thickness, 0, boxWidth - 2 * thickness, 10, 15, -thickness, {
										implicitEnd: true,
									})}
									H ${boxWidth}`}
								stroke="red"
							/>
							<Path
								d={`M ${boxWidth},0
									V ${boxDepth / 2}
									H ${boxWidth - thickness}
									V ${boxDepth}`}
							/>
							<Path
								d={`M ${boxWidth - thickness},${boxDepth}
									H 0`}
							/>
							<Path
								d={`M 0,${boxDepth}
									V ${boxDepth / 2}
									H ${thickness}
									V 0`}
							/>
						</g>
					</g>
				</svg>
				<form
					style={{
						display: 'grid',
						gridTemplateColumns: 'max-content 1fr',
						alignContent: 'start',
						gap: '12px',
						gridColumnGap: '1em',

						textAlign: 'left',
					}}
				>
					{/* TODO: use CSS Subgrid 😅 */}
					<div>
						<label htmlFor={materialThicknessId}>material thickness</label>
					</div>
					<div>
						<NumberInput
							id={materialThicknessId}
							value={thickness}
							onChange={(value) => dispatch({ thickness: value })}
						/>
					</div>
					<div>
						<label htmlFor={widthId}>width</label>
					</div>
					<div>
						<NumberInput
							id={widthId}
							value={boxWidth}
							onChange={(value) => dispatch({ boxWidth: value })}
						/>
					</div>
					<div>
						<label htmlFor={lengthId}>length</label>
					</div>
					<div>
						<NumberInput
							id={lengthId}
							value={boxLength}
							onChange={(value) => dispatch({ boxLength: value })}
						/>
					</div>
					<div>
						<label htmlFor={depthId}>depth</label>
					</div>
					<div>
						<NumberInput
							id={depthId}
							value={boxDepth}
							onChange={(value) => dispatch({ boxDepth: value })}
						/>
					</div>
					<div>
						<label htmlFor={spacingId}>part spacing</label>
					</div>
					<div>
						<NumberInput
							id={spacingId}
							value={partSpacing}
							onChange={(value) => dispatch({ partSpacing: value })}
						/>
					</div>

					<div style={{ gridColumn: 'span 2' }}>
						<label>
							<input
								type="checkbox"
								checked={zoom}
								onChange={() => dispatch({ action: 'toggle_zoom' })}
							/>{' '}
							zoom
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;

function Path({
	fill = 'none',
	stroke = '#000',
	strokeLinecap = 'square',
	...props
}) {
	return (
		<path
			fill={fill}
			stroke={stroke}
			strokeLinecap={strokeLinecap}
			{...props}
		/>
	);
}

function reducer(state, arg) {
	const { action } = arg;
	if (action) {
		switch (action) {
			case 'toggle_zoom': {
				return { ...state, zoom: !state.zoom };
			}
		}

		return state;
	}

	return { ...state, ...arg };
}
