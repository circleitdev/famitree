'use client';

import { OrgChart } from 'd3-org-chart';
import { PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { FamilyNode, RendererFamilyNode } from '@/types/globals';
import { Button } from '@/components/shadcn/button';
import Editor from '@/components/editor/editor';
import Menu from '@/components/menu/menu';
import FamilyTree from '@/components/tree/family-tree';

const EmptyState = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<span className='text-center text-base text-gray-500'>
				Klik tombol <strong>+</strong> di kiri atas untuk mulai menambahkan data
			</span>
		</div>
	);
};

export default function Renderer({ nodes, title, id, updatedAt }: RendererFamilyNode) {
	const [data, setData] = useState<FamilyNode[]>(nodes);
	const [editingNode, setEditingNode] = useState<FamilyNode | null>(null);
	const [openEditor, setOpenEditor] = useState(false);
	const [nodesView, setNodesView] = useState<'expand' | 'collapse' | 'default'>('default');
	const [lastSync, setLastSync] = useState<Date>(updatedAt ?? new Date());
	const [localStorage, setLocalStorage] = useLocalStorage<FamilyNode[]>('nodes', []);
	const [family, setFamily] = useState<{ id: string; title: string }>({
		id: id,
		title: title,
	});
	const chart = useRef(new OrgChart<FamilyNode>());
	const loadLocal = useSearchParams().get('local') === 'true';

	const openLocalVersion = () => {
		const url = new URL(window.location.href);
		url.searchParams.set('local', 'true');
		window.open(url.toString(), '_blank');
	};

	useEffect(() => {
		if (loadLocal) {
			setData(localStorage);
		}
	}, [loadLocal, localStorage]);

	useEffect(() => {
		if (!openEditor) {
			setEditingNode(null);
		}
	}, [openEditor]);

	return (
		<div id='wrapper' className='h-screen'>
			<div className='absolute w-full bg-white/30 p-2 text-center backdrop-blur-sm'>
				<div className='flex justify-center'>
					<span className='flex-none'>
						<Button size={'icon'} onClick={() => setOpenEditor(true)} className='shadow'>
							<PlusIcon size={16} />
						</Button>
						<Editor setNodes={setData} nodes={data} editingNode={editingNode} openEditor={openEditor} setOpenEditor={setOpenEditor} />
					</span>
					<span className='flex flex-1 flex-col items-center justify-center'>
						<h1 className='rounded font-semibold md:text-xl lg:text-3xl'>{family.title !== '' ? family.title : 'Silsilah Keluarga'}</h1>
						<span className='mt-2 rounded bg-gray-100 p-1 text-xs font-bold text-gray-500'>Sinkronisasi: {family.id ? lastSync.toLocaleString() : 'Belum disimpan'}</span>
					</span>
					<span className='flex-none'>
						<Menu loadLocalStorage={openLocalVersion} chart={chart.current} toggleNodesView={() => setNodesView(nodesView === 'expand' || nodesView === 'default' ? 'collapse' : 'expand')} nodes={data} setFamily={setFamily} family={family} lastSync={lastSync} />
					</span>
				</div>
			</div>
			{data.length > 0 ? (
				<FamilyTree
					saveToLocalStorage={setLocalStorage}
					chart={chart.current}
					nodes={data}
					familyId={family.id}
					nodesView={nodesView}
					setLastSync={setLastSync}
					clickNodeAction={(node: FamilyNode) => {
						setOpenEditor(true);
						setEditingNode(node);
					}}
				/>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
