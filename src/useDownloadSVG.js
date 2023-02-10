import { useRef } from 'react';

export function useDownloadSVG() {
	const linkRef = useRef(null);

	const handleDownload = async (render) => {
		const aDownload = linkRef.current;

		const { renderToStaticMarkup } = await import('react-dom/server');

		const staticRendering = renderToStaticMarkup(render());

		// revoke last object url (safe to revoke `null`) before assigning a new one
		URL.revokeObjectURL(aDownload.href);
		aDownload.href = URL.createObjectURL(
			new Blob(
				[
					`<svg width="500mm" height="500mm" viewBox="0 0 500 500">${staticRendering}</svg>`,
				],
				{
					type: 'image/svg+xml',
				}
			)
		);

		aDownload.click();
	};

	return [linkRef, handleDownload];
}
