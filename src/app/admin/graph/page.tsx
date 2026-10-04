'use client';

import { useEffect, useState, useMemo } from 'react';
import { ReactFlow, Controls, Background, Node, Edge, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { RefreshCw } from 'lucide-react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 60;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction, ranker: 'network-simplex', nodesep: 50, edgesep: 50, ranksep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export default function AdminGraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGraph = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/graph/referrals');
      const json = await res.json();
      if (json.success) {
        
        const rawNodes = json.data.nodes.map((n: any) => {
           let bgColor = '#0f172a';
           let borderColor = '#334155';
           if (n.data?.level >= 5) { bgColor = '#1e1b4b'; borderColor = '#6366f1'; }
           if (n.data?.level >= 10) { bgColor = '#422006'; borderColor = '#f59e0b'; }

           return {
             id: n.id,
             data: { 
               label: (
                 <div className="flex flex-col items-center justify-center p-2 font-pixel tracking-widest uppercase">
                   <div className="text-[10px] text-white">{n.data.label}</div>
                   <div className="text-[8px] text-cyan-400 mt-1">LVL {n.data.level}</div>
                 </div>
               )
             },
             style: {
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '0px', // Square pixel corners
                width: nodeWidth,
                height: nodeHeight,
                color: 'white',
                boxShadow: `0 0 10px ${borderColor}80`,
             },
             position: { x: 0, y: 0 }
           }
        });

        const rawEdges = json.data.edges.map((e: any) => ({
          ...e,
          animated: true,
          style: { stroke: '#06b6d4', strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
        }));

        const layouted = getLayoutedElements(rawNodes, rawEdges);
        setNodes(layouted.nodes);
        setEdges(layouted.edges);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex flex-col gap-6">
      
      {/* HEADER COMMAND BAR */}
      <div className="bg-[#020617] border border-slate-700 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(0,0,0,0.5)] shrink-0 z-10">
        <div>
          <h1 className="text-xl font-pixel text-white tracking-widest text-shadow-glow-cyan">GLOBAL NETWORK GRAPH</h1>
          <p className="text-[10px] text-slate-500 tracking-widest mt-1">TOPOLOGICAL MAPPING OF ALL NODES</p>
        </div>
        <button 
          onClick={fetchGraph}
          className="flex items-center gap-2 bg-slate-900 border border-slate-600 px-4 py-2 hover:bg-slate-800 hover:border-cyan-500 group transition-colors"
        >
          <RefreshCw className={`w-3 h-3 text-cyan-500 ${loading ? 'animate-spin' : 'group-hover:animate-spin'}`} />
          <span className="font-pixel text-[10px] text-cyan-300">SYNC TOPOLOGY</span>
        </button>
      </div>

      {/* GRAPH CANVAS */}
      <div className="flex-1 bg-[#020617] border border-slate-700 relative overflow-hidden shadow-xl rounded-none">
         {loading ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center font-pixel text-cyan-500 bg-slate-950/80 z-20">
              <div className="w-16 h-16 border-4 border-cyan-900 border-t-cyan-400 rounded-full animate-spin mb-4" />
              <div className="tracking-widest animate-pulse text-xs">MAPPING NETWORK SIGNALS...</div>
           </div>
         ) : null}
         
         <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            fitView 
            minZoom={0.1}
            proOptions={{ hideAttribution: true }}
         >
           <Background color="#1e293b" gap={30} size={2} />
           <Controls 
             className="bg-slate-900 border border-slate-700 [&>button]:border-slate-700 [&>button]:bg-slate-900 [&>button]:text-cyan-400 [&>button:hover]:bg-slate-800 rounded-none" 
             showInteractive={false} 
           />
         </ReactFlow>
      </div>

    </div>
  );
}

