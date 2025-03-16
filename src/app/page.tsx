'use client';

import dynamic from 'next/dynamic';
import { dummyDatas } from '@/utils/constans';

const Renderer = dynamic(() => import('@/components/renderer/renderer'), { ssr: false });

export default function Home() {
	return <Renderer id={''} title={''} nodes={dummyDatas} updatedAt={new Date()} />;
}
