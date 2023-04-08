package co.edu.poli.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "document_number", length = 255, nullable = false)
    private String documentNumber;

    @NotNull
    @Size(max = 50)
    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @NotNull
    @Size(max = 50)
    @Column(name = "first_surname", length = 50, nullable = false)
    private String firstSurname;

    @Size(max = 50)
    @Column(name = "second_name", length = 50)
    private String secondName;

    @Size(max = 50)
    @Column(name = "second_surname", length = 50)
    private String secondSurname;

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties(value = { "products", "customer" }, allowSetters = true)
    private Set<Sale> sales = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "customers" }, allowSetters = true)
    private TypeDocument typeDocument;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Customer id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentNumber() {
        return this.documentNumber;
    }

    public Customer documentNumber(String documentNumber) {
        this.setDocumentNumber(documentNumber);
        return this;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Customer firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstSurname() {
        return this.firstSurname;
    }

    public Customer firstSurname(String firstSurname) {
        this.setFirstSurname(firstSurname);
        return this;
    }

    public void setFirstSurname(String firstSurname) {
        this.firstSurname = firstSurname;
    }

    public String getSecondName() {
        return this.secondName;
    }

    public Customer secondName(String secondName) {
        this.setSecondName(secondName);
        return this;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getSecondSurname() {
        return this.secondSurname;
    }

    public Customer secondSurname(String secondSurname) {
        this.setSecondSurname(secondSurname);
        return this;
    }

    public void setSecondSurname(String secondSurname) {
        this.secondSurname = secondSurname;
    }

    public Set<Sale> getSales() {
        return this.sales;
    }

    public void setSales(Set<Sale> sales) {
        if (this.sales != null) {
            this.sales.forEach(i -> i.setCustomer(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setCustomer(this));
        }
        this.sales = sales;
    }

    public Customer sales(Set<Sale> sales) {
        this.setSales(sales);
        return this;
    }

    public Customer addSales(Sale sale) {
        this.sales.add(sale);
        sale.setCustomer(this);
        return this;
    }

    public Customer removeSales(Sale sale) {
        this.sales.remove(sale);
        sale.setCustomer(null);
        return this;
    }

    public TypeDocument getTypeDocument() {
        return this.typeDocument;
    }

    public void setTypeDocument(TypeDocument typeDocument) {
        this.typeDocument = typeDocument;
    }

    public Customer typeDocument(TypeDocument typeDocument) {
        this.setTypeDocument(typeDocument);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", documentNumber='" + getDocumentNumber() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", firstSurname='" + getFirstSurname() + "'" +
            ", secondName='" + getSecondName() + "'" +
            ", secondSurname='" + getSecondSurname() + "'" +
            "}";
    }
}
