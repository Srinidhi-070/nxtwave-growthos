const fs = require('fs');
let text = fs.readFileSync('src/app/(student)/settings/page.tsx', 'utf8');
if (!text.includes("import { usePlayer }")) {
  text = text.replace("import { audio } from '@/utils/audio';", "import { audio } from '@/utils/audio';\nimport { usePlayer } from '@/contexts/PlayerContext';");
}
fs.writeFileSync('src/app/(student)/settings/page.tsx', text, 'utf8');
