// #IMPORTS
import { NodeResizer } from 'reactflow';

// #COMPONENT
export default function ChapterNode({ data, selected }: { data: any, selected: boolean }) {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={300} minHeight={300} />
      <div className="bg-slate-100/50 border-2 border-dashed border-slate-400 rounded-xl w-full h-full -z-10 relative">
        <div className="absolute top-0 left-0 bg-slate-400 text-white px-4 py-1 rounded-br-xl rounded-tl-xl font-bold text-sm">
          {data.label}
        </div>
      </div>
    </>
  );
}