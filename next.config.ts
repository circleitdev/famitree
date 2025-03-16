import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'TOBEMODIFIED',
				hostname: 'TOBEMODIFIED',
				pathname: 'TOBEMODIFIED',
			},
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
