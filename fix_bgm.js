const fs = require('fs');
let text = fs.readFileSync('src/utils/audio.ts', 'utf8');

const replacement = `
  bgmOsc: any = null;
  bgmGain: GainNode | null = null;
  bgmLfo: OscillatorNode | null = null;

  startBGM() {
    if (!this.enabled || typeof window === 'undefined') return;
    if (this.bgmOsc) return; 
    this.init();
    if (!this.context) return;
    try {
      this.bgmGain = this.context.createGain();
      this.bgmGain.gain.setValueAtTime(0.15, this.context.currentTime); 
      
      const filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.context.currentTime); 
      
      this.bgmLfo = this.context.createOscillator();
      this.bgmLfo.type = 'sine';
      this.bgmLfo.frequency.setValueAtTime(0.05, this.context.currentTime); 
      
      const lfoGain = this.context.createGain();
      lfoGain.gain.setValueAtTime(600, this.context.currentTime); 
      
      this.bgmLfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      this.bgmOsc = [];
      const freqs = [110.00, 164.81, 220.00]; 
      freqs.forEach(f => {
        const osc = this.context.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, this.context.currentTime);
        osc.connect(this.bgmGain);
        osc.start();
        this.bgmOsc.push(osc);
      });
      
      this.bgmLfo.start();
      
      this.bgmGain.connect(filter);
      filter.connect(this.context.destination);
    } catch(e) {
      console.error("BGM Error:", e);
    }
  }

  stopBGM() {
    if (this.bgmGain && this.context) {
      try {
        this.bgmGain.gain.setTargetAtTime(0, this.context.currentTime, 0.5);
        setTimeout(() => {
          if (Array.isArray(this.bgmOsc)) {
             this.bgmOsc.forEach(o => { o.stop(); o.disconnect(); });
          } else if (this.bgmOsc) {
             this.bgmOsc.stop(); this.bgmOsc.disconnect();
          }
          this.bgmLfo?.stop();
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

const regex = /bgmOsc:[\s\S]*?stopBGM\(\) \{[\s\S]*?\}\s*\}\s*\}/;
text = text.replace(regex, replacement.trim());
fs.writeFileSync('src/utils/audio.ts', text, 'utf8');
