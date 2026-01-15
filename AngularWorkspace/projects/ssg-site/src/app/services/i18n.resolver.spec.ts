import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { i18nResolver } from './i18n.resolver';

describe('i18nResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => i18nResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
