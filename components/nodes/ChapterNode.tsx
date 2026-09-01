// #IMPORTS
import { NodeResizer } from 'reactflow';

// #COMPONENT
export default function ChapterNode({ data, selected }: { data: any, selected: boolean }) {
  // #RENDER
  return (
    <>
      <NodeResizer 
        isVisible={selected} 
        minWidth={340} 
        minHeight={200}
        handleStyle={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#ffffff', border: '2px solid #f97316' }}
        lineStyle={{ opacity: 0, padding: 10 }} 
      />
      
      <div className="absolute -top-10 left-0 bg-white border border-gray-500 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center justify-center whitespace-nowrap z-10">
        {data.label || 'Chapter'}
      </div>
      
      <div className={`absolute inset-0 w-full h-full pointer-events-none transition-colors -z-10 ${selected ? 'border-2 border-[#f97316]' : 'border border-gray-500 rounded-xl'}`} />
    </>
  );
}