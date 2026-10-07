'use client';

class AudioEngine {
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
      this.bgmGain.gain.setValueAtTime(0.04, this.context.currentTime); 
      
      const filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.context.currentTime); 
      
      this.bgmLfo = this.context.createOscillator();
      this.bgmLfo.type = 'sine';
      this.bgmLfo.frequency.setValueAtTime(0.05, this.context.currentTime); 
      
      const lfoGain = this.context.createGain();
      lfoGain.gain.setValueAtTime(600, this.context.currentTime); 
      
      this.bgmLfo?.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      this.bgmOsc = [];
      const freqs = [110.00, 164.81, 220.00]; 
      freqs.forEach(f => {
        const osc = this.context!.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, this.context!.currentTime);
        if (this.bgmGain) osc.connect(this.bgmGain);
        osc.start();
        this.bgmOsc.push(osc);
      });
      
      this.bgmLfo?.start();
      
      if (this.bgmGain) this.bgmGain.connect(filter);
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

  context: AudioContext | null = null;
  enabled = true;

  init() {
    if (typeof window === 'undefined') return;
    if (!this.context) {
      try {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn("AudioContext not supported");
      }
    }
    if (this.context && this.context.state === 'suspended') {
      this.context.resume().catch(() => {});
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, vol: number) {
    if (!this.enabled || typeof window === 'undefined') return;
    this.init();
    if (!this.context) return;
    
    try {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.context.currentTime);
      
      gain.gain.setValueAtTime(vol, this.context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.context.destination);
      
      osc.start();
      osc.stop(this.context.currentTime + duration);
    } catch (e) {
      // Ignore audio errors
    }
  }

  hover() { this.playTone(600, 'sine', 0.05, 0.1); } // Volume increased from 0.015 to 0.1
  click() { this.playTone(300, 'square', 0.1, 0.3); } // Volume increased from 0.03 to 0.3
  
  success() { 
    this.playTone(600, 'sine', 0.1, 0.2); 
    setTimeout(() => this.playTone(900, 'sine', 0.2, 0.2), 100);
  }
  
  error() {
    this.playTone(150, 'sawtooth', 0.2, 0.2);
    setTimeout(() => this.playTone(100, 'sawtooth', 0.3, 0.2), 150);
  }

  boot() {
    if (!this.enabled || typeof window === 'undefined') return;
    this.init();
    if (!this.context) return;
    try {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(50, this.context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.context.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, this.context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.context.destination);
      osc.start();
      osc.stop(this.context.currentTime + 0.5);
    } catch(e) {}
  }
}

export const audio = new AudioEngine();
