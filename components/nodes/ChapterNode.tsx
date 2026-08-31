// #IMPORTS
import { NodeResizer } from 'reactflow';

// #COMPONENT
export default function ChapterNode({ data, selected }: { data: any, selected: boolean }) {
  // #RENDER
  return (
    <>
      <NodeResizer color="#cbd5e1" isVisible={selected} minWidth={400} minHeight={300} />
      <div className="bg-transparent border border-gray-300 rounded-lg w-full h-full -z-10 relative mt-3">
        <div className="absolute -top-3 left-0 bg-white border border-gray-300 text-gray-900 px-3 py-1 rounded-md text-sm font-medium">
          {data.label || 'Chapter'}
        </div>
      </div>
    </>
  );
}