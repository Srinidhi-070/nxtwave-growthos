'use client';

class AudioEngine {
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
