// #IMPORTS
import { Handle, Position } from 'reactflow';

// #COMPONENT
export default function CharacterNode({ data }: { data: any }) {
  return (
    <div className={`bg-yellow-50 border-2 rounded-full p-4 w-32 h-32 flex flex-col items-center justify-center shadow-md relative transition-colors ${data.conflict ? 'border-red-500 bg-red-50' : 'border-yellow-500'}`}>
      
      {data.conflict && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
          Conflict!
        </div>
      )}

      <Handle type="target" position={Position.Top} className={`w-3 h-3 ${data.conflict ? 'bg-red-500' : 'bg-yellow-500'}`} />
      <div className="font-bold text-center text-sm">{data.label}</div>
      <div className="text-xs text-gray-500 text-center mt-1">{data.role}</div>
      <Handle type="source" position={Position.Bottom} className={`w-3 h-3 ${data.conflict ? 'bg-red-500' : 'bg-yellow-500'}`} />
    </div>
  );
}