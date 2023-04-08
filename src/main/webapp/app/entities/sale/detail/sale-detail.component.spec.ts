import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaleDetailComponent } from './sale-detail.component';

describe('Sale Management Detail Component', () => {
  let comp: SaleDetailComponent;
  let fixture: ComponentFixture<SaleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sale: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SaleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SaleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sale on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sale).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
