import { Path } from './BoxParts';
import { distributeTabs, divided, squiggle, tabbed } from './path-util';

export function TileTrayParts({
	partSpacing,
	thickness,
	tileAreaSize,
	sideSize,
	height,
	tabLength,
	tabGap,
}) {
	const boxSize = tileAreaSize * 2 + thickness;

	return (
		<>
			<g>
				<Path
					d={`M0,0 ${tabbed.h(
						boxSize / 2 - sideSize / 2,
						0,
						sideSize,
						tabLength,
						tabGap,
						thickness,
						{ implicitStart: true, implicitEnd: true }
					)} H${boxSize}`}
				/>
				<Path
					d={`M${boxSize},0 ${tabbed.v(
						boxSize,
						boxSize / 2 - sideSize / 2,
						sideSize,
						tabLength,
						tabGap,
						thickness,
						{ implicitStart: true, implicitEnd: true }
					)}  V${boxSize}`}
				/>
				<Path
					d={`M0,${boxSize} ${tabbed.h(
						boxSize / 2 - sideSize / 2,
						boxSize,
						sideSize,
						tabLength,
						tabGap,
						-thickness,
						{ implicitStart: true, implicitEnd: true }
					)} H${boxSize}`}
				/>
				<Path
					d={`M0,0 ${tabbed.v(
						0,
						boxSize / 2 - sideSize / 2,
						sideSize,
						tabLength,
						tabGap,
						-thickness,
						{ implicitStart: true, implicitEnd: true }
					)} V${boxSize}`}
				/>
				<Path d={``} stroke="red" />

				{/*TODO: better to pre compute positions or use g + transform? Might want to flatten gs for export. */}

				{[...distributeTabs(boxSize / 2, tabLength, tabGap)].map((offset) => (
					<g
						key={offset}
						transform={`translate(${boxSize / 2 - thickness / 2}, ${offset})`}
					>
						<Path d={`M0,0 H${thickness}`} />
						<Path d={`M${thickness},0 V${tabLength}`} />
						<Path d={`M0,${tabLength} H${thickness}`} />
						<Path d={`M0,0 V${tabLength}`} />
					</g>
				))}

				{[...distributeTabs(boxSize / 2, tabLength, tabGap)]
					.map((offset) => offset + boxSize / 2)
					.map((offset) => (
						<g
							key={offset}
							transform={`translate(${boxSize / 2 - thickness / 2}, ${offset})`}
						>
							<Path d={`M0,0 H${thickness}`} />
							<Path d={`M${thickness},0 V${tabLength}`} />
							<Path d={`M0,${tabLength} H${thickness}`} />
							<Path d={`M0,0 V${tabLength}`} />
						</g>
					))}

				{[...distributeTabs(boxSize / 2, tabLength, tabGap)].map((offset) => (
					<g
						key={offset}
						transform={`translate(${offset},${boxSize / 2 - thickness / 2})`}
					>
						<Path d={`M0,0 H${tabLength}`} />
						<Path d={`M${tabLength},0 V${thickness}`} />
						<Path d={`M0,${thickness} H${tabLength}`} />
						<Path d={`M0,0 V${thickness}`} />
					</g>
				))}

				{[...distributeTabs(boxSize / 2, tabLength, tabGap)]
					.map((offset) => offset + boxSize / 2)
					.map((offset) => (
						<g
							key={offset}
							transform={`translate(${offset},${boxSize / 2 - thickness / 2})`}
						>
							<Path d={`M0,0 H${tabLength}`} />
							<Path d={`M${tabLength},0 V${thickness}`} />
							<Path d={`M0,${thickness} H${tabLength}`} />
							<Path d={`M0,0 V${thickness}`} />
						</g>
					))}
			</g>

			<g transform={`translate(${boxSize + partSpacing}, 0)`}>
				<Path
					d={`M${thickness},0 ${squiggle.h(thickness, 0, -thickness, height)}`}
				/>
				<Path
					d={`M${height},${-thickness} ${divided.v(
						0,
						height,
						boxSize,
						1,
						-(height - thickness) / 2,
						3,
						{ implicitStart: true, implicitEnd: true }
					)} V${boxSize + thickness}`}
				/>
				<Path
					d={`M${thickness},${boxSize} ${squiggle.h(
						0,
						boxSize,
						thickness,
						height,
						{
							implicitStart: true,
						}
					)}`}
				/>
				<Path
					d={`${tabbed.v(
						thickness,
						0,
						boxSize / 2,
						tabLength,
						tabGap,
						-thickness
					)} ${tabbed.v(
						thickness,
						boxSize / 2,
						boxSize / 2,
						tabLength,
						tabGap,
						-thickness,
						{ implicitStart: true }
					)}`}
				/>
			</g>

			<g
				transform={`translate(${
					boxSize + partSpacing + height + partSpacing
				}, 0)`}
			>
				<Path d={divided.h(0, 0, sideSize, 1, height / 2, thickness)} />
				<Path d={`M${sideSize},0 V${height}`} />
				<Path d={tabbed.h(0, height, sideSize, tabLength, tabGap, thickness)} />
				<Path d={`M0,0 V${height}`} />
			</g>

			<g
				transform={`translate(${
					boxSize + partSpacing + height + partSpacing
				}, ${height + partSpacing})`}
			>
				<Path d={divided.h(0, 0, sideSize, 1, height / 2, thickness)} />
				<Path d={`M${sideSize},0 V${height}`} />
				<Path d={tabbed.h(0, height, sideSize, tabLength, tabGap, thickness)} />
				<Path d={`M0,0 V${height}`} />
			</g>

			<g transform={`translate(0, ${boxSize + partSpacing})`}>
				<Path
					d={`${tabbed.h(
						0,
						thickness,
						boxSize / 2,
						tabLength,
						tabGap,
						thickness,
						{ implicitEnd: true }
					)} ${divided.h(
						0,
						0,
						boxSize,
						1,
						(height - thickness) / 2,
						thickness,
						{
							implicitStart: true,
							implicitEnd: true,
						}
					)} ${tabbed.h(
						boxSize / 2,
						0,
						boxSize / 2,
						tabLength,
						tabGap,
						thickness,
						{ implicitStart: true }
					)}`}
				/>
				<Path
					d={`M${boxSize},${thickness} ${squiggle.v(
						boxSize,
						0,
						-thickness,
						height,
						{
							implicitStart: true,
						}
					)}`}
				/>
				<Path d={`M${-thickness},${height} H${boxSize + thickness}`} />
				<Path
					d={`M0,${thickness} ${squiggle.v(0, 0, thickness, height, {
						implicitStart: true,
					})}`}
				/>
			</g>

			<g
				transform={`translate(0,${
					boxSize + partSpacing + height + partSpacing
				})`}
			>
				<Path d={divided.h(0, 0, sideSize, 1, height / 2, thickness)} />
				<Path d={`M${sideSize},0 V${height}`} />
				<Path d={tabbed.h(0, height, sideSize, tabLength, tabGap, thickness)} />
				<Path d={`M0,0 V${height}`} />
			</g>
			<g
				transform={`translate(${sideSize + partSpacing},${
					boxSize + partSpacing + height + partSpacing
				})`}
			>
				<Path d={divided.h(0, 0, sideSize, 1, height / 2, thickness)} />
				<Path d={`M${sideSize},0 V${height}`} />
				<Path d={tabbed.h(0, height, sideSize, tabLength, tabGap, thickness)} />
				<Path d={`M0,0 V${height}`} />
			</g>
		</>
	);
}
