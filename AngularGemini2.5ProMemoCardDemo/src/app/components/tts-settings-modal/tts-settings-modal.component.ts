import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TtsService } from '../../services/tts.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common'; // 引入 CommonModule 或個別指令/管道
import { FormsModule } from '@angular/forms'; // 引入 FormsModule for ngModel

@Component({
  selector: 'app-tts-settings-modal',
  standalone: true, // <--- 設為 standalone
  imports: [
    CommonModule, // 或 NgIf, NgForOf, NumberPipe
    FormsModule
  ], // <--- 引入依賴
  templateUrl: './tts-settings-modal.component.html',
  styleUrls: ['./tts-settings-modal.component.css']
})
export class TtsSettingsModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  voices: SpeechSynthesisVoice[] = [];
  selectedVoiceURI: string | null = null;
  volume: number = 1;

  constructor(public ttsService: TtsService) { }

  ngOnInit(): void {
    this.voices = this.ttsService.getVoices();
    this.selectedVoiceURI = this.ttsService.getSelectedVoiceURI();
    this.volume = this.ttsService.getVolume();

    if (this.voices.length === 0 && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
            this.voices = this.ttsService.getVoices();
            if (!this.selectedVoiceURI && this.voices.length > 0) {
                const defaultVoice = this.voices.find(v => v.lang.startsWith('en') || v.lang.startsWith('zh')) || this.voices[0];
                if (defaultVoice) {
                  this.selectedVoiceURI = defaultVoice.voiceURI;
                  // 如果初始時 selectedVoiceURI 為 null，第一次載入聲音後，主動設定一次
                  if (this.ttsService.getSelectedVoiceURI() === null) {
                      this.ttsService.setVoice(this.selectedVoiceURI);
                  }
                }
            }
        };
    }
  }

  // onVoiceChange 已由 [(ngModel)] 和 (ngModelChange) 在模板中處理
  // onVolumeChange 已由 [(ngModel)] 和 (ngModelChange) 在模板中處理

  testVoice(): void {
    this.ttsService.speak("你好，這是一個語音測試。");
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
