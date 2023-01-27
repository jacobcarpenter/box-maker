import { squiggle, tabbed } from './path-util';

export function BoxParts({ box, partSpacing }) {
	return (
		<>
			<g transform={`translate(${box.depth + partSpacing},0)`}>
				<Path
					d={`M ${box.materialThickness},0
									H ${box.width}`}
				/>
				<Path d={squiggle.v(box.width, 0, box.materialThickness, box.depth)} />
				<Path
					d={`M 0,${box.depth}
									h ${box.materialThickness}
									${tabbed.h(
										box.materialThickness,
										box.depth,
										box.width - 2 * box.materialThickness,
										10,
										15,
										box.materialThickness,
										{
											implicitStart: true,
										}
									)}`}
					stroke="red"
				/>
				<Path
					d={squiggle.v(
						box.materialThickness,
						0,
						box.materialThickness,
						box.depth
					)}
				/>
			</g>

			<g transform={`translate(0,${box.depth + partSpacing})`}>
				<g transform={`translate(0,0)`}>
					<Path d={squiggle.h(0, 0, box.materialThickness, box.depth)} />
					<Path
						d={`
										${tabbed.v(
											box.depth,
											box.materialThickness,
											box.length - 2 * box.materialThickness,
											10,
											15,
											-box.materialThickness,
											{
												implicitEnd: true,
											}
										)}
										V ${box.length}`}
						stroke="red"
					/>
					<Path
						d={squiggle.h(
							0,
							box.length - box.materialThickness,
							box.materialThickness,
							box.depth
						)}
					/>
					<Path
						d={`M 0,${box.length - box.materialThickness}
										L 0,0`}
					/>
				</g>

				<g transform={`translate(${box.depth + partSpacing},0)`}>
					<Path
						d={tabbed.h(
							box.materialThickness,
							box.materialThickness,
							box.width - 2 * box.materialThickness,
							10,
							15,
							box.materialThickness
						)}
						stroke="red"
					/>

					<Path
						d={tabbed.v(
							box.width - box.materialThickness,
							box.materialThickness,
							box.length - 2 * box.materialThickness,
							10,
							15,
							box.materialThickness
						)}
						stroke="red"
					/>

					<Path
						d={tabbed.h(
							box.materialThickness,
							box.length - box.materialThickness,
							box.width - 2 * box.materialThickness,
							10,
							15,
							-box.materialThickness
						)}
						stroke="red"
					/>

					<Path
						d={tabbed.v(
							box.materialThickness,
							box.materialThickness,
							box.length - 2 * box.materialThickness,
							10,
							15,
							-box.materialThickness
						)}
						stroke="red"
					/>
				</g>

				<g
					transform={`translate(${
						box.depth + partSpacing + box.width + partSpacing
					},0)`}
				>
					<Path d={squiggle.h(0, 0, box.materialThickness, box.depth)} />
					<Path
						d={`M ${box.depth},${box.materialThickness}
										V ${box.length}`}
					/>
					<Path
						d={squiggle.h(
							0,
							box.length - box.materialThickness,
							box.materialThickness,
							box.depth
						)}
					/>
					<Path
						d={`M 0,0
										v ${box.materialThickness}
										${tabbed.v(
											0,
											box.materialThickness,
											box.length - 2 * box.materialThickness,
											10,
											15,
											box.materialThickness,
											{
												implicitStart: true,
											}
										)}`}
						stroke="red"
					/>
				</g>
			</g>

			<g
				transform={`translate(${box.depth + partSpacing},${
					box.depth + partSpacing + box.length + partSpacing
				})`}
			>
				<Path
					d={`
									${tabbed.h(
										box.materialThickness,
										0,
										box.width - 2 * box.materialThickness,
										10,
										15,
										-box.materialThickness,
										{
											implicitEnd: true,
										}
									)}
									H ${box.width}`}
					stroke="red"
				/>
				<Path
					d={`M ${box.width},0
									V ${box.depth / 2}
									H ${box.width - box.materialThickness}
									V ${box.depth}`}
				/>
				<Path
					d={`M ${box.width - box.materialThickness},${box.depth}
									H 0`}
				/>
				<Path
					d={`M 0,${box.depth}
									V ${box.depth / 2}
									H ${box.materialThickness}
									V 0`}
				/>
			</g>
		</>
	);
}

function Path({
	fill = 'none',
	stroke = '#000',
	strokeLinecap = 'square',
	...props
}) {
	return (
		<path
			fill={fill}
			stroke={stroke}
			strokeLinecap={strokeLinecap}
			{...props}
		/>
	);
}
