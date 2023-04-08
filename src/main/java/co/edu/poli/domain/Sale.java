package co.edu.poli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Sale.
 */
@Entity
@Table(name = "sale")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 10)
    @Column(name = "code_product", length = 10, nullable = false, unique = true)
    private String codeProduct;

    @NotNull
    @Size(max = 255)
    @Column(name = "name_product", length = 255, nullable = false, unique = true)
    private String nameProduct;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "sale")
    @JsonIgnoreProperties(value = { "sale" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "sales", "typeDocument" }, allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeProduct() {
        return this.codeProduct;
    }

    public Sale codeProduct(String codeProduct) {
        this.setCodeProduct(codeProduct);
        return this;
    }

    public void setCodeProduct(String codeProduct) {
        this.codeProduct = codeProduct;
    }

    public String getNameProduct() {
        return this.nameProduct;
    }

    public Sale nameProduct(String nameProduct) {
        this.setNameProduct(nameProduct);
        return this;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Sale date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setSale(null));
        }
        if (products != null) {
            products.forEach(i -> i.setSale(this));
        }
        this.products = products;
    }

    public Sale products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Sale addProducts(Product product) {
        this.products.add(product);
        product.setSale(this);
        return this;
    }

    public Sale removeProducts(Product product) {
        this.products.remove(product);
        product.setSale(null);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Sale customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sale)) {
            return false;
        }
        return id != null && id.equals(((Sale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sale{" +
            "id=" + getId() +
            ", codeProduct='" + getCodeProduct() + "'" +
            ", nameProduct='" + getNameProduct() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
