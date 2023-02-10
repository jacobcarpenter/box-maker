export function* distributeTabs(distance, tabLength, tabSpacing) {
	const tabCount = Math.floor(distance / (tabLength + tabSpacing));
	const edgeGap =
		(distance - (tabLength * tabCount + tabSpacing * (tabCount - 1))) / 2;

	for (let tab = 0; tab < tabCount; ++tab) {
		yield edgeGap + tab * (tabLength + tabSpacing);
	}
}

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

		return `${implicitStart ? '' : `M ${startX},${startY} `}H ${
			startX + edgeGap
		} ${Array.from(
			{ length: tabs },
			() => `v ${-tabHeight} h ${tabWidth} v ${tabHeight} h ${gapWidth}`
		).join(' ')} v ${-tabHeight} h ${tabWidth} v ${tabHeight} ${
			implicitEnd ? '' : `H ${startX + width}`
		}`;
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

		return `${implicitStart ? '' : `M ${startX},${startY} `}V ${
			startY + edgeGap
		} ${Array.from(
			{ length: tabs },
			() => `h ${tabHeight} v ${tabWidth} h ${-tabHeight} v ${gapWidth}`
		).join(' ')} h ${tabHeight} v ${tabWidth} h ${-tabHeight} ${
			implicitEnd ? '' : `V ${startY + height}`
		}`;
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

		return `${implicitStart ? '' : `M ${startX},${startY}`} ${Array.from(
			{ length: dividerCount },
			(_, index) =>
				`V ${
					(singleSpace + dividerThickness) * index + singleSpace
				} h ${dividerDepth} v ${dividerThickness} h ${-dividerDepth}`
		).join(' ')} ${implicitEnd ? '' : `V ${startY + fullDistance}`}`;
	},

	h(
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

		return `${implicitStart ? '' : `M ${startX},${startY}`} ${Array.from(
			{ length: dividerCount },
			(_, index) =>
				`H ${
					(singleSpace + dividerThickness) * index + singleSpace
				} v ${dividerDepth} h ${dividerThickness} v ${-dividerDepth}`
		).join(' ')} ${implicitEnd ? '' : `H ${startY + fullDistance}`}`;
	},
};

export const squiggle = {
	v(
		startX,
		startY,
		squiggleWidth,
		height,
		{ implicitStart, implicitEnd } = {
			implicitStart: false,
			implicitEnd: false,
		}
	) {
		const halfHeight = height / 2;
		return `${implicitStart ? '' : `M ${startX},${startY} `}V ${halfHeight} H ${
			startX - squiggleWidth
		}${implicitEnd ? '' : ` V ${height}`}`;
	},

	h(
		startX,
		startY,
		squiggleHeight,
		width,
		{ implicitStart, implicitEnd } = {
			implicitStart: false,
			implicitEnd: false,
		}
	) {
		const halfWidth = width / 2;
		return `${implicitStart ? '' : `M ${startX},${startY} `}H ${halfWidth} V ${
			startY + squiggleHeight
		}${implicitEnd ? '' : ` H ${width}`}`;
	},
};
