import { useId, createContext, useMemo, useContext } from 'react';
import { NumberInput } from './NumberInput';
import styles from './PropertyEditor.module.css';

const ModelChangeContext = createContext();

export function PropertyEditor({ model, onChange, onSave }) {
	const formId = useId();

	const modelChangeContextValue = useMemo(
		() => ({ formId, onChange }),
		[formId, onChange]
	);

	// TODO: CSS subgrid would be nice...
	// TODO: JedWatson/classnames?
	return (
		<form
			className={`${[styles.main, styles.stack].join(' ')}`}
			onSubmit={(e) => e.preventDefault()}
		>
			<ModelChangeContext.Provider value={modelChangeContextValue}>
				<div className={styles.twoColumn}>
					<NumberProperty
						title="material thickness"
						value={model.box.materialThickness}
						makeModelPartial={(value) => ({
							box: { materialThickness: value },
						})}
					/>

					<NumberProperty
						title="width"
						value={model.box.width}
						makeModelPartial={(value) => ({ box: { width: value } })}
					/>

					<NumberProperty
						title="length"
						value={model.box.length}
						makeModelPartial={(value) => ({ box: { length: value } })}
					/>

					<NumberProperty
						title="depth"
						value={model.box.depth}
						makeModelPartial={(value) => ({ box: { depth: value } })}
					/>

					<NumberProperty
						title="divider count"
						value={model.box.dividerCount}
						makeModelPartial={(value) => ({ box: { dividerCount: value } })}
					/>

					<NumberProperty
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

				<div className={styles.doubleTopGap}>
					<button onClick={onSave}>Download SVG</button>
				</div>
			</ModelChangeContext.Provider>
		</form>
	);
}

function NumberProperty({ title, value, makeModelPartial }) {
	const { formId, onChange } = useContext(ModelChangeContext);
	const id = `${formId}-${title.replace(' ', '-')}`;

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
