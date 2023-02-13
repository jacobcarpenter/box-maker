import { describe, expect, it, test } from 'vitest';
import { divided, squiggle } from './path-util';

describe('divided', () => {
	describe('horizontal', () => {
		describe('produces expected single divisions', () => {
			test.each`
				length | dividerThickness | expected                             | description
				${17}  | ${1}             | ${'M 0,0 H 8 v 10 h 1 v -10 H 17'}   | ${'odd / odd -> whole'}
				${17}  | ${2}             | ${'M 0,0 H 7.5 v 10 h 2 v -10 H 17'} | ${'odd / even -> decimal'}
				${18}  | ${2}             | ${'M 0,0 H 8 v 10 h 2 v -10 H 18'}   | ${'even / even -> whole'}
				${18}  | ${3}             | ${'M 0,0 H 7.5 v 10 h 3 v -10 H 18'} | ${'even / odd -> decimal'}
			`('$description', ({ length, dividerThickness, expected }) => {
				const result = divided.h(0, 0, length, 1, 10, dividerThickness);
				expect(result).toBe(expected);
			});

			it('can omit start', () => {
				const result = divided.h(0, 0, 17, 1, 10, 3, { implicitStart: true });
				expect(result).toBe('H 7 v 10 h 3 v -10 H 17');
			});

			it('can omit end', () => {
				const result = divided.h(0, 0, 18, 1, 10, 4, { implicitEnd: true });
				expect(result).toBe('M 0,0 H 7 v 10 h 4 v -10');
			});

			it('can omit start and end', () => {
				const result = divided.h(0, 0, 19, 1, 10, 3, {
					implicitStart: true,
					implicitEnd: true,
				});
				expect(result).toBe('H 8 v 10 h 3 v -10');
			});
		});

		test('produces expected double division', () => {
			const result = divided.h(0, 0, 5, 2, 10, 1);
			expect(result).toBe('M 0,0 H 1 v 10 h 1 v -10 H 3 v 10 h 1 v -10 H 5');
		});
	});
});

describe('squiggle', () => {
	describe('horizontal', () => {
		it('produces expected squiggle', () => {
			const result = squiggle.h(0, 0, 7, 10);
			expect(result).toBe('M0,0 H5 V7 H10');
		});

		it('can omit start', () => {
			const result = squiggle.h(0, 0, 7, 10, { implicitStart: true });
			expect(result).toBe('H5 V7 H10');
		});

		it('can omit end', () => {
			const result = squiggle.h(0, 0, 7, 10, { implicitEnd: true });
			expect(result).toBe('M0,0 H5 V7');
		});

		it('can omit start and end', () => {
			const result = squiggle.h(0, 0, 7, 10, {
				implicitStart: true,
				implicitEnd: true,
			});
			expect(result).toBe('H5 V7');
		});
	});

	describe('vertical', () => {
		it('produces expected squiggle', () => {
			const result = squiggle.v(0, 0, 7, 12);
			expect(result).toBe('M0,0 V6 H-7 V12');
		});

		it('produces expected negative squiggle', () => {
			const result = squiggle.v(0, 0, -7, 12);
			expect(result).toBe('M0,0 V6 H7 V12');
		});

		it('can omit start', () => {
			const result = squiggle.v(0, 0, 7, 12, { implicitStart: true });
			expect(result).toBe('V6 H-7 V12');
		});

		it('can omit end', () => {
			const result = squiggle.v(0, 0, 7, 12, { implicitEnd: true });
			expect(result).toBe('M0,0 V6 H-7');
		});

		it('can omit start and end', () => {
			const result = squiggle.v(0, 0, 7, 12, {
				implicitStart: true,
				implicitEnd: true,
			});
			expect(result).toBe('V6 H-7');
		});
	});
});
