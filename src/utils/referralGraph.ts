import { seeded } from './random';

export type NodeKind = 'connector' | 'student' | 'second' | 'risk';

export interface GraphNode {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  label: string;
  campus: string;
  refs: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  kind: NodeKind;
}

const HUBS = [
{ label: 'VIKRAM.S', campus: 'VIT Vellore', kids: 9 },
{ label: 'NISHA', campus: 'SRM Chennai', kids: 8 },
{ label: 'ARJUN.K', campus: 'PES University', kids: 7 },
{ label: 'ADITYA', campus: 'NIT Trichy', kids: 6 },
{ label: 'SANA.M', campus: 'Manipal MIT', kids: 5 },
{ label: 'KABIR', campus: 'RV College of Engg.', kids: 5 },
{ label: 'CHAITU99', campus: 'CBIT Hyderabad', kids: 7, risky: true }];


export function buildReferralGraph(): {nodes: GraphNode[];edges: GraphEdge[];} {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  HUBS.forEach((h, hi) => {
    const a = hi / HUBS.length * Math.PI * 2 - Math.PI / 2;
    const hx = Math.cos(a) * 280;
    const hy = Math.sin(a) * 210;
    const hubId = `h${hi}`;
    nodes.push({ id: hubId, kind: h.risky ? 'risk' : 'connector', x: hx, y: hy, label: h.label, campus: h.campus, refs: h.kids });
    for (let k = 0; k < h.kids; k++) {
      const ka = a + (k - (h.kids - 1) / 2) / h.kids * 2.4 + (seeded(hi * 10 + k) - 0.5) * 0.3;
      const r = 70 + seeded(hi * 7 + k * 3) * 50;
      const sx = hx + Math.cos(ka) * r;
      const sy = hy + Math.sin(ka) * r;
      const sid = `${hubId}s${k}`;
      const kind: NodeKind = h.risky ? 'risk' : 'student';
      const second = !h.risky && seeded(hi * 13 + k) > 0.55 ? 1 + Math.floor(seeded(hi + k * 17) * 2) : 0;
      nodes.push({ id: sid, kind, x: sx, y: sy, label: `EXP_${hi}${k}`, campus: h.campus, refs: second });
      edges.push({ from: hubId, to: sid, kind });
      for (let g = 0; g < second; g++) {
        const ga = ka + (g - 0.5) * 0.6;
        const gx = sx + Math.cos(ga) * 46;
        const gy = sy + Math.sin(ga) * 46;
        const gid = `${sid}g${g}`;
        nodes.push({ id: gid, kind: 'second', x: gx, y: gy, label: `EXP_${hi}${k}${g}`, campus: h.campus, refs: 0 });
        edges.push({ from: sid, to: gid, kind: 'second' });
      }
    }
  });
  edges.push({ from: 'h2', to: 'h5', kind: 'connector' });
  edges.push({ from: 'h0', to: 'h1', kind: 'connector' });
  return { nodes, edges };
}