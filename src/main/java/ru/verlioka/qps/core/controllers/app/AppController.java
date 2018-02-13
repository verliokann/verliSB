package ru.verlioka.qps.core.controllers.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;
import ru.verlioka.qps.core.models.db.security.EntityApp;
import ru.verlioka.qps.core.services.concrete.secure.db.apps.IAppService;

import java.util.List;


@Controller
@EnableTransactionManagement   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
public class AppController {

    @Autowired
    private IAppService as;

    @RequestMapping(value = "/app/{id}", method = RequestMethod.GET)
    @ResponseBody
    public EntityApp getApp(@PathVariable int id) {
        EntityApp r = as.find(id);
        return r;
    }

    @RequestMapping(value = "/app", method = RequestMethod.GET)
    @ResponseBody
    public <EntityApp> List<EntityApp> getApps() {
        List<EntityApp> alist = as.getAll();
        return alist;
    }

    @RequestMapping(value = "/app/{id}", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public EntityApp updateApp(@RequestBody EntityApp r) {
        return as.modify(r);
    }

    @RequestMapping(value = "/app", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public EntityApp addApp(@RequestBody EntityApp r) {
        return as.add(r);
    }

    @RequestMapping(value = "/app/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String removeApp(@PathVariable int id) {
        as.remove(id);
        return "OK";
    }
}