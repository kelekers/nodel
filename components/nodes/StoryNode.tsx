// #IMPORTS
import React from 'react';
import { Handle, Position } from 'reactflow';
import { MapPin, ToolCase } from 'lucide-react';
import useStore from '../../store/useStore';

// #COMPONENT
export default function StoryNode({ id, data }: { id: string; data: any }) {
  // #STATE
  const entities = useStore((state) => state.entities);
  const updateNodeData = useStore((state) => state.updateNodeData);
  
  const location = entities.find((e) => e.id === data.locationId && e.type === 'location');
  const items = entities.filter((e) => (data.itemIds || []).includes(e.id) && e.type === 'item');

  // #HANDLERS
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { label: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { content: e.target.value });
  };

  // #RENDER
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-[360px] shadow-sm relative group hover:border-[#f97316]/50 transition-colors">
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
        className="w-2 h-2 opacity-0" 
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
        <textarea 
          value={data.content || ''}
          onChange={handleContentChange}
          placeholder="Write your story scene here..."
          className="nodrag text-sm text-gray-600 leading-relaxed bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-[#f97316]/30 rounded px-1 -ml-1 min-h-[80px] resize-y placeholder:text-gray-300"
        />
      </div>
      
      <hr className="border-gray-100 mb-3 relative z-10" />
      
      {/* #NESTED_ENTITIES */}
      <div className="flex flex-col gap-2 relative z-10">
        
        {/* #LOCATION_SLOT */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          <span className="font-medium truncate flex-1">
            {location ? location.name : <span className="italic text-gray-300">No location set</span>}
          </span>
        </div>

        {/* #ITEMS_SLOT */}
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <ToolCase className="w-3.5 h-3.5 text-[#f97316] flex-shrink-0 mt-0.5" />
          <div className="flex flex-wrap gap-1 flex-1 min-h-[20px]">
            {items.length > 0 ? (
              items.map(item => (
                <span 
                  key={item.id} 
                  className="bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] px-1.5 py-0.5 rounded text-[10px] font-semibold truncate max-w-[120px]"
                >
                  {item.name}
                </span>
              ))
            ) : (
              <span className="italic text-gray-300 mt-0.5">No items attached</span>
            )}
          </div>
        </div>

      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        id="story-out" 
        className="w-2 h-2 opacity-0" 
      />
    </div>
  );
}