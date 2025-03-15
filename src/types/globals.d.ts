export type FamilyNode = {
	id: string;
	parentId?: string;
	name: string;
	sex: 'L' | 'P';
	spouse?: string;
	notes?: string;
};

export type RendererFamilyNode = {
	nodes: FamilyNode[];
	title: string;
	id: string;
	updatedAt: Date | null;
};

export type MenuFamilyNode = {
	nodes: FamilyNode[];
	setFamily: ({ id, title }: { id: string; title: string }) => void;
	loadLocalStorage: () => void;
	lastSync: Date;
	chart: OrgChart<FamilyNode>;
	toggleNodesView: () => void;
	family: {
		id: string;
		title: string;
	};
};

export type FamilyTreeFamilyNode = {
	nodes: FamilyNode[];
	nodesView?: 'expand' | 'collapse' | 'default';
	familyId: string | null;
	saveToLocalStorage: (nodes: FamilyNode[]) => void;
	chart: OrgChart<FamilyNode>;
	setLastSync: (lastSync: Date) => void;
	clickNodeAction: (node: FamilyNode) => void;
};
