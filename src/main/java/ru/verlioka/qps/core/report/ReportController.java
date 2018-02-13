package ru.verlioka.qps.core.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.verlioka.qps.core.models.db.security.EntityGroup;
import ru.verlioka.qps.core.services.concrete.secure.db.groups.IGroupService;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@EnableTransactionManagement
public class ReportController {

    private static final String REPORT_FILE_NAME = "report";
    private static final String REPORT_TYPE = ".docx";

    @Autowired
    private IGroupService groupService;

    @RequestMapping(value = "/report", method = RequestMethod.GET, produces = "application/docx")
    public ResponseEntity<byte[]> generateReport() throws IOException {
        List<EntityGroup> groups = groupService.getAll();
        ReportGenerator generator = new ReportGenerator();
        byte[] content = generator.generate(groups);

        SimpleDateFormat format = new SimpleDateFormat("_dd-MM-yyyy_HH-mm");
        String filename = REPORT_FILE_NAME + format.format(new Date()) + REPORT_TYPE;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/docx"));
        headers.set("Content-Disposition", "attachment; filename=" + filename);
        headers.setContentLength(content.length);

        return new ResponseEntity<byte[]>(content, headers, HttpStatus.OK);
    }
}