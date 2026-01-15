import { inject, Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "lib/feature";

@Pipe({
  name: 'localize',
  standalone: true,
  pure: false
})
export class LocalizeRoutePipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(path: string | string[]): any[] {
    // ✅ 改成使用 Service 裡面的 DEFAULT_LANG
    const currentLang = this.translateService.currentLang$.value || this.translateService.DEFAULT_LANG;

    const pathSegments = Array.isArray(path) ? path : [path];
    const cleanSegments = pathSegments.map(segment =>
      segment.startsWith('/') ? segment.substring(1) : segment
    ).filter(s => s !== '');

    return ['/', currentLang, ...cleanSegments];
  }
}
