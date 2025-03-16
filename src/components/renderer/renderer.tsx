'use client';

import { OrgChart } from 'd3-org-chart';
import { ExpandIcon, FullscreenIcon, KeyIcon, PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { FamilyNode, RendererFamilyNode } from '@/types/globals';
import { Button } from '@/components/shadcn/button';
import Editor from '@/components/editor/editor';
import FamilyTree from '@/components/tree/family-tree';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';

const EmptyState = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<span className='text-center text-base text-gray-500'>
				Klik tombol <strong>+</strong> di kiri atas untuk mulai menambahkan data
			</span>
		</div>
	);
};

export default function Renderer({ nodes }: RendererFamilyNode) {
	const [data, setData] = useState<FamilyNode[]>(nodes);
	const [token, setToken] = useLocalStorage<string>('token', '');

	const tokenRef = useRef<HTMLInputElement>(null);

	console.log(data);
	const [editingNode, setEditingNode] = useState<FamilyNode | null>(null);
	const [openEditor, setOpenEditor] = useState(false);
	const [nodesView, setNodesView] = useState<'expand' | 'collapse' | 'default'>('default');
	const [localStorage, setLocalStorage] = useLocalStorage<FamilyNode[]>('nodes', []);
	const chart = useRef(new OrgChart<FamilyNode>());
	const loadLocal = useSearchParams().get('local') === 'true';

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
			<div className='fixed right-5 bottom-5 flex flex-none flex-col gap-3'>
				<div>
					<Dialog>
						<DialogTrigger asChild>
							<Button size={'icon'} className='cursor-pointer shadow'>
								<KeyIcon size={16} />
							</Button>
						</DialogTrigger>
						<DialogContent className='backdrop-blur-3xl'>
							<DialogHeader>
								<DialogTitle className='font-bold'>Password</DialogTitle>
								<DialogDescription>Set password jika ingin mengubah dan mengedit data</DialogDescription>
							</DialogHeader>
							<form
								action=''
								onSubmit={(e) => {
									e.preventDefault();
									setToken(tokenRef.current?.value);
								}}
								className='flex flex-col gap-4'
							>
								<div>
									<Input defaultValue={token} id='name' className='col-span-3' ref={tokenRef} />
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button type='submit'>Simpan</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
				<div>
					<Button size={'icon'} onClick={() => setOpenEditor(true)} className='cursor-pointer shadow'>
						<PlusIcon size={16} />
					</Button>
					<Editor setNodes={setData} nodes={data} editingNode={editingNode} openEditor={openEditor} setOpenEditor={setOpenEditor} />
				</div>
				<div>
					<Button size={'icon'} onClick={() => chart.current.fit()} className='cursor-pointer shadow'>
						<FullscreenIcon size={16} />
					</Button>
				</div>
				<div>
					<Button size={'icon'} onClick={() => setNodesView(nodesView === 'expand' || nodesView === 'default' ? 'collapse' : 'expand')} className='cursor-pointer shadow'>
						<ExpandIcon size={16} />
					</Button>
				</div>
			</div>
			<div className='absolute w-full bg-white/30 p-2 text-center backdrop-blur-sm'>
				<div className='flex justify-center'>
					<span className='flex flex-1 flex-col items-center justify-center'>
						<h1 className='rounded font-semibold md:text-xl lg:text-3xl'>{'Silsilah Keluarga Bani Mufadhillah'}</h1>
						<span className='mt-2 rounded bg-gray-100 p-1 text-xs font-bold text-gray-500'>Terakhir diperbarui: {new Date().toLocaleString()}</span>
					</span>
				</div>
			</div>
			{data.length > 0 ? (
				<FamilyTree
					saveToLocalStorage={setLocalStorage}
					chart={chart.current}
					nodes={data}
					nodesView={nodesView}
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
