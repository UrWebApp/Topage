import { Component, Input, Inject, PLATFORM_ID } from '@angular/core'; // ✅ 加入 Inject, PLATFORM_ID
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common'; // ✅ 加入 isPlatformBrowser

@Component({
  selector: 'lib-svg[src]',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {

  @Input() src: any;
  @Input() svgClass: any;
  @Input() width: any;
  @Input() height: any;
  @Input() boxStyle: any;
  svgContent: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ 注入 platformId
  ) {
  }

  ngOnInit(): void {
    this.setSvg();
  }

  setSvg() {
    // ✅ 關鍵修改：先檢查是否在瀏覽器環境
    if (isPlatformBrowser(this.platformId)) {
      this.httpClient.get(this.src, { responseType: 'text' }).subscribe(
        res => {
          // 這裡的程式碼只會在瀏覽器執行，所以 DOMParser 是安全的
          let parser = new DOMParser();
          let doc = parser.parseFromString(res, 'image/svg+xml');
          doc.documentElement.setAttribute('preserveAspectRatio', 'none');
          doc.documentElement.setAttribute('class', this.svgClass);
          doc.documentElement.setAttribute('width', this.width === undefined ? '100%' : this.width);
          doc.documentElement.setAttribute('height', this.height === undefined ? '100%' : this.height);
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(doc.documentElement.outerHTML);
        },
        error => {
          console.error(`Failed to load SVG: ${this.src}`, error);
        }
      );
    }
  }

  previousInputs: {
    svgClass: string;
    width: string;
    height: string;
    boxStyle: string;
    src: string;
  } | any = {};

  ngDoCheck() {
    if (
      this.svgClass !== this.previousInputs.svgClass ||
      this.width !== this.previousInputs.width ||
      this.height !== this.previousInputs.height ||
      this.boxStyle !== this.previousInputs.boxStyle ||
      this.src !== this.previousInputs.src
    ) {
      this.setSvg();
      this.previousInputs = {
        svgClass: this.svgClass,
        width: this.width,
        height: this.height,
        boxStyle: this.boxStyle,
        src: this.src
      };
    }
  }
}
