// #IMPORTS
import { Handle, Position } from 'reactflow';

// #COMPONENT
export default function StoryNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-blue-500 rounded-md p-4 w-64 shadow-md">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <div className="font-bold border-b border-gray-200 mb-2 pb-1">{data.label}</div>
      <div className="text-sm text-gray-600 line-clamp-3">{data.content}</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
}