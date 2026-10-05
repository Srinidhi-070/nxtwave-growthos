const fs = require('fs');

function convertShell(inFile, outFile, routeMap) {
  let content = fs.readFileSync(inFile, 'utf-8');
  
  content = "'use client';\n" + content;
  content = content.replace(/import \{ Link, NavLink, Outlet \} from 'react-router-dom';/, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
  content = content.replace(/import \{ NavLink, Outlet \} from 'react-router-dom';/, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
  content = content.replace(/import \{ Link \} from 'react-router-dom';/, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
  
  content = content.replace(/\.\.\/\.\.\/components/g, "@/components");
  content = content.replace(/\.\.\/\.\.\/contexts/g, "@/contexts");
  content = content.replace(/\.\.\/\.\.\/hooks/g, "@/hooks");
  content = content.replace(/\.\.\/\.\.\/utils/g, "@/utils");
  content = content.replace(/\.\.\/brand/g, "@/components/brand");
  content = content.replace(/\.\.\/pixel/g, "@/components/pixel");
  content = content.replace(/<Outlet \/>/g, "{children}");
  
  // replace export function StudentShell() with export default function StudentLayout({ children }: { children: React.ReactNode })
  content = content.replace(/export function StudentShell\(\)/, "export default function StudentLayout({ children }: { children: React.ReactNode })");
  content = content.replace(/export function OpsShell\(\)/, "export default function AdminLayout({ children }: { children: React.ReactNode })");
  
  // Route Map
  for (const [key, val] of Object.entries(routeMap)) {
    content = content.replaceAll("'" + key + "'", "'" + val + "'");
    content = content.replaceAll('"' + key + '"', '"' + val + '"');
  }
  
  // Fix NavLink classNames
  // React Router: className={({ isActive }) => cn('...', isActive ? '...' : '...')}
  // Next.js: className={cn('...', pathname === n.to ? '...' : '...')}
  content = content.replaceAll("<NavLink", "<Link");
  content = content.replaceAll("</NavLink>", "</Link>");
  
  // This is tricky, let's just do a string replacement for the exact patterns
  // In StudentShell:
  // className={({ isActive }) => cn('relative px-3 py-2 font-px text-[11px] tracking-widest transition-colors duration-150', isActive ? 'text-lime' : 'text-ink/70 hover:text-cyan')}
  content = content.replace(/className=\{\(\{ isActive \}\} =>\s*cn\(([^,]+),\s*isActive \? ([^:]+) : ([^\)]+)\)\s*\}/g, "className={cn($1, pathname === n.to ? $2 : $3)}");
  
  // Replace usePlayer() { level } since level was missing or something, wait no it's fine.
  
  // Actually, let's just write the Next.js className logic explicitly
  content = content.replace(/className=\{\(\{\s*isActive\s*\}\)\s*=>/g, "className={");
  content = content.replace(/isActive \?/g, "(pathname === n.to || pathname === n.path || pathname === item.path) ?");

  // Fix 	o={...} to href={...} inside <Link>
  content = content.replace(/<Link([^>]+)to=\{([^}]+)\}/g, "<Link={}");
  content = content.replace(/<Link([^>]+)to="([^"]+)"/g, "<Link=\"\"");
  content = content.replace(/<Logo to="([^"]+)"/g, "<Logo href=\"\"");

  // Fix usePlayer inside layout
  if (content.includes("StudentLayout")) {
     content = content.replace("const { character, explorerName, level } = usePlayer();", "const { character, explorerName, level } = usePlayer();\n  const pathname = usePathname();");
  }
  if (content.includes("AdminLayout")) {
     content = content.replace("export default function AdminLayout({ children }: { children: React.ReactNode }) {", "export default function AdminLayout({ children }: { children: React.ReactNode }) {\n  const pathname = usePathname();");
  }

  fs.writeFileSync(outFile, content);
}

const studentMap = {
  '/home': '/dashboard',
  '/lab': '/project'
};
convertShell('C:/Users/nssri/OneDrive/Desktop/Folders/UI design/src/components/layout/StudentShell.tsx', 'src/app/(student)/layout.tsx', studentMap);

const opsMap = {
  '/ops/overview': '/admin',
  '/ops/funnel': '/admin/funnel',
  '/ops/referrals': '/admin/graph',
  '/ops/campuses': '/admin/campuses',
  '/ops/experiments': '/admin/experiments',
  '/ops/risk': '/admin/risk',
  '/ops/copilot': '/admin/ai',
  '/ops/events': '/admin/events',
  '/ops/journey': '/admin/journey',
  '/ops/system': '/admin/system'
};
convertShell('C:/Users/nssri/OneDrive/Desktop/Folders/UI design/src/components/ops/OpsShell.tsx', 'src/app/admin/layout.tsx', opsMap);
