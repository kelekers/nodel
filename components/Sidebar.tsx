// #IMPORTS
import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ToolCase, 
  MountainSnow, 
  ChevronDown, 
  ChevronRight, 
  File 
} from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function Sidebar() {
  
  // #STATE
  const addNode = useStore((state) => state.addNode);
  const [isPrologueOpen, setIsPrologueOpen] = useState(true);

  // #HANDLERS
  const handleAddCharacter = () => {
    addNode({
      id: Math.random().toString(),
      type: 'character',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: 'Char Name' },
    });
  };

  const handleAddItem = () => {
    addNode({
      id: Math.random().toString(),
      type: 'item',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: 'Item Name' },
    });
  };

  const handleAddLocation = () => {
    addNode({
      id: Math.random().toString(),
      type: 'location',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: 'Location Name' },
    });
  };

  // #RENDER
  return (
    <aside className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col p-6 overflow-y-auto z-10 flex-shrink-0">
      
      {/* #PROFILE_SECTION */}
      <div className="mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-full mb-4"></div>
        <h1 className="text-xl font-bold text-gray-900">The Avengers</h1>
      </div>

      {/* #SEARCH_BAR */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
        />
      </div>

      {/* #ENTITIES_SECTION */}
      <div className="flex flex-col gap-2 mb-8">
        <button 
          onClick={handleAddCharacter}
          className="flex items-center gap-3 w-full px-2 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm"
        >
          <User className="w-4 h-4" />
          <span>Character</span>
        </button>
        <button 
          onClick={handleAddItem}
          className="flex items-center gap-3 w-full px-2 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm"
        >
          <ToolCase className="w-4 h-4" />
          <span>Item</span>
        </button>
        <button 
          onClick={handleAddLocation}
          className="flex items-center gap-3 w-full px-2 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm"
        >
          <MountainSnow className="w-4 h-4" />
          <span>Location</span>
        </button>
      </div>

      {/* #CHAPTER_NAVIGATION */}
      <div>
        <h2 className="text-sm font-bold text-gray-800 mb-3 px-2">Chapter</h2>
        
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md text-sm text-gray-700"
            onClick={() => setIsPrologueOpen(!isPrologueOpen)}
          >
            {isPrologueOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span>Prologue</span>
          </div>
          
          {isPrologueOpen && (
            <div className="flex flex-col ml-3 border-l border-gray-200 pl-3 mt-1 gap-1">
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                <File className="w-3.5 h-3.5" />
                <span>Introduction</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                <File className="w-3.5 h-3.5" />
                <span>Valley of ashes</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                <File className="w-3.5 h-3.5" />
                <span>The first party</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                <File className="w-3.5 h-3.5" />
                <span>Valheim</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                <File className="w-3.5 h-3.5" />
                <span>Last supper</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md text-sm text-gray-700 mt-1">
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span>Epilogue</span>
          </div>
        </div>
      </div>
      
    </aside>
  );
}