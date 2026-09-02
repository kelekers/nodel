"use client";

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
  PanelLeft,
  Download
} from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function Sidebar() {
  
  // #STATE
  const setActiveView = useStore((state) => state.setActiveView);
  const activeView = useStore((state) => state.activeView);
  const [isPrologueOpen, setIsPrologueOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // #HANDLERS
  const handleCompileAndExport = () => {
    // Mengambil state terbaru tanpa membuat komponen Sidebar re-render terus-menerus
    const nodes = useStore.getState().nodes;
    const edges = useStore.getState().edges;

    const storyNodes = nodes.filter(n => n.type === 'story');
    if (storyNodes.length === 0) {
      alert("No story scenes found on the canvas!");
      return;
    }

    // Membangun Adjacency List untuk menelusuri koneksi
    const graph: Record<string, string[]> = {};
    edges.forEach(edge => {
      if (!graph[edge.source]) graph[edge.source] = [];
      graph[edge.source].push(edge.target);
    });

    // Mencari node awal (Root): Node yang tidak menjadi target dari edge mana pun
    const targets = new Set(edges.map(e => e.target));
    const roots = storyNodes.filter(n => !targets.has(n.id));

    const orderedNodes: typeof storyNodes = [];
    
    // Jika tidak ada garis sama sekali, urutkan saja dari atas ke bawah
    if (roots.length === 0 && edges.length === 0) {
      orderedNodes.push(...[...storyNodes].sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x));
    } else {
      // Penelusuran DFS (Depth-First Search) untuk merangkai cerita
      const visited = new Set<string>();
      
      const dfs = (nodeId: string) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        
        const node = nodes.find(n => n.id === nodeId);
        if (node && node.type === 'story') {
          orderedNodes.push(node);
        }
        
        const children = graph[nodeId] || [];
        children.forEach(childId => dfs(childId));
      };

      // Mulai dari setiap root
      roots.forEach(root => dfs(root.id));
      
      // Tambahkan node yang mungkin tertinggal (tidak tersambung ke root mana pun)
      storyNodes.forEach(n => {
        if (!visited.has(n.id)) dfs(n.id);
      });
    }

    // Menghasilkan dokumen Markdown
    let markdown = "# Compiled Story Manuscript\n\n";
    
    orderedNodes.forEach((node, index) => {
      markdown += `## ${node.data.label || 'Scene ' + (index + 1)}\n\n`;
      
      // Membersihkan tag HTML dari Quill menjadi teks murni
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = node.data.content || '';
      
      // Tambahkan line-break agar paragraf terbaca rapi
      const textContent = Array.from(tempDiv.childNodes)
        .map(node => node.textContent?.trim() || '')
        .filter(text => text.length > 0)
        .join('\n\n');
        
      markdown += textContent + "\n\n---\n\n";
    });

    // Memicu unduhan file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My_Nodel_Story.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

          {/* #CHAPTERS_&_EXPORT */}
          <div className="bg-white border border-gray-200 rounded-t-xl rounded-b-none p-4 shadow-sm flex flex-col flex-1 overflow-hidden relative">
            <h2 className="text-md font-bold text-gray-800 mb-3 px-2">Chapter</h2>
            
            <div className="flex flex-col flex-1 overflow-y-auto pb-16">
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
                </div>
              )}

              <div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md text-sm text-gray-700 mt-1 font-semibold">
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <span>Epilogue</span>
              </div>
            </div>

            {/* #EXPORT_BUTTON */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/90 border-t border-gray-100">
              <button 
                onClick={handleCompileAndExport}
                className="flex items-center justify-center gap-2 w-full bg-[#f97316] text-white px-4 py-2.5 rounded-lg shadow-sm hover:bg-[#ea580c] transition-colors text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Compile & Export</span>
              </button>
            </div>

          </div>
        </>
      )}
      
    </aside>
  );
}