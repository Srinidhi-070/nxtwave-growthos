const fs = require('fs');
let text = fs.readFileSync('src/app/(student)/settings/page.tsx', 'utf8');

const regex = /const \[sound, setSound\] = useState\(true\);\s*useEffect\(\(\) => \{\s*setSound\(audio\.enabled\);\s*\}, \[\]\);\s*const toggleSound = \(\) => \{\s*const next = !sound;\s*setSound\(next\);\s*audio\.enabled = next;\s*if \(next\) audio\.success\(\);\s*\};/g;

text = text.replace(regex, '');
text = text.replace('export default function SettingsPage() {', 'export default function SettingsPage() {\n  const { sound, toggleSound } = usePlayer();');

fs.writeFileSync('src/app/(student)/settings/page.tsx', text, 'utf8');
