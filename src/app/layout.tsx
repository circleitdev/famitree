import '@/styles/globals.css';

import { Inter as Font } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const font = Font({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'block',
	preload: true,
});

export const metadata: Metadata = {
	title: 'Famitree',
	description: 'Enhanced family tree aka silsilah keluarga',
};

export const viewport: Viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1.0,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${font.className} antialiased`}>{children}</body>
		</html>
	);
}
