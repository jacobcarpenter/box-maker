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

	// TODO: clean this up once `useEffectEvent` is released?
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

			customStep(e.target, e.deltaY < 0, step, precision, onChangeRef.current);
		}

		function handleKeyDown(e) {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
				return;
			}

			if (typeof precision !== 'number') {
				return;
			}

			e.preventDefault();

			customStep(
				e.target,
				e.key === 'ArrowUp',
				step,
				precision,
				onChangeRef.current
			);
		}

		const inputInstance = inputRef.current;
		inputInstance.addEventListener('wheel', handleWheel);
		inputInstance.addEventListener('keydown', handleKeyDown);

		return () => {
			inputInstance.removeEventListener('wheel', handleWheel);
			inputInstance.removeEventListener('keydown', handleKeyDown);
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

function customStep(target, up, step, precision, onChange) {
	const changeAmount = (step ?? 1) / precision;

	if (up) {
		target.stepUp(changeAmount);
	} else {
		target.stepDown(changeAmount);
	}

	onChange?.(parseFloat(target.value));
}
