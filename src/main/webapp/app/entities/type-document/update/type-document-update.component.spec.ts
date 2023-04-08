import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TypeDocumentFormService } from './type-document-form.service';
import { TypeDocumentService } from '../service/type-document.service';
import { ITypeDocument } from '../type-document.model';

import { TypeDocumentUpdateComponent } from './type-document-update.component';

describe('TypeDocument Management Update Component', () => {
  let comp: TypeDocumentUpdateComponent;
  let fixture: ComponentFixture<TypeDocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeDocumentFormService: TypeDocumentFormService;
  let typeDocumentService: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TypeDocumentUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TypeDocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeDocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeDocumentFormService = TestBed.inject(TypeDocumentFormService);
    typeDocumentService = TestBed.inject(TypeDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typeDocument: ITypeDocument = { id: 456 };

      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      expect(comp.typeDocument).toEqual(typeDocument);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocument').mockReturnValue(typeDocument);
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(typeDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocument').mockReturnValue({ id: null });
      jest.spyOn(typeDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocument).toHaveBeenCalled();
      expect(typeDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 123 };
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
