// #IMPORTS
import React, { useState } from 'react';
import { 
  Plus, 
  UserRound, 
  ToolCase, 
  MountainSnow, 
  File, 
  FolderOpen,
  ChevronLeft,
  GripVertical
} from 'lucide-react';
import useStore from '../store/useStore';

// #COMPONENT
export default function FabMenu() {
  // #STATE
  const addNode = useStore((state) => state.addNode);
  const entities = useStore((state) => state.entities);
  const setActiveView = useStore((state) => state.setActiveView);
  
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'character' | 'item' | 'location'>('main');

  // #HANDLERS
  const handleAddBasicNode = (type: string, label: string) => {
    addNode({
      id: Math.random().toString(),
      type: type,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { label: label },
      zIndex: type === 'chapter' ? -1 : 1,
      ...(type === 'chapter' ? { style: { width: 400, height: 300 } } : {})
    });
    resetMenu();
  };

  const handleAddEntityNode = (type: string, entityId: string, entityName: string) => {
    addNode({
      id: Math.random().toString(),
      type: type,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { label: entityName, entityId: entityId },
      zIndex: 1
    });
    resetMenu();
  };

  const handleDragStart = (event: React.DragEvent, type: string, entityId: string) => {
    event.dataTransfer.setData('application/nodel-entity', JSON.stringify({ type, entityId }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const resetMenu = () => {
    setIsFabOpen(false);
    setActiveMenu('main');
  };

  const toggleFab = () => {
    setIsFabOpen(!isFabOpen);
    setActiveMenu('main');
  };

  // #RENDER
  const renderEntityList = (type: 'character' | 'item' | 'location') => {
    const filteredEntities = entities.filter(e => e.type === type);
    const isDraggableOnly = type === 'item' || type === 'location';
    
    return (
      <>
        {/* #SUB_MENU_HEADER */}
        <button 
          onClick={() => setActiveMenu('main')}
          className="flex items-center gap-2 w-full px-2 py-1.5 text-gray-500 hover:text-gray-900 border-b border-gray-100 mb-1 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="capitalize">Back</span>
        </button>
        
        {/* #ENTITY_LIST */}
        {filteredEntities.length > 0 ? (
          <div className="max-h-48 overflow-y-auto w-full flex flex-col gap-1">
            {filteredEntities.map(entity => (
              <div 
                key={entity.id}
                draggable={isDraggableOnly}
                onDragStart={(e) => handleDragStart(e, type, entity.id)}
                onClick={() => !isDraggableOnly && handleAddEntityNode(type, entity.id, entity.name)}
                className={`flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 rounded-md transition-colors text-sm ${
                  isDraggableOnly 
                    ? 'cursor-grab active:cursor-grabbing hover:bg-gray-50' 
                    : 'cursor-pointer hover:bg-gray-50 hover:text-gray-900 hover:font-semibold'
                }`}
                title={isDraggableOnly ? "Drag and drop into a node" : "Click to add to canvas"}
              >
                {type === 'character' && <UserRound className="w-4 h-4 flex-shrink-0" />}
                {type === 'item' && <ToolCase className="w-4 h-4 flex-shrink-0" />}
                {type === 'location' && <MountainSnow className="w-4 h-4 flex-shrink-0" />}
                
                <span className="truncate flex-1 text-left">{entity.name}</span>
                
                {isDraggableOnly && <GripVertical className="w-3.5 h-3.5 text-gray-300" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-3 py-4 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
            <span>No {type}s found.</span>
            <button 
              onClick={() => {
                setActiveView(type);
                resetMenu();
              }}
              className="text-[#f97316] hover:underline font-medium"
            >
              Create {type}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={toggleFab}
        className="bg-[#f97316] text-white p-3 rounded-lg shadow-sm hover:bg-[#ea580c] transition-all duration-300 flex items-center justify-center relative z-10"
      >
        <Plus className={`w-5 h-5 transition-transform duration-300 ${isFabOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>

      {isFabOpen && (
        <div className="absolute top-full right-0 mt-2 flex flex-col gap-1 items-end bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 w-48">
          
          {/* #MAIN_MENU */}
          {activeMenu === 'main' && (
            <>
              <button 
                onClick={() => handleAddBasicNode('story', 'New Scene')}
                className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
              >
                <File className="w-4 h-4" />
                <span>Scene</span>
              </button>
              <button 
                onClick={() => setActiveMenu('character')}
                className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
              >
                <UserRound className="w-4 h-4" />
                <span>Character</span>
              </button>
              <button 
                onClick={() => setActiveMenu('item')}
                className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
              >
                <ToolCase className="w-4 h-4" />
                <span>Item</span>
              </button>
              <button 
                onClick={() => setActiveMenu('location')}
                className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
              >
                <MountainSnow className="w-4 h-4" />
                <span>Location</span>
              </button>
              <button 
                onClick={() => handleAddBasicNode('chapter', 'New Chapter')}
                className="flex items-center gap-3 w-full px-3 py-1.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-sm hover:font-semibold"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Chapter</span>
              </button>
            </>
          )}

          {activeMenu === 'character' && renderEntityList('character')}
          {activeMenu === 'item' && renderEntityList('item')}
          {activeMenu === 'location' && renderEntityList('location')}

        </div>
      )}
    </div>
  );
}