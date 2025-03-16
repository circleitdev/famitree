import { FamilyNode, FamilyTreeFamilyNode } from '@/types/globals';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const NodeElement = (nodes: FamilyNode[], node: FamilyNode) => {
	return renderToStaticMarkup(
		<div className='relative flex h-full flex-col gap-2 rounded-lg border p-5 text-base'>
			<div className='flex'>
				<div className='group -mr-5'>
					<Image
						height={100}
						width={100}
						src={node.sex === 'L' ? 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan&backgroundColor=b6e3f4' : 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Jameson&backgroundColor=b6e3f4'}
						alt=''
						className='relative z-10 !m-0 h-10 w-10 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105'
					/>
				</div>
				{node.spouse && (
					<div className='group'>
						<Image
							height={100}
							width={100}
							src={node.sex === 'P' ? 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan&backgroundColor=b6e3f4' : 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Jameson&backgroundColor=b6e3f4'}
							alt=''
							className='relative !m-0 h-10 w-10 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105'
						/>
					</div>
				)}
			</div>
			<div className={`${node.parentId ? 'font-normal' : 'font-bold'} mt-3`}>
				<b>{`${node.name} (${node.sex.toString()}) `}</b>
				{node.spouse && 'dan ' + node.spouse + (node.sex == 'L' ? ' (P)' : ' (L)')}
			</div>
			<div className='text-sm'>
				<div>TTL:</div>
				Surabaya, 17 Agustus 1945
			</div>
			<div className='text-sm'>
				<div>Alamat:</div>
				Jl. Pahlawan No.17, Kel. Belly Urip, Kec. Supre Sewu, Kota. Surabaya
			</div>
			{/* {node.spouse ? <div className='text-sm'>Pasangan: {node.spouse}</div> : ''}
			{node.spouse ? <div className='text-sm'>Pasangan: {node.spouse}</div> : ''}
			{node.spouse ? <div className='text-sm'>Pasangan: {node.spouse}</div> : ''} */}
			<div className='text-sm'>
				<div>Jumlah Anak:</div>
				{getTotalChildren(nodes, node.id)}
			</div>
			<div className='text-sm'>
				<div>Keterangan:</div>
				{node.notes ? node.notes : '-'}
			</div>
		</div>,
	);
};

const getTotalChildren = (nodes: FamilyNode[], parentId: string) => {
	const children = nodes.filter((node) => node.parentId === parentId).map((child) => child.name);
	if (children.length > 0) {
		return children.length;
	}
	return 0;
};

export default function FamilyTree({ chart, nodesView = 'default', nodes, clickNodeAction }: FamilyTreeFamilyNode) {
	const d3Container = useRef(null);

	useLayoutEffect(() => {
		let initialZoom = 1;
		if (window.innerWidth < 500) {
			initialZoom = 0.6;
		}

		if (d3Container.current && nodes.length > 0) {
			if (nodesView === 'collapse') {
				chart.collapseAll();
			} else if (nodesView === 'expand') {
				chart.expandAll();
			}
			chart
				.container(d3Container.current)
				.data(nodes)
				.compact(true)
				.svgHeight(window.innerHeight)
				.nodeHeight(() => 320)
				.nodeWidth(() => 500)
				.linkYOffset(0)
				.rootMargin(160)
				.setActiveNodeCentered(true)
				.buttonContent(({ node }: { node: { children: boolean } }) => {
					return renderToStaticMarkup(<div className='m-auto w-auto rounded border border-gray-300 bg-white p-1 text-sm text-gray-700 shadow'>{node.children ? <ChevronUp className='size-3' /> : <ChevronDown className='size-3' />}</div>);
				})
				.initialZoom(initialZoom)
				.onNodeClick((node: { data: FamilyNode }) => {
					clickNodeAction(node.data);
				})
				.nodeContent((node: { data: FamilyNode }) => {
					return NodeElement(nodes, node.data);
				})
				.render();
		}
	}, [chart, nodes, clickNodeAction, nodesView]);

	return (
		<div className={'h-full'}>
			<div ref={d3Container} className={'h-full'} />
		</div>
	);
}
