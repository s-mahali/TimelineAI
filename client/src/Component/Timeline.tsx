import { ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import type { TimelineEvent } from "../types/types";
import { useEffect } from "react";


import {
 
  type Node,
  type Edge,
  Background,
  BackgroundVariant,
  Controls,
} from "@xyflow/react";
import { nodeTypes } from "../App";
export const TimelineCanvas = ({ events, searchQuery }: { events: TimelineEvent[], searchQuery: string }) => {
  const { fitView } = useReactFlow();
  
 
  const getLayout = (data: TimelineEvent[]) => {
    const nodes: Node[] = data.map((ev, index) => ({
      id: ev.id,
      type: "card",
    
      position: { x: index * 450, y: index % 2 === 0 ? 0 : 220 }, 
      data: { ...ev },
    }));

    const edges: Edge[] = data.slice(0, -1).map((ev, i) => ({
      id: `e-${ev.id}-${data[i + 1].id}`,
      source: ev.id,
      target: data[i + 1].id,
      animated: true,
      style: { stroke: "#3f3f46", strokeWidth: 2 },  
    }));
    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = getLayout(events);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

 
  useEffect(() => {
    const layout = getLayout(events);
    setNodes(layout.nodes);
    setEdges(layout.edges);
    
   
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 100);
  }, [events, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      minZoom={0.2}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    >
     
      <Background 
        color="#27272a"  
        variant={BackgroundVariant.Dots} 
        size={2} 
        gap={30} 
        className="opacity-50"
      />
      <Controls className="!bg-[#18181b] !border-zinc-800 !text-zinc-400 [&>button]:!border-b-zinc-800 hover:[&>button]:!bg-zinc-800" />
    </ReactFlow>
  );
};