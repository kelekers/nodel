// #IMPORTS
import React, { useState } from 'react';
import { 
  Search, 
  UserRound, 
  ToolCase, 
  MountainSnow, 
  ChevronDown, 
  ChevronRight, 
  File,
  PanelLeft
} from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function Sidebar() {
  
  // #STATE
  const setActiveView = useStore((state) => state.setActiveView);
  const activeView = useStore((state) => state.activeView);
  const [isPrologueOpen, setIsPrologueOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // #RENDER
  return (
    <aside 
      className={`h-screen flex flex-col overflow-y-auto z-10 flex-shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-[290px] px-2 pt-2 pb-0 gap-2' : 'w-[48px] items-center py-4 border-r border-gray-200 bg-white mr-2'
      }`}
    >
      
      {!isSidebarOpen ? (
        // #COLLAPSED_VIEW
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors mt-1"
          title="Open Sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      ) : (
        // #EXPANDED_VIEW
        <>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                  onClick={() => setActiveView('canvas')}
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="text-[14px] text-[#555555] font-medium">NODEL</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-gray-800 hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                  title="Close Sidebar"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
              </div>
              <h1 
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-[#f97316] transition-colors"
                onClick={() => setActiveView('canvas')}
              >
                Book's Title
              </h1>
            </div>

            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-1">
            <button 
              onClick={() => setActiveView('character')}
              className={`flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors text-sm hover:font-semibold ${activeView === 'character' ? 'bg-[#fff7ed] text-[#f97316] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <UserRound className="w-5 h-5" />
              <span>Character</span>
            </button>
            <button 
              onClick={() => setActiveView('item')}
              className={`flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors text-sm hover:font-semibold ${activeView === 'item' ? 'bg-[#fff7ed] text-[#f97316] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <ToolCase className="w-5 h-5" />
              <span>Item</span>
            </button>
            <button 
              onClick={() => setActiveView('location')}
              className={`flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors text-sm hover:font-semibold ${activeView === 'location' ? 'bg-[#fff7ed] text-[#f97316] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <MountainSnow className="w-5 h-5" />
              <span>Location</span>
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-t-xl rounded-b-none p-4 shadow-sm flex flex-col flex-1 overflow-y-auto">
            <h2 className="text-md font-bold text-gray-800 mb-3 px-2">Chapter</h2>
            
            <div className="flex flex-col">
              <div 
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md text-sm text-gray-700 font-semibold"
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
                <div className="flex flex-col ml-4 border-l border-gray-200 pl-3 mt-1">
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

              <div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md text-sm text-gray-700 mt-1 font-semibold">
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <span>Epilogue</span>
              </div>
            </div>
          </div>
        </>
      )}
      
    </aside>
  );
}