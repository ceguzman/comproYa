import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeDocumentDetailComponent } from './type-document-detail.component';

describe('TypeDocument Management Detail Component', () => {
  let comp: TypeDocumentDetailComponent;
  let fixture: ComponentFixture<TypeDocumentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDocumentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeDocument: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeDocumentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeDocumentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeDocument on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeDocument).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
