package at.htl.beeyond.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
public class TemplateField extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;

    private String wildcard;

    private String description;

    private String value;

    private String placeholder;

    @ManyToOne
    private Template template;

    public TemplateField(String label, String wildcard, String description, String value, String placeholder, Template template) {
        this.label = label;
        this.wildcard = wildcard;
        this.description = description;
        this.value = value;
        this.placeholder = placeholder;
        this.template = template;
    }

    public TemplateField() {
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getWildcard() {
        return wildcard;
    }

    public void setWildcard(String wildcard) {
        this.wildcard = wildcard;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Template getTemplate() {
        return template;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }


    public void setTemplate(Template template) {
        this.template = template;
    }

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }
}
