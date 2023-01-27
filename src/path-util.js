export const tabbed = {
	h(
		startX,
		startY,
		width,
		tabWidth,
		gapWidth,
		tabHeight,
		{ implicitStart, implicitEnd } = {
			implicitStart: false,
			implicitEnd: false,
		}
	) {
		const tabs = Math.max(0, Math.floor(width / (tabWidth + gapWidth)) - 1);
		const edgeGap = (width - (tabWidth + tabs * (tabWidth + gapWidth))) / 2;

		return `${implicitStart ? '' : `M ${startX},${startY}`}
			h ${edgeGap}
			${Array.from(
				{ length: tabs },
				() => `v ${-tabHeight} h ${tabWidth} v ${tabHeight} h ${gapWidth}`
			).join('')}
			v ${-tabHeight} h ${tabWidth} v ${tabHeight}
			${implicitEnd ? '' : `H ${startX + width}`}`;
	},

	v(
		startX,
		startY,
		height,
		tabWidth, // despite orientation change, swapping width / height nomenclature for tabs feels wrong
		gapWidth,
		tabHeight,
		{ implicitStart, implicitEnd } = {
			implicitStart: false,
			implicitEnd: false,
		}
	) {
		const tabs = Math.max(0, Math.floor(height / (tabWidth + gapWidth)) - 1);
		const edgeGap = (height - (tabWidth + tabs * (tabWidth + gapWidth))) / 2;

		return `${implicitStart ? '' : `M ${startX},${startY}`}
			v ${edgeGap}
			${Array.from(
				{ length: tabs },
				() => `h ${tabHeight} v ${tabWidth} h ${-tabHeight} v ${gapWidth}`
			).join('')}
			h ${tabHeight} v ${tabWidth} h ${-tabHeight}
			${implicitEnd ? '' : `V ${startY + height}`}`;
	},
};

export const divided = {
	v(
		startX,
		startY,
		fullDistance,
		dividerCount,
		dividerDepth,
		dividerThickness,
		{ implicitStart, implicitEnd } = {
			implicitStart: false,
			implicitEnd: false,
		}
	) {
		const spaceAround = fullDistance - dividerCount * dividerThickness;
		const singleSpace = spaceAround / (dividerCount + 1);

		return `${implicitStart ? '' : `M ${startX},${startY}`}
			${Array.from(
				{ length: dividerCount },
				(_, index) =>
					`V ${(singleSpace + dividerThickness) * index + singleSpace}
					h ${dividerDepth}
					v ${dividerThickness}
					h ${-dividerDepth}`
			)}
			${implicitEnd ? '' : `V ${startY + fullDistance}`}`;
	},
};

export const squiggle = {
	v(startX, startY, squiggleWidth, height) {
		const halfHeight = height / 2;
		return `M ${startX},${startY}
			V ${halfHeight}
			H ${startX - squiggleWidth}
			V ${height}`;
	},

	h(startX, startY, squiggleHeight, width) {
		const halfWidth = width / 2;
		return `M ${startX},${startY}
			H ${halfWidth}
			V ${startY + squiggleHeight}
			H ${width}`;
	},
};
