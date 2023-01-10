package at.htl.beeyond.entity;

import at.htl.beeyond.dto.TemplateDto;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Template extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Lob
    private String content;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    private List<TemplateField> fields = new LinkedList<>();

    public Template(TemplateDto templateDto) {
        this.name = templateDto.getName();
        this.description = templateDto.getDescription();
        this.content = templateDto.getContent();

        this.fields = templateDto.getFields()
                .stream()
                .map(templateFieldDto -> new TemplateField(
                        templateFieldDto.getLabel(),
                        templateFieldDto.getWildcard(),
                        templateFieldDto.getDescription(),
                        templateFieldDto.getValue(),
                        templateFieldDto.getPlaceholder(), this)
                )
                .collect(Collectors.toList());
    }

    public Template() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<TemplateField> getFields() {
        return fields;
    }

    public void setFields(List<TemplateField> fields) {
        this.fields = fields;
    }
}

