import { describe, it, expect } from 'vitest';
import { squiggle } from './path-util';

describe('squiggle', () => {
	describe('horizontal', () => {
		it('produces expected squiggle', () => {
			const result = squiggle.h(0, 0, 7, 10);
			expect(result).toBe('M 0,0 H 5 V 7 H 10');
		});

		it('can omit start', () => {
			const result = squiggle.h(0, 0, 7, 10, { implicitStart: true });
			expect(result).toBe('H 5 V 7 H 10');
		});

		it('can omit end', () => {
			const result = squiggle.h(0, 0, 7, 10, { implicitEnd: true });
			expect(result).toBe('M 0,0 H 5 V 7');
		});

		it('can omit start and end', () => {
			const result = squiggle.h(0, 0, 7, 10, {
				implicitStart: true,
				implicitEnd: true,
			});
			expect(result).toBe('H 5 V 7');
		});
	});
});
