// #IMPORTS
import { create } from 'zustand';
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

// #TYPES
export type ViewType = 'canvas' | 'character' | 'item' | 'location';

type AppState = {
  nodes: Node[];
  edges: Edge[];
  activeView: ViewType;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  setActiveView: (view: ViewType) => void;
};

// #STORE
const useStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  activeView: 'canvas',
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (node: Node) => {
    set({ nodes: [...get().nodes, node] });
  },
  setActiveView: (view: ViewType) => {
    set({ activeView: view });
  },
}));

export default useStore;