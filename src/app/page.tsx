'use client';

import dynamic from 'next/dynamic';

const Renderer = dynamic(() => import('@/components/renderer/renderer'), { ssr: false });

export default function Home() {
	return <Renderer id={''} title={''} nodes={[]} updatedAt={new Date()} />;
}
