const fs = require('fs');
let text = fs.readFileSync('src/components/crew/CrewMemberPanel.tsx', 'utf8');

// Header
text = text.replace(
  '<div className="flex items-center justify-between border-b-2 border-line px-5 py-3">', 
  '<div className="shrink-0 flex items-center justify-between border-b-2 border-line px-5 py-3">'
);

// Hero
text = text.replace(
  '<div className="flex gap-5 border-b-2 border-line p-5 bg-[url(\'/bg_chamber.jpg\')] bg-cover bg-center">',
  '<div className="shrink-0 flex gap-5 border-b-2 border-line p-5 bg-[url(\'/bg_chamber.jpg\')] bg-cover bg-center">'
);

// Stats
text = text.replace(
  '<dl className="grid grid-cols-2 gap-px bg-line">',
  '<dl className="shrink-0 grid grid-cols-2 gap-px bg-line">'
);

// Journey
text = text.replace(
  '<section className="px-5 py-6" aria-labelledby="journey-h">',
  '<section className="shrink-0 px-5 py-6" aria-labelledby="journey-h">'
);

fs.writeFileSync('src/components/crew/CrewMemberPanel.tsx', text, 'utf8');
