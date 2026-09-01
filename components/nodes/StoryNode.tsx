// #IMPORTS
import { Handle, Position } from 'reactflow';

// #COMPONENT
export default function StoryNode({ data }: { data: any }) {
  // #RENDER
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-[320px] shadow-sm relative">
      <Handle 
        type="target" 
        position={Position.Bottom} 
        id="entity-in" 
        className="w-2 h-2 opacity-0" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="story-in" 
        className="w-2 h-2 opacity-0" 
      />
      
      <div className="font-bold text-gray-900 mb-2">{data.label || 'Story Title'}</div>
      <div className="text-sm text-gray-600 leading-relaxed mb-4">
        {data.content || 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et full'}
      </div>
      
      <hr className="border-gray-200 mb-3" />
      <div className="text-sm text-gray-500 italic">
        {data.footer || 'Forest'}
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