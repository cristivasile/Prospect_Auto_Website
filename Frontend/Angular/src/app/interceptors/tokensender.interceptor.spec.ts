import { TestBed } from '@angular/core/testing';

import { TokensenderInterceptor } from './tokensender.interceptor';

describe('TokensenderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokensenderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokensenderInterceptor = TestBed.inject(TokensenderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
