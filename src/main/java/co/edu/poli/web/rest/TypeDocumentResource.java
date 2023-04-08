package co.edu.poli.web.rest;

import co.edu.poli.domain.TypeDocument;
import co.edu.poli.repository.TypeDocumentRepository;
import co.edu.poli.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link co.edu.poli.domain.TypeDocument}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeDocumentResource {

    private final Logger log = LoggerFactory.getLogger(TypeDocumentResource.class);

    private static final String ENTITY_NAME = "typeDocument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeDocumentRepository typeDocumentRepository;

    public TypeDocumentResource(TypeDocumentRepository typeDocumentRepository) {
        this.typeDocumentRepository = typeDocumentRepository;
    }

    /**
     * {@code POST  /type-documents} : Create a new typeDocument.
     *
     * @param typeDocument the typeDocument to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeDocument, or with status {@code 400 (Bad Request)} if the typeDocument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-documents")
    public ResponseEntity<TypeDocument> createTypeDocument(@Valid @RequestBody TypeDocument typeDocument) throws URISyntaxException {
        log.debug("REST request to save TypeDocument : {}", typeDocument);
        if (typeDocument.getId() != null) {
            throw new BadRequestAlertException("A new typeDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeDocument result = typeDocumentRepository.save(typeDocument);
        return ResponseEntity
            .created(new URI("/api/type-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-documents/:id} : Updates an existing typeDocument.
     *
     * @param id the id of the typeDocument to save.
     * @param typeDocument the typeDocument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeDocument,
     * or with status {@code 400 (Bad Request)} if the typeDocument is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeDocument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-documents/{id}")
    public ResponseEntity<TypeDocument> updateTypeDocument(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TypeDocument typeDocument
    ) throws URISyntaxException {
        log.debug("REST request to update TypeDocument : {}, {}", id, typeDocument);
        if (typeDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeDocument.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeDocumentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TypeDocument result = typeDocumentRepository.save(typeDocument);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, typeDocument.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /type-documents/:id} : Partial updates given fields of an existing typeDocument, field will ignore if it is null
     *
     * @param id the id of the typeDocument to save.
     * @param typeDocument the typeDocument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeDocument,
     * or with status {@code 400 (Bad Request)} if the typeDocument is not valid,
     * or with status {@code 404 (Not Found)} if the typeDocument is not found,
     * or with status {@code 500 (Internal Server Error)} if the typeDocument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/type-documents/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TypeDocument> partialUpdateTypeDocument(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TypeDocument typeDocument
    ) throws URISyntaxException {
        log.debug("REST request to partial update TypeDocument partially : {}, {}", id, typeDocument);
        if (typeDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, typeDocument.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!typeDocumentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TypeDocument> result = typeDocumentRepository
            .findById(typeDocument.getId())
            .map(existingTypeDocument -> {
                if (typeDocument.getInitials() != null) {
                    existingTypeDocument.setInitials(typeDocument.getInitials());
                }
                if (typeDocument.getDocumentName() != null) {
                    existingTypeDocument.setDocumentName(typeDocument.getDocumentName());
                }
                if (typeDocument.getStateTypeDocument() != null) {
                    existingTypeDocument.setStateTypeDocument(typeDocument.getStateTypeDocument());
                }

                return existingTypeDocument;
            })
            .map(typeDocumentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, typeDocument.getId().toString())
        );
    }

    /**
     * {@code GET  /type-documents} : get all the typeDocuments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeDocuments in body.
     */
    @GetMapping("/type-documents")
    public List<TypeDocument> getAllTypeDocuments() {
        log.debug("REST request to get all TypeDocuments");
        return typeDocumentRepository.findAll();
    }

    /**
     * {@code GET  /type-documents/:id} : get the "id" typeDocument.
     *
     * @param id the id of the typeDocument to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeDocument, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-documents/{id}")
    public ResponseEntity<TypeDocument> getTypeDocument(@PathVariable Long id) {
        log.debug("REST request to get TypeDocument : {}", id);
        Optional<TypeDocument> typeDocument = typeDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeDocument);
    }

    /**
     * {@code DELETE  /type-documents/:id} : delete the "id" typeDocument.
     *
     * @param id the id of the typeDocument to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-documents/{id}")
    public ResponseEntity<Void> deleteTypeDocument(@PathVariable Long id) {
        log.debug("REST request to delete TypeDocument : {}", id);
        typeDocumentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
