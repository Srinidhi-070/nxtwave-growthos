const fs = require('fs');
let text = fs.readFileSync('src/contexts/PlayerContext.tsx', 'utf8');

if (!text.includes("import { audio }")) {
    text = text.replace("import type { CharacterConfig } from '../types/character';", "import type { CharacterConfig } from '../types/character';\nimport { audio } from '../utils/audio';");
}

fs.writeFileSync('src/contexts/PlayerContext.tsx', text, 'utf8');
