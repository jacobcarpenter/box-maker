import { useId, createContext, useContext } from 'react';
import { NumberInput } from './NumberInput';
import styles from './PropertyEditor.module.css';

const ModelChangeContext = createContext();

export function PropertyEditor({ model, onChange }) {
	const materialThicknessId = useId();
	const widthId = useId();
	const lengthId = useId();
	const depthId = useId();
	const dividerCountId = useId();
	const spacingId = useId();

	// TODO: CSS subgrid would be nice...
	// TODO: JedWatson/classnames?
	return (
		<form className={`${[styles.main, styles.stack].join(' ')}`}>
			<ModelChangeContext.Provider value={onChange}>
				<div className={styles.twoColumn}>
					<NumberProperty
						id={materialThicknessId}
						title="material thickness"
						value={model.box.materialThickness}
						makeModelPartial={(value) => ({
							box: { materialThickness: value },
						})}
					/>

					<NumberProperty
						id={widthId}
						title="width"
						value={model.box.width}
						makeModelPartial={(value) => ({ box: { width: value } })}
					/>

					<NumberProperty
						id={lengthId}
						title="length"
						value={model.box.length}
						makeModelPartial={(value) => ({ box: { length: value } })}
					/>

					<NumberProperty
						id={depthId}
						title="depth"
						value={model.box.depth}
						makeModelPartial={(value) => ({ box: { depth: value } })}
					/>

					<NumberProperty
						id={dividerCountId}
						title="divider count"
						value={model.box.dividerCount}
						makeModelPartial={(value) => ({ box: { dividerCount: value } })}
					/>

					<NumberProperty
						id={spacingId}
						title="part spacing"
						value={model.partSpacing}
						makeModelPartial={(value) => ({ partSpacing: value })}
					/>
				</div>

				{/* TODO: move zoom controls somewhere else */}
				<div>
					<label>
						<input
							type="checkbox"
							checked={model.zoom}
							onChange={(e) => {
								onChange({ zoom: e.target.checked });
							}}
						/>{' '}
						zoom
					</label>
				</div>
			</ModelChangeContext.Provider>
		</form>
	);
}

function NumberProperty({ id, title, value, makeModelPartial }) {
	const onChange = useContext(ModelChangeContext);

	// must return fragment so display grid lays out properly
	return (
		<>
			<div>
				<label htmlFor={id}>{title}</label>
			</div>
			<div>
				<NumberInput
					id={id}
					value={value}
					onChange={(value) => onChange(makeModelPartial(value))}
				/>
			</div>
		</>
	);
}
