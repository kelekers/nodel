"use client";

// #IMPORTS
import React, { useState } from 'react';
import { 
  Plus, 
  UserRound, 
  ToolCase, 
  MountainSnow, 
  FileText, 
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
    <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-3">
      {isFabOpen && (
        <div className="flex flex-col gap-2 items-end">
          <button 
            onClick={() => handleAddNode('story', 'New Scene')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>Story</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </button>
          <button 
            onClick={() => handleAddNode('chapter', 'New Chapter')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>Chapter</span>
            <FolderOpen className="w-4 h-4 text-slate-500" />
          </button>
          <button 
            onClick={() => handleAddNode('character', 'Char Name')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>Character</span>
            <UserRound className="w-4 h-4 text-yellow-500" />
          </button>
          <button 
            onClick={() => handleAddNode('item', 'Item Name')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>Item</span>
            <ToolCase className="w-4 h-4 text-orange-500" />
          </button>
          <button 
            onClick={() => handleAddNode('location', 'Location Name')}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>Location</span>
            <MountainSnow className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsFabOpen(!isFabOpen)}
        className="bg-[#f97316] text-white p-3 rounded-full shadow-lg hover:bg-[#ea580c] transition-all duration-300 flex items-center justify-center"
      >
        <Plus className={`w-6 h-6 transition-transform duration-300 ${isFabOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>
    </div>
  );
}