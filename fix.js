const fs = require('fs');
let t = fs.readFileSync('src/app/globals.css', 'utf8');

t = t.replace(/var\(--color-void\)/g, 'var(--void)');
t = t.replace(/var\(--color-deep\)/g, 'var(--deep)');
t = t.replace(/var\(--color-mute\)/g, 'var(--mute)');
t = t.replace(/var\(--color-cyan\)/g, 'var(--cyan)');

fs.writeFileSync('src/app/globals.css', t, 'utf8');
