package co.edu.poli.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.poli.IntegrationTest;
import co.edu.poli.domain.TypeDocument;
import co.edu.poli.domain.enumeration.State;
import co.edu.poli.repository.TypeDocumentRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TypeDocumentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TypeDocumentResourceIT {

    private static final String DEFAULT_INITIALS = "AAAAAAAAAA";
    private static final String UPDATED_INITIALS = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_TYPE_DOCUMENT = State.ACTIVE;
    private static final State UPDATED_STATE_TYPE_DOCUMENT = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/type-documents";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TypeDocumentRepository typeDocumentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeDocumentMockMvc;

    private TypeDocument typeDocument;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeDocument createEntity(EntityManager em) {
        TypeDocument typeDocument = new TypeDocument()
            .initials(DEFAULT_INITIALS)
            .documentName(DEFAULT_DOCUMENT_NAME)
            .stateTypeDocument(DEFAULT_STATE_TYPE_DOCUMENT);
        return typeDocument;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeDocument createUpdatedEntity(EntityManager em) {
        TypeDocument typeDocument = new TypeDocument()
            .initials(UPDATED_INITIALS)
            .documentName(UPDATED_DOCUMENT_NAME)
            .stateTypeDocument(UPDATED_STATE_TYPE_DOCUMENT);
        return typeDocument;
    }

    @BeforeEach
    public void initTest() {
        typeDocument = createEntity(em);
    }

    @Test
    @Transactional
    void createTypeDocument() throws Exception {
        int databaseSizeBeforeCreate = typeDocumentRepository.findAll().size();
        // Create the TypeDocument
        restTypeDocumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isCreated());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getInitials()).isEqualTo(DEFAULT_INITIALS);
        assertThat(testTypeDocument.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
        assertThat(testTypeDocument.getStateTypeDocument()).isEqualTo(DEFAULT_STATE_TYPE_DOCUMENT);
    }

    @Test
    @Transactional
    void createTypeDocumentWithExistingId() throws Exception {
        // Create the TypeDocument with an existing ID
        typeDocument.setId(1L);

        int databaseSizeBeforeCreate = typeDocumentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeDocumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkInitialsIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeDocumentRepository.findAll().size();
        // set the field null
        typeDocument.setInitials(null);

        // Create the TypeDocument, which fails.

        restTypeDocumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDocumentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeDocumentRepository.findAll().size();
        // set the field null
        typeDocument.setDocumentName(null);

        // Create the TypeDocument, which fails.

        restTypeDocumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStateTypeDocumentIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeDocumentRepository.findAll().size();
        // set the field null
        typeDocument.setStateTypeDocument(null);

        // Create the TypeDocument, which fails.

        restTypeDocumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTypeDocuments() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        // Get all the typeDocumentList
        restTypeDocumentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].initials").value(hasItem(DEFAULT_INITIALS)))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME)))
            .andExpect(jsonPath("$.[*].stateTypeDocument").value(hasItem(DEFAULT_STATE_TYPE_DOCUMENT.toString())));
    }

    @Test
    @Transactional
    void getTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        // Get the typeDocument
        restTypeDocumentMockMvc
            .perform(get(ENTITY_API_URL_ID, typeDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeDocument.getId().intValue()))
            .andExpect(jsonPath("$.initials").value(DEFAULT_INITIALS))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME))
            .andExpect(jsonPath("$.stateTypeDocument").value(DEFAULT_STATE_TYPE_DOCUMENT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTypeDocument() throws Exception {
        // Get the typeDocument
        restTypeDocumentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();

        // Update the typeDocument
        TypeDocument updatedTypeDocument = typeDocumentRepository.findById(typeDocument.getId()).get();
        // Disconnect from session so that the updates on updatedTypeDocument are not directly saved in db
        em.detach(updatedTypeDocument);
        updatedTypeDocument.initials(UPDATED_INITIALS).documentName(UPDATED_DOCUMENT_NAME).stateTypeDocument(UPDATED_STATE_TYPE_DOCUMENT);

        restTypeDocumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTypeDocument.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTypeDocument))
            )
            .andExpect(status().isOk());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getInitials()).isEqualTo(UPDATED_INITIALS);
        assertThat(testTypeDocument.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testTypeDocument.getStateTypeDocument()).isEqualTo(UPDATED_STATE_TYPE_DOCUMENT);
    }

    @Test
    @Transactional
    void putNonExistingTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, typeDocument.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(typeDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTypeDocumentWithPatch() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();

        // Update the typeDocument using partial update
        TypeDocument partialUpdatedTypeDocument = new TypeDocument();
        partialUpdatedTypeDocument.setId(typeDocument.getId());

        partialUpdatedTypeDocument
            .initials(UPDATED_INITIALS)
            .documentName(UPDATED_DOCUMENT_NAME)
            .stateTypeDocument(UPDATED_STATE_TYPE_DOCUMENT);

        restTypeDocumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeDocument.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeDocument))
            )
            .andExpect(status().isOk());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getInitials()).isEqualTo(UPDATED_INITIALS);
        assertThat(testTypeDocument.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testTypeDocument.getStateTypeDocument()).isEqualTo(UPDATED_STATE_TYPE_DOCUMENT);
    }

    @Test
    @Transactional
    void fullUpdateTypeDocumentWithPatch() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();

        // Update the typeDocument using partial update
        TypeDocument partialUpdatedTypeDocument = new TypeDocument();
        partialUpdatedTypeDocument.setId(typeDocument.getId());

        partialUpdatedTypeDocument
            .initials(UPDATED_INITIALS)
            .documentName(UPDATED_DOCUMENT_NAME)
            .stateTypeDocument(UPDATED_STATE_TYPE_DOCUMENT);

        restTypeDocumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTypeDocument.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTypeDocument))
            )
            .andExpect(status().isOk());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getInitials()).isEqualTo(UPDATED_INITIALS);
        assertThat(testTypeDocument.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testTypeDocument.getStateTypeDocument()).isEqualTo(UPDATED_STATE_TYPE_DOCUMENT);
    }

    @Test
    @Transactional
    void patchNonExistingTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, typeDocument.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(typeDocument))
            )
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();
        typeDocument.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(typeDocument))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeDelete = typeDocumentRepository.findAll().size();

        // Delete the typeDocument
        restTypeDocumentMockMvc
            .perform(delete(ENTITY_API_URL_ID, typeDocument.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
