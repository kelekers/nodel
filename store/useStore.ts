// #IMPORTS
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { getLayoutedElements } from '../utils/layout';

// #INTERFACES
type AppState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  autoLayout: () => void;
  setGraph: (nodes: Node[], edges: Edge[]) => void;
};

// #INITIAL_DATA
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'story',
    position: { x: 250, y: 100 },
    data: { label: 'Start Chapter', content: 'Awal mula cerita...' },
  },
];

const initialEdges: Edge[] = [];

// #HELPERS
const detectConflicts = (nodes: Node[], edges: Edge[]) => {
  const connectionCount: Record<string, number> = {};
  
  edges.forEach(e => {
    const sourceNode = nodes.find(n => n.id === e.source);
    if (sourceNode?.type === 'character') {
      connectionCount[e.source] = (connectionCount[e.source] || 0) + 1;
    }
  });

  return nodes.map(node => {
    if (node.type === 'character') {
      const hasConflict = (connectionCount[node.id] || 0) > 1;
      return { ...node, data: { ...node.data, conflict: hasConflict } };
    }
    return node;
  });
};

// #STORE
const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      onNodesChange: (changes: NodeChange[]) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        const newEdges = applyEdgeChanges(changes, get().edges);
        const updatedNodes = detectConflicts(get().nodes, newEdges);
        set({ edges: newEdges, nodes: updatedNodes });
      },
      onConnect: (connection: Connection) => {
        const newEdges = addEdge(connection, get().edges);
        const updatedNodes = detectConflicts(get().nodes, newEdges);
        set({ edges: newEdges, nodes: updatedNodes });
      },
      addNode: (node: Node) => {
        set({ nodes: [...get().nodes, node] });
      },
      autoLayout: () => {
        const { nodes, edges } = getLayoutedElements(get().nodes, get().edges);
        set({ nodes: [...nodes], edges: [...edges] });
      },
      setGraph: (nodes: Node[], edges: Edge[]) => {
        set({ nodes, edges });
      },
    }),
    {
      name: 'nodel-storage',
    }
  )
);

export default useStore;