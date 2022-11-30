package at.htl.beeyond.resource

import at.htl.beeyond.dto.TemplateDto
import at.htl.beeyond.entity.Template
import javax.transaction.Transactional
import javax.ws.rs.*
import javax.ws.rs.core.*

@Path("/template")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
class TemplateResource {

    @GET
    @Transactional
    fun getAllTemplates(): Response {
        return Response.ok(Template.streamAll<Template>().map { TemplateDto(it) }.toList()).build()
    }

    @GET
    @Path("/{id}")
    @Transactional
    fun getTemplateById(@PathParam("id") id: Long?): Response {
        val template = Template.findById<Template>(id)
            ?: return Response.status(Response.Status.NOT_FOUND).build()

        val templateDto = TemplateDto(template)
        return Response.ok(templateDto).build()
    }
}