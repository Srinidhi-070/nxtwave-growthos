const fs = require('fs');
let text = fs.readFileSync('src/contexts/PlayerContext.tsx', 'utf8');

if (!text.includes("import { audio }")) {
    text = text.replace("import { CREW }", "import { audio } from '../utils/audio';\nimport { CREW }");
}

const effectCode = `
  useEffect(() => {
    audio.enabled = sound;
    if (sound) {
      const startOnInteract = () => {
        audio.startBGM();
        window.removeEventListener('click', startOnInteract);
      };
      window.addEventListener('click', startOnInteract);
      audio.startBGM();
      return () => window.removeEventListener('click', startOnInteract);
    } else {
      audio.stopBGM();
    }
  }, [sound]);
`;

text = text.replace('const [completedQuests, setCompletedQuests] = useState<string[]>([]);', 'const [completedQuests, setCompletedQuests] = useState<string[]>([]);\n' + effectCode);

fs.writeFileSync('src/contexts/PlayerContext.tsx', text, 'utf8');
