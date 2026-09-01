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
  const activeView = useStore((state) => state.activeView);
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
          <div className="bg-white px-8 py-1 text-sm font-medium border border-gray-200 rounded-xl text-gray-700 mb-1 z-10 relative capitalize">
            {activeView === 'canvas' ? 'Sequel' : `${activeView} Database`}
          </div>
        </div>

        {/* #MAIN_AREA */}
        <div className="flex-1 relative bg-[#fafafa] border border-gray-200 rounded-t-xl overflow-hidden">
          
          {activeView === 'canvas' ? (
            <>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                snapToGrid={true}
                snapGrid={[10, 10]}
                fitView
              >
                <Background 
                  variant={BackgroundVariant.Dots} 
                  gap={20} 
                  size={1.2} 
                  color="#999999" 
                />
                <Controls />
              </ReactFlow>
              <FabMenu />
            </>
          ) : (
            // #PLACEHOLDER_SPRINT_2
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">
                {activeView} Management
              </h2>
              <p className="text-gray-500">
                Tampilan database entitas akan dirender di sini pada Sprint 2.
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}