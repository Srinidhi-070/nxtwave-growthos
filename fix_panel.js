const fs = require('fs');
let text = fs.readFileSync('src/components/crew/CrewMemberPanel.tsx', 'utf8');

text = text.replace(/<div className="mt-auto border-t-2 border-line p-5">/g, '<div className="mt-auto shrink-0 border-t-2 border-line p-5 pb-8">');

fs.writeFileSync('src/components/crew/CrewMemberPanel.tsx', text, 'utf8');
