// #IMPORTS
import { Handle, Position } from 'reactflow';

// #COMPONENT
export default function CharacterNode({ data }: { data: any }) {
  // #RENDER
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="bg-white border border-gray-300 rounded-full w-14 h-14 shadow-sm flex items-center justify-center">
        <Handle 
          type="source" 
          position={Position.Top} 
          className="w-2 h-2 opacity-0" 
        />
      </div>
      <div className="text-xs text-gray-700 mt-2 text-center absolute top-14 w-24">
        {data.label}
      </div>
    </div>
  );
}