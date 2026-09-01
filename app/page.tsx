"use client";

// #IMPORTS
import React, { useMemo } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  BackgroundVariant 
} from 'reactflow';
import useStore from '../store/useStore';
import StoryNode from '../components/nodes/StoryNode';
import CharacterNode from '../components/nodes/CharacterNode';
import ChapterNode from '../components/nodes/ChapterNode';
import Sidebar from '../components/Sidebar';
import FabMenu from '../components/FabMenu';

// #MAIN_COMPONENT
export default function NodelCanvas() {
  // #STATE
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

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
    <div className="w-screen h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col relative overflow-hidden pr-2 pt-2">
        
        {/* #TABS_HEADER */}
        <div className="flex items-end pl-0">
          <div className="bg-white px-8 py-1 text-sm font-medium border border-gray-200 rounded-xl text-gray-700 mb-1 z-10 relative">
            Sequel
          </div>
        </div>

        {/* #CANVAS_AREA */}
        <div className="flex-1 relative bg-white border border-gray-200 rounded-xl overflow-hidden">
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
              color="#aeaeae" 
            />
            <Controls />
          </ReactFlow>

          <FabMenu />
          
        </div>
      </div>
    </div>
  );
}