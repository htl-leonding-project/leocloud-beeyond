package at.htl.beeyond.bean;

import at.htl.beeyond.entity.Template;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@ApplicationScoped
class TemplateBean {
    @Transactional
    void init(@Observes StartupEvent event) throws IOException {
        var filesIn = getClass().getResourceAsStream("/templates/file-list.txt");
        if (filesIn != null) {
            var files = new BufferedReader(new InputStreamReader(filesIn)).lines().toList();
            for (String filename : files) {
                try (InputStream in = getClass()
                        .getResourceAsStream("/templates/json/" + filename)) {
                    assert in != null;

                    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                    var jsonString = reader.lines().collect(Collectors.joining("\n"));
                    var newTemplate = new ObjectMapper().readValue(jsonString, Template.class);

                    InputStream contentIn = getClass()
                            .getResourceAsStream("/templates/yml/" + newTemplate.getContent());
                    assert contentIn != null;
                    BufferedReader contentReader = new BufferedReader(new InputStreamReader(contentIn));
                    newTemplate.setContent(
                            contentReader.lines().collect(Collectors.joining("\n"))
                    );
                    contentIn.close();
                    newTemplate.getFields().forEach(fieldName -> fieldName.setTemplate(newTemplate));
                    newTemplate.persist();
                }
            }
        }
    }
}

