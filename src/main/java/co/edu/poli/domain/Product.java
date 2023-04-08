package co.edu.poli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name_product", length = 50, nullable = false)
    private String nameProduct;

    @NotNull
    @Size(max = 255)
    @Column(name = "description_product", length = 255, nullable = false)
    private String descriptionProduct;

    @NotNull
    @Size(max = 50)
    @Column(name = "product_price", length = 50, nullable = false)
    private String productPrice;

    @NotNull
    @Size(max = 100)
    @Column(name = "product_aumount", length = 100, nullable = false)
    private String productAumount;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "products", "customer" }, allowSetters = true)
    private Sale sale;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameProduct() {
        return this.nameProduct;
    }

    public Product nameProduct(String nameProduct) {
        this.setNameProduct(nameProduct);
        return this;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public String getDescriptionProduct() {
        return this.descriptionProduct;
    }

    public Product descriptionProduct(String descriptionProduct) {
        this.setDescriptionProduct(descriptionProduct);
        return this;
    }

    public void setDescriptionProduct(String descriptionProduct) {
        this.descriptionProduct = descriptionProduct;
    }

    public String getProductPrice() {
        return this.productPrice;
    }

    public Product productPrice(String productPrice) {
        this.setProductPrice(productPrice);
        return this;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductAumount() {
        return this.productAumount;
    }

    public Product productAumount(String productAumount) {
        this.setProductAumount(productAumount);
        return this;
    }

    public void setProductAumount(String productAumount) {
        this.productAumount = productAumount;
    }

    public Sale getSale() {
        return this.sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public Product sale(Sale sale) {
        this.setSale(sale);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", nameProduct='" + getNameProduct() + "'" +
            ", descriptionProduct='" + getDescriptionProduct() + "'" +
            ", productPrice='" + getProductPrice() + "'" +
            ", productAumount='" + getProductAumount() + "'" +
            "}";
    }
}
