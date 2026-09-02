// #IMPORTS
import { Handle, Position } from 'reactflow';
import { UserRound, ToolCase, X, Trash2 } from 'lucide-react';
import useStore from '../../store/useStore';

// #COMPONENT
export default function CharacterNode({ id, data }: { id: string; data: any }) {
  // #STATE
  const entities = useStore((state) => state.entities);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const onNodesChange = useStore((state) => state.onNodesChange);
  
  const entity = entities.find((e) => e.id === data.entityId);
  const items = entities.filter((e) => (data.itemIds || []).includes(e.id) && e.type === 'item');

  const displayName = entity?.name || data.label || 'Unknown';
  const imageUrl = entity?.imageUrl;

  // #HANDLERS
  const handleRemoveItem = (itemId: string) => {
    updateNodeData(id, { itemIds: (data.itemIds || []).filter((i: string) => i !== itemId) });
  };

  const handleDeleteNode = () => {
    onNodesChange([{ id, type: 'remove' }]);
  };

  // #RENDER
  return (
    <div className="flex flex-col items-center justify-center relative group min-w-[140px]">
      
      {/* #DELETE_NODE_BUTTON */}
      <button 
        onClick={handleDeleteNode}
        className="nodrag absolute top-0 right-8 bg-white border border-gray-200 text-gray-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all z-30 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-sm"
        title="Remove from Canvas"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* #NODE_BODY */}
      <div className="bg-white border-2 border-gray-200 group-hover:border-[#f97316] transition-colors rounded-full w-14 h-14 shadow-sm flex items-center justify-center overflow-hidden z-10 relative mt-2">
        {imageUrl ? (
          <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <UserRound className="w-6 h-6 text-gray-300" />
        )}
        
        {/* #HANDLES */}
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-full h-full opacity-0 absolute inset-0 rounded-full border-none bg-transparent cursor-crosshair z-0" 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-full h-full opacity-0 absolute inset-0 rounded-full border-none bg-transparent cursor-crosshair z-0" 
        />
      </div>
      
      {/* #LABEL & ITEMS */}
      <div className="text-xs text-gray-700 mt-2 text-center flex flex-col items-center z-20 w-36">
        <div className="font-medium px-1.5 py-0.5 bg-white/90 rounded backdrop-blur-sm shadow-sm border border-gray-100/50 truncate w-full">
          {displayName}
        </div>

        {/* #ATTACHED_ITEMS_BADGES */}
        {items.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-full">
            {items.map(item => (
              <span 
                key={item.id} 
                className="group/item flex items-center gap-1 bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] pl-1.5 pr-1 py-0.5 rounded text-[10px] font-semibold max-w-[120px]"
              >
                <ToolCase className="w-2.5 h-2.5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="nodrag opacity-0 group-hover/item:opacity-100 hover:text-red-600 hover:bg-orange-200/50 rounded-full p-px transition-opacity ml-0.5"
                >
                  <X className="w-2 h-2" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}