// #IMPORTS
import { Node, Edge } from 'reactflow';

// #FUNCTIONS
export const exportToLinearText = (nodes: Node[], edges: Edge[]) => {
  let text = "# Draft Nodel\n\n";
  const storyNodes = nodes.filter(n => n.type === 'story');
  
  if (storyNodes.length === 0) return text;

  // #HELPERS
  const getIncomingEdges = (nodeId: string) => edges.filter(e => e.target === nodeId);
  const getOutgoingEdges = (nodeId: string) => edges.filter(e => e.source === nodeId);

  const startNodes = storyNodes.filter(n => getIncomingEdges(n.id).length === 0);
  const visited = new Set<string>();

  const traverse = (nodeId: string, depth: number = 0) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (node && node.type === 'story') {
      text += `${'#'.repeat(Math.min(depth + 2, 6))} ${node.data.label}\n`;
      text += `${node.data.content}\n\n`;
    }

    const outgoing = getOutgoingEdges(nodeId);
    outgoing.forEach(edge => traverse(edge.target, depth + 1));
  };

  startNodes.forEach(node => traverse(node.id));

  const unvisited = storyNodes.filter(n => !visited.has(n.id));
  unvisited.forEach(node => traverse(node.id));

  return text;
};

export const downloadTextFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};