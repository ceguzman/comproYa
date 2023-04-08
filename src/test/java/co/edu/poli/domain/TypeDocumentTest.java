package co.edu.poli.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.poli.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TypeDocumentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeDocument.class);
        TypeDocument typeDocument1 = new TypeDocument();
        typeDocument1.setId(1L);
        TypeDocument typeDocument2 = new TypeDocument();
        typeDocument2.setId(typeDocument1.getId());
        assertThat(typeDocument1).isEqualTo(typeDocument2);
        typeDocument2.setId(2L);
        assertThat(typeDocument1).isNotEqualTo(typeDocument2);
        typeDocument1.setId(null);
        assertThat(typeDocument1).isNotEqualTo(typeDocument2);
    }
}
