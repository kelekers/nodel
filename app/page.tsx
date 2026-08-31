"use client";

// #IMPORTS
import React, { useMemo } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  Panel,
  BackgroundVariant 
} from 'reactflow';
import useStore from '../store/useStore';
import StoryNode from '../components/nodes/StoryNode';
import CharacterNode from '../components/nodes/CharacterNode';
import ChapterNode from '../components/nodes/ChapterNode';
import Sidebar from '../components/Sidebar';

// #MAIN_COMPONENT
export default function NodelCanvas() {
  // #STATE
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const autoLayout = useStore((state) => state.autoLayout);

  // #NODE_TYPES
  const nodeTypes = useMemo(() => ({
    story: StoryNode,
    character: CharacterNode,
    chapter: ChapterNode,
  }), []);

  // #DEFAULT_EDGE_OPTIONS
  const defaultEdgeOptions = {
    style: { stroke: '#9ca3af', strokeWidth: 2 },
    type: 'default',
  };

  // #RENDER
  return (
    <div className="w-screen h-screen flex bg-gray-50/50">
      <Sidebar />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1} 
            color="#d1d5db" 
          />
          <Controls />
          <Panel position="top-right">
            <button
              onClick={autoLayout}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Auto Tidy Up
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}