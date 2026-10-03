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
              data: { label: n.label },
              style: { background: color, color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' }
            };
          });

          const formattedEdges = json.data.edges.map((e: Record<string, string>) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            animated: true,
            label: e.label,
            style: { stroke: '#64748b' }
          }));

          setNodes(positionedNodes);
          setEdges(formattedEdges);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Rendering Graph...</div>;

  return (
    <main className="h-screen w-full bg-slate-950 flex flex-col">
      <header className="p-6 border-b border-slate-800 bg-slate-900">
        <h1 className="text-2xl font-bold text-white">Referral Network Graph</h1>
        <p className="text-slate-400 text-sm">Visualizing nodes (Blue: Connector, Green: User, Red: Suspicious)</p>
      </header>
      <div className="flex-1 w-full">
        <ReactFlow nodes={nodes} edges={edges} fitView colorMode="dark">
          <Controls />
          <MiniMap nodeColor={(n) => n.style?.background as string} />
          <Background color="#1e293b" gap={16} />
        </ReactFlow>
      </div>
    </main>
  );
}
