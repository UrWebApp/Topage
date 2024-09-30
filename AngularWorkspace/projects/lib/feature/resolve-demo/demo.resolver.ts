import type { ResolveFn } from '@angular/router';

export const DemoResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
