package co.edu.poli.repository;

import co.edu.poli.domain.TypeDocument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TypeDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeDocumentRepository extends JpaRepository<TypeDocument, Long> {}
