"use client";

// #IMPORTS
import React from 'react';
import { Handle, Position } from 'reactflow';
import { MapPin, Briefcase, X, Trash2, ToolCase} from 'lucide-react';
import useStore from '../../store/useStore';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.bubble.css';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// #COMPONENT
export default function StoryNode({ id, data }: { id: string; data: any }) {
  // #STATE
  const entities = useStore((state) => state.entities);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const onNodesChange = useStore((state) => state.onNodesChange);
  
  const location = entities.find((e) => e.id === data.locationId && e.type === 'location');
  const items = entities.filter((e) => (data.itemIds || []).includes(e.id) && e.type === 'item');

  // #HANDLERS
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { label: e.target.value });
  };

  const handleContentChange = (value: string) => {
    updateNodeData(id, { content: value });
  };

  const handleRemoveLocation = () => {
    updateNodeData(id, { locationId: null });
  };

  const handleRemoveItem = (itemId: string) => {
    updateNodeData(id, { itemIds: data.itemIds.filter((i: string) => i !== itemId) });
  };

  const handleDeleteNode = () => {
    onNodesChange([{ id, type: 'remove' }]);
  };

  // #RENDER
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-[360px] shadow-sm relative group hover:border-[#f97316]/50 transition-colors">
      
      {/* #DELETE_NODE_BUTTON */}
      <button 
        onClick={handleDeleteNode}
        className="nodrag absolute -top-3 -right-3 bg-white border border-gray-200 text-gray-400 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-sm"
        title="Delete Scene"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* #NODE_HANDLES */}
      <Handle 
        type="target" 
        position={Position.Bottom} 
        id="entity-in" 
        className="w-full h-full absolute inset-0 opacity-0 rounded-xl border-none bg-transparent z-0" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="story-in" 
        className="w-4 h-4 bg-white border-2 border-[#f97316] rounded-full cursor-crosshair z-20 hover:scale-125 transition-transform shadow-sm" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="story-out" 
        className="w-4 h-4 bg-white border-2 border-[#f97316] rounded-full cursor-crosshair z-20 hover:scale-125 transition-transform shadow-sm" 
      />
      
      {/* #INLINE_EDITOR */}
      <div className="relative z-10 flex flex-col gap-2 mb-4">
        <input 
          type="text"
          value={data.label || ''}
          onChange={handleTitleChange}
          placeholder="Scene Title..."
          className="nodrag font-bold text-gray-900 text-lg bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#f97316]/30 rounded px-1 -ml-1 placeholder:text-gray-300"
        />
        
        {/* #RICH_TEXT_BUBBLE */}
        <div className="nodrag w-full -ml-3 [&_.ql-editor]:px-2 [&_.ql-editor]:py-1 [&_.ql-editor]:min-h-[80px] [&_.ql-editor]:text-sm [&_.ql-editor]:text-gray-600 [&_.ql-editor]:leading-relaxed [&_.ql-tooltip]:z-50 [&_.ql-editor.ql-blank::before]:text-gray-300">
          <ReactQuill 
            theme="bubble"
            value={data.content || ''}
            onChange={handleContentChange}
            placeholder="Write your story scene here... (Highlight text to format)"
          />
        </div>
      </div>
      
      <hr className="border-gray-100 mb-3 relative z-10" />
      
      {/* #NESTED_ENTITIES */}
      <div className="flex flex-col gap-2 relative z-10">
        
        {/* #LOCATION_SLOT */}
        <div className="flex items-center gap-2 text-xs text-gray-500 group/loc">
          <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          <span className="font-medium truncate flex-1">
            {location ? location.name : <span className="italic text-gray-300">No location set</span>}
          </span>
          {location && (
            <button 
              onClick={handleRemoveLocation}
              className="nodrag opacity-0 group-hover/loc:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-0.5 rounded hover:bg-red-50"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* #ITEMS_SLOT */}
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <ToolCase className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0 mt-0.5" />
          <div className="flex flex-wrap gap-1 flex-1 min-h-[20px]">
            {items.length > 0 ? (
              items.map(item => (
                <span 
                  key={item.id} 
                  className="group/item flex items-center gap-1 bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] pl-1.5 pr-1 py-0.5 rounded text-[10px] font-semibold max-w-[140px]"
                >
                  <span className="truncate">{item.name}</span>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="nodrag opacity-0 group-hover/item:opacity-100 hover:text-red-600 hover:bg-orange-200/50 rounded-full p-px transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))
            ) : (
              <span className="italic text-gray-300 mt-0.5">No items attached</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}