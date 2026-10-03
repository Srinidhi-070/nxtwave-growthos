'use client';

import { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, MiniMap, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function ReferralGraphPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/graph/referrals')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          // A very simple layout algorithm stub (random positioning for demo)
          const positionedNodes = json.data.nodes.map((n: Record<string, string>) => {
            const color = n.state === 'connector' ? '#3b82f6' : n.state === 'suspicious' ? '#ef4444' : '#10b981';
            return {
              id: n.id,
              position: { x: Math.random() * 800, y: Math.random() * 600 },
              data: { label: `${n.email}\n(${n.campus})` },
              style: { 
                background: '#111', 
                color: '#fff', 
                border: `2px solid ${color}`,
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                textAlign: 'center'
              }
            };
          });
          setNodes(positionedNodes);
          setEdges(json.data.edges);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center p-8 text-zinc-500 font-mono text-sm">Loading graph...</div>;

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Referral Network</h1>
        <p className="text-sm text-zinc-500 font-medium">Visualizing the propagation of the campaign</p>
      </div>

      <div className="flex-1 w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden min-h-[600px] shadow-inner">
        <ReactFlow nodes={nodes} edges={edges} fitView colorMode="dark">
          <Background color="#333" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
