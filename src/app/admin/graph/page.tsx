'use client';

import { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 160;
const nodeHeight = 50;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranker: 'network-simplex', nodesep: 40, edgesep: 40, ranksep: 80 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
    return newNode;
  });

  return { nodes: layoutedNodes, edges };
};

export default function ReferralGraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/graph/referrals')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          const initialNodes: Node[] = json.data.nodes.map((n: Record<string, string>) => {
            const color = n.state === 'connector' ? '#3b82f6' : n.state === 'suspicious' ? '#ef4444' : '#10b981';
            return {
              id: n.id,
              position: { x: 0, y: 0 },
              data: { label: n.label },
              style: { 
                background: '#111', 
                color: '#fff', 
                border: `2px solid ${color}`,
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                textAlign: 'center',
                width: nodeWidth,
                boxShadow: n.state === 'suspicious' ? '0 0 15px rgba(239, 68, 68, 0.4)' : undefined
              }
            };
          });
          
          const initialEdges: Edge[] = json.data.edges.map((e: any) => ({
            ...e,
            animated: true,
            style: { stroke: '#555', strokeWidth: 1.5 }
          }));

          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges,
            'TB'
          );

          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center p-8 text-zinc-500 font-mono text-sm">Loading graph...</div>;

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Referral Network</h1>
        <p className="text-sm text-zinc-500 font-medium">Visualizing the propagation of the campaign</p>
      </div>

      <div className="w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden h-[600px] shadow-inner relative">
        <ReactFlow nodes={nodes} edges={edges} fitView colorMode="dark">
          <Background color="#333" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
