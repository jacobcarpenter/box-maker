import { squiggle, tabbed, divided } from './path-util';

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
						d={`M 0,0
							${divided.v(
								0,
								0,
								box.length,
								box.dividerCount,
								box.depth / 2,
								box.materialThickness,
								{ implicitEnd: true }
							)}
							L 0,${box.length - box.materialThickness}`}
						stroke="blue"
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
							${divided.v(
								box.depth,
								0,
								box.length,
								box.dividerCount,
								-(box.depth / 2),
								box.materialThickness,
								{ implicitStart: true }
							)}`}
						stroke="blue"
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

			<g
				transform={`translate(${
					box.depth +
					partSpacing +
					box.width +
					partSpacing +
					box.depth +
					partSpacing * 2 // * 2 not necessary, but more aesthetic
				},0)`}
			>
				{Array.from({ length: box.dividerCount }).map((_, index) => (
					<g
						key={index}
						transform={`translate(0,${(box.depth + partSpacing) * index})`}
					>
						<Path d={`M 0,0 L ${box.width},0`} />
						<Path
							d={`M ${box.width},0
							V ${box.depth / 2}
							h ${-box.materialThickness}
							V ${box.depth - box.materialThickness}`}
						/>
						<Path
							d={`M ${box.width - box.materialThickness},${
								box.depth - box.materialThickness
							}
								H ${box.materialThickness}`}
						/>
						<Path
							d={`M 0,0
							V ${box.depth / 2}
							h ${box.materialThickness}
							V ${box.depth - box.materialThickness}`}
						/>
					</g>
				))}
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
