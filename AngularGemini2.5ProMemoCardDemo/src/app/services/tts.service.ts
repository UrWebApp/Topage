import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceURI: string | null = null;
  private volume: number = 1; // 0 to 1

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices(): void {
    this.voices = this.synth.getVoices();
    // 嘗試恢復上次選擇的語音
    const storedVoiceURI = localStorage.getItem('tts_voiceURI');
    if (storedVoiceURI && this.voices.find(v => v.voiceURI === storedVoiceURI)) {
        this.selectedVoiceURI = storedVoiceURI;
    } else if (this.voices.length > 0) {
        // 預設選擇第一個可用的英文或中文語音
        const defaultVoice = this.voices.find(v => v.lang.startsWith('en') || v.lang.startsWith('zh')) || this.voices[0];
        this.selectedVoiceURI = defaultVoice.voiceURI;
    }

    const storedVolume = localStorage.getItem('tts_volume');
    if (storedVolume) {
        this.volume = parseFloat(storedVolume);
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  setVoice(voiceURI: string): void {
    if (this.voices.find(v => v.voiceURI === voiceURI)) {
      this.selectedVoiceURI = voiceURI;
      localStorage.setItem('tts_voiceURI', voiceURI);
    }
  }

  getSelectedVoiceURI(): string | null {
    return this.selectedVoiceURI;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    localStorage.setItem('tts_volume', this.volume.toString());
  }

  getVolume(): number {
    return this.volume;
  }

  speak(text: string): void {
    if (this.synth.speaking) {
      console.error('SpeechSynthesis.speaking');
      this.synth.cancel(); // 如果正在念，先取消
      // 等待一小段時間再開始新的，避免衝突
      setTimeout(() => this.doSpeak(text), 100);
      return;
    }
    this.doSpeak(text);
  }

  private doSpeak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      // console.log('SpeechSynthesisUtterance.onend');
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
    };

    if (this.selectedVoiceURI) {
      const voice = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (voice) {
        utterance.voice = voice;
      }
    }
    utterance.volume = this.volume;
    // utterance.pitch = 1;
    // utterance.rate = 1;
    this.synth.speak(utterance);
  }

  cancel(): void {
    this.synth.cancel();
  }
}
