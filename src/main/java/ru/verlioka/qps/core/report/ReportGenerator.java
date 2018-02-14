package ru.verlioka.qps.core.report;

import com.haulmont.yarg.formatters.factory.DefaultFormatterFactory;
import com.haulmont.yarg.loaders.factory.DefaultLoaderFactory;
import com.haulmont.yarg.loaders.impl.GroovyDataLoader;
import com.haulmont.yarg.reporting.ReportOutputDocument;
import com.haulmont.yarg.reporting.Reporting;
import com.haulmont.yarg.reporting.RunParams;
import com.haulmont.yarg.structure.Report;
import com.haulmont.yarg.structure.ReportBand;
import com.haulmont.yarg.structure.ReportOutputType;
import com.haulmont.yarg.structure.impl.BandBuilder;
import com.haulmont.yarg.structure.impl.ReportBuilder;
import com.haulmont.yarg.structure.impl.ReportTemplateBuilder;
import com.haulmont.yarg.util.groovy.DefaultScriptingImpl;
import org.springframework.core.io.ClassPathResource;
import ru.verlioka.qps.core.models.db.security.EntityGroup;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;

import java.io.IOException;
import java.util.List;

public class ReportGenerator {

    private static final String REPORT_TEMPLATE_NAME = "template.docx";
    private static final String REPORT_TEMPLATE_PATH = "/Reports/" + REPORT_TEMPLATE_NAME;

    public byte[] generate(List<EntityGroup> groups) throws IOException {
        ReportBuilder reportBuilder = new ReportBuilder();
        ClassPathResource file = new ClassPathResource(REPORT_TEMPLATE_PATH);
        ReportTemplateBuilder reportTemplateBuilder = new ReportTemplateBuilder()
                .documentPath(file.getFile().getAbsolutePath()).documentName(REPORT_TEMPLATE_NAME)
                .outputType(ReportOutputType.docx).readFileFromPath();
        reportBuilder.template(reportTemplateBuilder.build());

        StringBuilder query = new StringBuilder();
        query.append("return [\n");
        for (EntityGroup group : groups) {
            StringBuilder users = new StringBuilder();
            if (!group.getUsers().isEmpty()) {
                for (EntityUser user : group.getUsers()) {
                    users.append(user.getLogin());
                    users.append(", ");
                }
            } else users.append("Нет пользователей, ");


            users.replace(users.length() - 2, users.length(), "");

            StringBuilder roles = new StringBuilder();
            for (EntityRole role : group.getRoles()) {
                if (!role.getRolename().trim().equals("")) {
                    roles.append(role.getRolename());
                    roles.append(", ");
                }
            }


            roles.replace(roles.length() - 2, roles.length(), "");

            query.append("['group':'");
            query.append(group.getName());
            query.append("', 'users':'");
            query.append(users.toString());
            query.append("', 'roles':'");
            query.append(roles);
            query.append("'],\n");
        }
        query.replace(query.length() - 2, query.length() - 1, "");
        query.append("]");

        BandBuilder bandBuilder = new BandBuilder();
        ReportBand band = bandBuilder.name("Groups").query("Groups", query.toString(), "groovy").build();
        reportBuilder.band(band);

        Report report = reportBuilder.build();

        Reporting reporting = new Reporting();
        reporting.setFormatterFactory(new DefaultFormatterFactory());
        reporting.setLoaderFactory(
                new DefaultLoaderFactory().setGroovyDataLoader(new GroovyDataLoader(new DefaultScriptingImpl())));

        ReportOutputDocument reportOutput = reporting.runReport(new RunParams(report));
        return reportOutput.getContent();
    }
}