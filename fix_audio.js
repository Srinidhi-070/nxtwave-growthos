const fs = require('fs');
let text = fs.readFileSync('src/utils/audio.ts', 'utf8');

const bgmCode = `
  bgmOsc: OscillatorNode | null = null;
  bgmGain: GainNode | null = null;
  bgmLfo: OscillatorNode | null = null;

  startBGM() {
    if (!this.enabled || typeof window === 'undefined') return;
    if (this.bgmOsc) return; 
    this.init();
    if (!this.context) return;
    try {
      this.bgmOsc = this.context.createOscillator();
      this.bgmGain = this.context.createGain();
      this.bgmLfo = this.context.createOscillator();
      
      this.bgmOsc.type = 'triangle';
      this.bgmOsc.frequency.setValueAtTime(55, this.context.currentTime); // Low A1 drone
      
      this.bgmLfo.type = 'sine';
      this.bgmLfo.frequency.setValueAtTime(0.08, this.context.currentTime); // Very slow pulse
      
      const lfoGain = this.context.createGain();
      lfoGain.gain.setValueAtTime(0.03, this.context.currentTime); 
      
      this.bgmLfo.connect(lfoGain);
      lfoGain.connect(this.bgmGain.gain);
      
      this.bgmGain.gain.setValueAtTime(0.05, this.context.currentTime); // Base vol
      
      // Filter for lo-fi muffled sound
      const filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.context.currentTime);
      
      this.bgmOsc.connect(filter);
      filter.connect(this.bgmGain);
      this.bgmGain.connect(this.context.destination);
      
      this.bgmOsc.start();
      this.bgmLfo.start();
    } catch(e) {}
  }

  stopBGM() {
    if (this.bgmGain && this.context) {
      try {
        this.bgmGain.gain.setTargetAtTime(0, this.context.currentTime, 0.5);
        setTimeout(() => {
          this.bgmOsc?.stop();
          this.bgmLfo?.stop();
          this.bgmOsc?.disconnect();
          this.bgmLfo?.disconnect();
          this.bgmGain?.disconnect();
          this.bgmOsc = null;
          this.bgmLfo = null;
          this.bgmGain = null;
        }, 1000);
      } catch(e) {}
    }
  }
`;

text = text.replace('class AudioEngine {', 'class AudioEngine {' + bgmCode);
fs.writeFileSync('src/utils/audio.ts', text, 'utf8');
