import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TypeDocumentService } from '../service/type-document.service';

import { TypeDocumentComponent } from './type-document.component';

describe('TypeDocument Management Component', () => {
  let comp: TypeDocumentComponent;
  let fixture: ComponentFixture<TypeDocumentComponent>;
  let service: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'type-document', component: TypeDocumentComponent }]), HttpClientTestingModule],
      declarations: [TypeDocumentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(TypeDocumentComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeDocumentComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TypeDocumentService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.typeDocuments?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to typeDocumentService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTypeDocumentIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTypeDocumentIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
