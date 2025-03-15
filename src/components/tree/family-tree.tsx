import { FamilyNode, FamilyTreeFamilyNode } from '@/types/globals';
import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const NodeElement = (nodes: FamilyNode[], node: FamilyNode) => {
	return renderToStaticMarkup(
		<div className='h-full rounded border border-gray-200 bg-gray-100 p-4 text-base'>
			<div className='text-lg font-bold'>
				[{node.sex.toString()}] {node.name}
			</div>
			{node.spouse ? <div className='text-sm'>Pasangan : {node.spouse}</div> : ''}
			<div className='text-sm'>Anak : {getChildren(nodes, node.id)}</div>
			{node.notes ? <div className='text-sm'>Catatan : {node.notes}</div> : ''}
		</div>,
	);
};

const getChildren = (nodes: FamilyNode[], parentId: string) => {
	const children = nodes.filter((node) => node.parentId === parentId).map((child) => child.name);
	if (children.length > 0) {
		return children.join(', ');
	}
	return '-';
};

export default function FamilyTree({ setLastSync, chart, saveToLocalStorage, nodesView = 'default', nodes, clickNodeAction, familyId }: FamilyTreeFamilyNode) {
	const d3Container = useRef(null);
	const isInitialRender = useRef(true);
	const loadLocal = useSearchParams().get('local') === 'true';

	// auto save on every nodes change
	useEffect(() => {
		if (isInitialRender.current) {
			isInitialRender.current = false;
		} else {
			if (familyId !== '' && !loadLocal) {
				saveToLocalStorage(nodes);
				setLastSync(new Date());
			}
		}
	}, [nodes, familyId, setLastSync, loadLocal, saveToLocalStorage]);

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
				.linkYOffset(0)
				.rootMargin(100)
				.setActiveNodeCentered(true)
				.buttonContent(({ node }: { node: { children: boolean } }) => {
					return renderToStaticMarkup(<div className='m-auto w-auto rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 shadow'>{node.children ? 'Tutup' : 'Buka'}</div>);
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
