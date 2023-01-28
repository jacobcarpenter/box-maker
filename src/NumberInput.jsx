import { useEffect, useRef } from 'react';

// so gross
export function NumberInput({
	value,
	onChange,
	step = 1,
	precision,
	...props
}) {
	const inputRef = useRef(null);

	// TODO: can probably clean this up once `useEvent` is released
	const onChangeRef = useRef(null);
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		function handleWheel(e) {
			if (typeof precision !== 'number') {
				// don't prevent default if not overriding precision
				return;
			}

			e.preventDefault();

			if (!e.target.checkValidity()) {
				return;
			}

			const changeAmount = (step ?? 1) / precision;

			if (e.deltaY < 0) {
				e.target.stepUp(changeAmount);
			} else {
				e.target.stepDown(changeAmount);
			}

			onChangeRef.current?.(parseFloat(e.target.value));
		}

		const inputInstance = inputRef.current;
		inputInstance.addEventListener('wheel', handleWheel);

		return () => {
			inputInstance.removeEventListener('wheel', handleWheel);
		};
	}, [precision, step]);

	return (
		<input
			ref={inputRef}
			type="number"
			required
			step={precision ?? step}
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
