const fs = require('fs');
let text = fs.readFileSync('src/utils/audio.ts', 'utf8');

text = text.replace(/this\.bgmGain\.gain\.setValueAtTime\(0\.15,/g, 'this.bgmGain.gain.setValueAtTime(0.04,');

fs.writeFileSync('src/utils/audio.ts', text, 'utf8');
