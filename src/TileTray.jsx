import { TileTrayParts } from './TileTrayParts';

export function TileTray() {
	const partSpacing = 8;

	const thickness = 3;

	const tileAreaSize = 38;
	const sideSize = 33;
	const height = 21;

	const tabLength = 10;
	const tabGap = 15;

	return (
		<section>
			<h1>Tile tray</h1>

			<svg
				width={640}
				height={500}
				sx={{
					backgroundColor: '#fff',
					width: '100%',
				}}
			>
				<g transform="scale(2,2)">
					<g transform="translate(10,10)">
						<TileTrayParts
							partSpacing={partSpacing}
							thickness={thickness}
							tileAreaSize={tileAreaSize}
							sideSize={sideSize}
							height={height}
							tabLength={tabLength}
							tabGap={tabGap}
						/>
					</g>
				</g>
			</svg>
		</section>
	);
}
