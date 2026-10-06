const fs = require('fs');
let text = fs.readFileSync('src/components/crew/CrewMemberPanel.tsx', 'utf8');

text = text.replace(
  '<div className="relative flex items-end gap-5 overflow-hidden bg-deep px-5 pb-5 pt-8">',
  '<div className="shrink-0 relative flex items-end gap-5 overflow-hidden bg-deep px-5 pb-5 pt-8">'
);

fs.writeFileSync('src/components/crew/CrewMemberPanel.tsx', text, 'utf8');
