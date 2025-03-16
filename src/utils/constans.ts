import { FamilyNode } from '@/types/globals';

const dummyDatas: FamilyNode[] = [
	{ id: '1', name: 'Mbah Munajat', sex: 'L', spouse: 'Mbah Fadhillah', notes: '-' },
	{ id: '2', parentId: '1', name: 'Siti Rohmah', sex: 'P', notes: 'Meninggal Dunia' },
	{ id: '3', parentId: '1', name: 'Moh. Basyar', sex: 'L', spouse: '', notes: 'Meninggal Dunia' },
	{ id: '6', parentId: '1', name: 'Siti Masyuriyah', sex: 'P', spouse: 'Sahlan Maksum', notes: '-' },
	{ id: '4', parentId: '1', name: 'Moh Muhtadin', sex: 'L', notes: 'Meninggal Dunia' },
	{ id: '5', parentId: '1', name: 'Hj. Siti Maesaroh', sex: 'P', notes: '-' },
	{ id: '7', parentId: '1', name: 'Maemonah', sex: 'P', spouse: 'Chudlori', notes: 'Meninggal Dunia' },
	{ id: '8', parentId: '1', name: "Mun'im", sex: 'L', spouse: '', notes: '-' },
	{ id: '9', parentId: '1', name: "In'am", sex: 'L', spouse: '', notes: '-' },
];

export { dummyDatas };
