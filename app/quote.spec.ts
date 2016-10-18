import { QuoteService } from './quote.service';
import { QuoteComponent } from './quote.component';

import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';

class MockQuoteService {
  public quote: string = 'Test quote';

  getQuote() {
    return Promise.resolve(this.quote);
  }
}

describe('Testing Quote Component', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      QuoteComponent
      ],
      providers: [
      { provide: QuoteService, useClass: MockQuoteService }
      ]
    });

  });

  it('Should get quote', async(inject([], () => {

    let fixture = TestBed.createComponent(QuoteComponent);
    fixture.detectChanges();
    fixture.componentInstance.getQuote();
    fixture.whenStable()
    .then(() => {
      fixture.detectChanges();
      return fixture.whenStable();
    })
    .then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div').innerText).toEqual('Test quote');
    });
  })));
});