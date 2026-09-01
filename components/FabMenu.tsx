"use client";

// #IMPORTS
import React, { useState } from 'react';
import { 
  Plus, 
  UserRound, 
  ToolCase, 
  MountainSnow, 
  File, 
  FolderOpen 
} from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function FabMenu() {
  // #STATE
  const addNode = useStore((state) => state.addNode);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // #HANDLERS
  const handleAddNode = (type: string, label: string) => {
    addNode({
      id: Math.random().toString(),
      type: type,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { label: label },
      ...(type === 'chapter' ? { style: { width: 400, height: 300 } } : {})
    });
    setIsFabOpen(false);
  };

  // #RENDER
  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className="bg-[#f97316] text-white p-3 rounded-lg shadow-sm hover:bg-[#ea580c] transition-all duration-300 flex items-center justify-center relative z-10"
      >
        <Plus className={`w-5 h-5 transition-transform duration-300 ${isFabOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>

      {isFabOpen && (
        <div className="absolute top-full right-0 mt-2 flex flex-col gap-1 items-end bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 w-max">
          <button 
            onClick={() => handleAddNode('story', 'New Scene')}
            className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
          >
            <File className="w-4 h-4" />
            <span>Story</span>
          </button>
          <button 
            onClick={() => handleAddNode('character', 'Char Name')}
            className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
          >
            <UserRound className="w-4 h-4" />
            <span>Character</span>
          </button>
          <button 
            onClick={() => handleAddNode('item', 'Item Name')}
            className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
          >
            <ToolCase className="w-4 h-4" />
            <span>Item</span>
          </button>
          <button 
            onClick={() => handleAddNode('location', 'Location Name')}
            className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
          >
            <MountainSnow className="w-4 h-4" />
            <span>Location</span>
          </button>
          <button 
            onClick={() => handleAddNode('chapter', 'New Chapter')}
            className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
          >
            <FolderOpen className="w-4 h-4" />
            <span>Chapter</span>
          </button>
        </div>
      )}
    </div>
  );
}