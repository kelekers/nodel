// #IMPORTS
import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import { initGoogleAuth, loginToDrive, saveToDrive } from '../utils/drive';
import { exportToLinearText, downloadTextFile } from '../utils/export';

// #COMPONENT
export default function Sidebar() {
  // #STATE
  const addNode = useStore((state) => state.addNode);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // #EFFECTS
  useEffect(() => {
    initGoogleAuth(() => setIsAuthenticated(true));
  }, []);

  // #HANDLERS
  const handleAddStory = () => {
    addNode({
      id: Math.random().toString(),
      type: 'story',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'New Scene', content: 'Tulis adegan di sini...' },
    });
  };

  const handleAddCharacter = () => {
    addNode({
      id: Math.random().toString(),
      type: 'character',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'New Character', role: 'Peran' },
    });
  };

  const handleAddChapter = () => {
    addNode({
      id: Math.random().toString(),
      type: 'chapter',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'New Chapter Group' },
      style: { width: 400, height: 400 },
    });
  };

  const handleSaveToDrive = async () => {
    try {
      await saveToDrive('nodel-draft.json', { nodes, edges });
      alert('Berhasil disimpan ke Google Drive!');
    } catch (error) {
      alert('Gagal menyimpan file.');
    }
  };

  const handleExportText = () => {
    const textContent = exportToLinearText(nodes, edges);
    downloadTextFile(textContent, 'nodel-manuscript.txt');
  };

  // #RENDER
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 shadow-sm z-10 overflow-y-auto">
      <div className="font-bold text-lg mb-2 text-gray-800">Nodel Tools</div>
      <button 
        onClick={handleAddStory}
        className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded shadow-sm hover:bg-blue-100 transition-colors text-sm font-medium text-left"
      >
        + Add Story Node
      </button>
      <button 
        onClick={handleAddCharacter}
        className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded shadow-sm hover:bg-yellow-100 transition-colors text-sm font-medium text-left"
      >
        + Add Character Node
      </button>
      <button 
        onClick={handleAddChapter}
        className="bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded shadow-sm hover:bg-slate-200 transition-colors text-sm font-medium text-left"
      >
        + Add Chapter Group
      </button>

      <div className="mt-6 font-bold text-sm text-gray-500 uppercase tracking-wider">Cloud Sync</div>
      
      {!isAuthenticated ? (
        <button 
          onClick={loginToDrive}
          className="bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded shadow-sm hover:bg-green-100 transition-colors text-sm font-medium text-left"
        >
          Login Google Drive
        </button>
      ) : (
        <button 
          onClick={handleSaveToDrive}
          className="bg-indigo-50 border border-indigo-300 text-indigo-700 px-4 py-2 rounded shadow-sm hover:bg-indigo-100 transition-colors text-sm font-medium text-left"
        >
          Save to Drive
        </button>
      )}

      <div className="mt-6 font-bold text-sm text-gray-500 uppercase tracking-wider">Export</div>
      
      <button 
        onClick={handleExportText}
        className="bg-gray-800 text-white px-4 py-2 rounded shadow-sm hover:bg-gray-700 transition-colors text-sm font-medium text-left"
      >
        Export to TXT
      </button>
    </aside>
  );
}