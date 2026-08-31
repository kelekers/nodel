"use client";

// #IMPORTS
import React, { useMemo } from 'react';
import ReactFlow, { Controls, Background, Panel } from 'reactflow';
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

  // #RENDER
  return (
    <div className="w-screen h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#ccc" gap={16} />
          <Controls />
          <Panel position="top-right">
            <button
              onClick={autoLayout}
              className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 font-medium text-sm"
            >
              Auto Tidy Up
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}