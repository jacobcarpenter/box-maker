import { useId, createContext, useMemo, useContext } from 'react';
import { NumberInput } from './NumberInput';

const ModelChangeContext = createContext();

export function PropertyEditor({ model, onChange, onSave }) {
	const formId = useId();

	const modelChangeContextValue = useMemo(
		() => ({ formId, onChange }),
		[formId, onChange]
	);

	// TODO: CSS subgrid would be nice...
	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			sx={{
				textAlign: 'left',
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
			}}
		>
			<ModelChangeContext.Provider value={modelChangeContextValue}>
				<div
					sx={{
						display: 'grid',
						gridTemplateColumns: 'max-content 1fr',
						alignContent: 'start',
						gap: '12px',
						columnGap: '1em',
					}}
				>
					<NumberProperty
						title="material thickness"
						value={model.box.materialThickness}
						makeModelPartial={(value) => ({
							box: { materialThickness: value },
						})}
						precision={0.001}
						step={0.5}
					/>

					<NumberProperty
						title="width"
						value={model.box.width}
						makeModelPartial={(value) => ({ box: { width: value } })}
						precision={0.001}
						step={10}
					/>

					<NumberProperty
						title="length"
						value={model.box.length}
						makeModelPartial={(value) => ({ box: { length: value } })}
						precision={0.001}
						step={10}
					/>

					<NumberProperty
						title="depth"
						value={model.box.depth}
						makeModelPartial={(value) => ({ box: { depth: value } })}
						precision={0.001}
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

				<div sx={{ marginTop: '24px' }}>
					<button onClick={onSave}>Download SVG</button>
				</div>
			</ModelChangeContext.Provider>
		</form>
	);
}

function NumberProperty({ title, value, makeModelPartial, ...props }) {
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
					{...props}
				/>
			</div>
		</>
	);
}
