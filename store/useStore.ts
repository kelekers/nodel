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

// #TYPES
export type ViewType = 'canvas' | 'character' | 'item' | 'location';

export type EntityAttribute = {
  id: string;
  key: string;
  value: string;
};

export type Entity = {
  id: string;
  type: 'character' | 'item' | 'location';
  name: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  attributes: EntityAttribute[];
};

type AppState = {
  nodes: Node[];
  edges: Edge[];
  activeView: ViewType;
  entities: Entity[];
  selectedEntityId: string | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  updateNodeData: (id: string, data: any) => void;
  setActiveView: (view: ViewType) => void;
  addEntity: (entity: Entity) => void;
  updateEntity: (id: string, data: Partial<Entity>) => void;
  deleteEntity: (id: string) => void;
  setSelectedEntityId: (id: string | null) => void;
};

// #STORE
const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      activeView: 'canvas',
      entities: [],
      selectedEntityId: null,
      
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
      updateNodeData: (id: string, data: any) => {
        set({
          nodes: get().nodes.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, ...data } } : node
          ),
        });
      },
      setActiveView: (view: ViewType) => {
        set({ activeView: view, selectedEntityId: null });
      },
      addEntity: (entity: Entity) => {
        set({ entities: [...get().entities, entity] });
      },
      updateEntity: (id: string, data: Partial<Entity>) => {
        set({
          entities: get().entities.map((e) => (e.id === id ? { ...e, ...data } : e)),
        });
      },
      deleteEntity: (id: string) => {
        set({
          entities: get().entities.filter((e) => e.id !== id),
        });
      },
      setSelectedEntityId: (id: string | null) => {
        set({ selectedEntityId: id });
      },
    }),
    {
      name: 'nodel-storage',
    }
  )
);

export default useStore;