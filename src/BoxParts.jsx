import { createContext, useContext } from 'react';
import { squiggle, tabbed, divided } from './path-util';

const ExportContext = createContext();

export function BoxParts({ box, partSpacing, forExport }) {
	// shorthand declarations for better prettier formatting
	const {
		materialThickness: mt,
		width: w,
		length: l,
		depth: d,
		dividerCount: dc,
	} = box;

	return (
		<ExportContext.Provider value={forExport}>
			<g transform={`translate(${d + partSpacing},0)`}>
				<Path d={`M ${mt},0 H ${w}`} />
				<Path d={squiggle.v(w, 0, mt, d)} />
				<Path
					d={`M 0,${d} h ${mt} ${tabbed.h(mt, d, w - 2 * mt, 10, 15, mt, {
						implicitStart: true,
					})}`}
					stroke="red"
				/>
				<Path d={squiggle.v(mt, 0, mt, d)} />
			</g>

			<g transform={`translate(0,${d + partSpacing})`}>
				<g transform={`translate(0,0)`}>
					<Path d={squiggle.h(0, 0, mt, d)} />
					<Path
						d={`${tabbed.v(d, mt, l - 2 * mt, 10, 15, -mt, {
							implicitEnd: true,
						})} V ${l}`}
						stroke="red"
					/>
					<Path d={squiggle.h(0, l - mt, mt, d)} />
					<Path
						d={`M 0,0 ${divided.v(0, 0, l, dc, d / 2, mt, {
							implicitEnd: true,
						})} L 0,${l - mt}`}
						stroke="blue"
					/>
				</g>

				<g transform={`translate(${d + partSpacing},0)`}>
					<Path d={tabbed.h(mt, mt, w - 2 * mt, 10, 15, mt)} stroke="red" />
					<Path d={tabbed.v(w - mt, mt, l - 2 * mt, 10, 15, mt)} stroke="red" />
					<Path
						d={tabbed.h(mt, l - mt, w - 2 * mt, 10, 15, -mt)}
						stroke="red"
					/>
					<Path d={tabbed.v(mt, mt, l - 2 * mt, 10, 15, -mt)} stroke="red" />
				</g>

				<g transform={`translate(${d + partSpacing + w + partSpacing},0)`}>
					<Path d={squiggle.h(0, 0, mt, d)} />
					<Path
						d={`M ${d},${mt} ${divided.v(d, 0, l, dc, -(d / 2), mt, {
							implicitStart: true,
						})}`}
						stroke="blue"
					/>
					<Path d={squiggle.h(0, l - mt, mt, d)} />
					<Path
						d={`M 0,0 v ${mt} ${tabbed.v(0, mt, l - 2 * mt, 10, 15, mt, {
							implicitStart: true,
						})}`}
						stroke="red"
					/>
				</g>
			</g>

			<g
				transform={`translate(${d + partSpacing},${
					d + partSpacing + l + partSpacing
				})`}
			>
				<Path
					d={`${tabbed.h(mt, 0, w - 2 * mt, 10, 15, -mt, {
						implicitEnd: true,
					})} H ${w}`}
					stroke="red"
				/>
				<Path d={`M ${w},0 V ${d / 2} H ${w - mt} V ${d}`} />
				<Path d={`M ${w - mt},${d} H 0`} />
				<Path d={`M 0,${d} V ${d / 2} H ${mt} V 0`} />
			</g>

			<g
				transform={`translate(${
					d + partSpacing + w + partSpacing + d + partSpacing * 2
				},0)`}
			>
				{Array.from({ length: dc }).map((_, index) => (
					<g
						key={index}
						transform={`translate(0,${(d + partSpacing) * index})`}
					>
						<Path d={`M 0,0 H ${w}`} />
						<Path d={`M ${w},0 V ${d / 2} h ${-mt} V ${d - mt}`} />
						<Path d={`M ${w - mt},${d - mt} H ${mt}`} />
						<Path d={`M 0,0 V ${d / 2} h ${mt} V ${d - mt}`} />
					</g>
				))}
			</g>
		</ExportContext.Provider>
	);
}

function Path({
	fill = 'none',
	stroke = '#000',
	strokeLinecap = 'square',
	style,
	...props
}) {
	const forExport = useContext(ExportContext);

	if (forExport) {
		stroke = '#f00';
		style = {
			...style,
			vectorEffect: 'non-scaling-stroke',
			'-inkscapeStroke': 'hairline',
		};
	}

	return (
		<path
			fill={fill}
			stroke={stroke}
			strokeLinecap={strokeLinecap}
			style={style}
			{...props}
		/>
	);
}
