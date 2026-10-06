const fs = require('fs');
let text = fs.readFileSync('src/app/(student)/quests/page.tsx', 'utf8');

text = text.replace(
  /className=\{pointer-events-none absolute -translate-x-1\/2 transition-transform duration-300 \}/g,
  'className={`pointer-events-none absolute -translate-x-1/2 transition-transform duration-300 ${activeNode.y > 75 ? "-translate-y-[115px]" : "-translate-y-[70px]"}`}'
);

fs.writeFileSync('src/app/(student)/quests/page.tsx', text, 'utf8');
