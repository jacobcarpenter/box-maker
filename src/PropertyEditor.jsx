import { useId, createContext, useMemo, useContext } from 'react';
import { NumberInput } from './NumberInput';

const ModelChangeContext = createContext();

export function PropertyEditor({
	editableProperties,
	model,
	onChange,
	children,
}) {
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
					{editableProperties.map(({ title, getValue, ...props }, i) => (
						<NumberProperty
							key={`${i}:${title}`}
							title={title}
							value={getValue(model)}
							{...props}
						/>
					))}
				</div>

				{children}
			</ModelChangeContext.Provider>
		</form>
	);
}

function NumberProperty({
	title,
	value,
	makePartial: makeModelPartial,
	...props
}) {
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
