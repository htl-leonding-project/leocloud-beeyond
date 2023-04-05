package at.htl.beeyond.bean

import at.htl.beeyond.entity.Template
import com.fasterxml.jackson.databind.ObjectMapper
import io.quarkus.runtime.StartupEvent
import javax.enterprise.context.ApplicationScoped
import javax.enterprise.event.Observes
import javax.transaction.Transactional

@ApplicationScoped
class TemplateBean {
    @Transactional
    fun init(@Observes event: StartupEvent) {
        val filesIn = javaClass.getResourceAsStream("/templates/file-list.txt")
        filesIn?.let { stream ->
            val files = stream.bufferedReader().use { it.readLines() }
            files.forEach { filename ->
                javaClass.getResourceAsStream("/templates/json/$filename")?.let { jsonStream ->
                    val jsonString = jsonStream.bufferedReader().use { it.readText() }
                    val newTemplate = ObjectMapper().readValue(jsonString, Template::class.java)
                    javaClass.getResourceAsStream("/templates/yml/${newTemplate.content}")?.let { contentStream ->
                        val content = contentStream.bufferedReader().use { it.readText() }
                        newTemplate.content = content
                        contentStream.close()
                        newTemplate.fields.forEach { field ->
                            field.template = newTemplate
                        }
                    }
                    javaClass.getResourceAsStream("/templates/svg/${newTemplate.img}")?.let { contentStream ->
                        val content = contentStream.bufferedReader().use { it.readText() }
                        newTemplate.img = content
                        contentStream.close()
                    }
                    newTemplate.persist()
                    jsonStream.close()
                }
            }
            stream.close()
        }
    }
}
