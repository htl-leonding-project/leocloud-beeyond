package at.htl.beeyond.dto

import at.htl.beeyond.entity.Template
import java.util.*
import javax.json.bind.annotation.JsonbTransient
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class TemplateDto(
    @set:JsonbTransient var id: Long? = null,
    @field:NotNull @field:Size(min = 1, max = 255) var name: String? = null,
    @field:Size(max = 255) var description: String? = null,
    @field:NotBlank var content: String? = null,
    @field:Valid var fields: List<TemplateFieldDto> = LinkedList(),
) {
    constructor(template: Template) : this(
        template.id,
        template.name,
        template.description,
        template.content,
        template.fields.map { TemplateFieldDto(it) }.toList(),
    )

    override fun toString(): String {
        return ""
    }
}

