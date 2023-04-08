package co.edu.poli.repository;

import co.edu.poli.domain.Sale;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Sale entity.
 */
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    default Optional<Sale> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Sale> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Sale> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct sale from Sale sale left join fetch sale.customer",
        countQuery = "select count(distinct sale) from Sale sale"
    )
    Page<Sale> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct sale from Sale sale left join fetch sale.customer")
    List<Sale> findAllWithToOneRelationships();

    @Query("select sale from Sale sale left join fetch sale.customer where sale.id =:id")
    Optional<Sale> findOneWithToOneRelationships(@Param("id") Long id);
}
