export function NumberInput({ value, onChange, ...props }) {
	return (
		<input
			type="number"
			required
			min={0}
			defaultValue={`${value}`}
			onChange={(e) => {
				if (!e.target.checkValidity()) {
					return;
				}

				onChange(parseFloat(e.target.value));
			}}
			onBlur={(e) => {
				if (!e.target.checkValidity()) {
					e.nativeEvent.target.value = value ?? '';
				}
			}}
			onFocus={(e) => {
				e.target.select();
			}}
			{...props}
		/>
	);
}
