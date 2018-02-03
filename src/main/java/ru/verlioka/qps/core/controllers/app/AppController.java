package ru.verlioka.qps.core.controllers.app;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import ru.verlioka.qps.core.models.db.security.EntityApp;
import ru.verlioka.qps.core.services.concrete.secure.db.apps.IAppService;


@Controller
@EnableTransactionManagement   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
public class AppController {
	
	@Autowired
	private IAppService as;
	
	
	@RequestMapping(value="/app/{id}", method=RequestMethod.GET)
	public @ResponseBody EntityApp getApp(@PathVariable int id) {
		EntityApp r = as.find(id);
		return r;
	}
	
	@RequestMapping(value="/app", method=RequestMethod.GET)	
	public @ResponseBody <EntityApp> List <EntityApp> getApps() {
		List<EntityApp> alist = as.getAll(); 
		return alist;
	}
	
	@RequestMapping(value="/app/{id}", method=RequestMethod.PUT, consumes="application/json", produces = "application/json")	
	public @ResponseBody EntityApp updateApp(@RequestBody EntityApp r) {
		return as.modify(r);		 
	}
	
	@RequestMapping(value="/app", method=RequestMethod.POST, consumes="application/json", produces = "application/json")	
	public @ResponseBody EntityApp addApp(@RequestBody EntityApp r) {		
		return as.add(r);	
	}
	
	@RequestMapping( value="/app/{id}", method=RequestMethod.DELETE)	
	public @ResponseBody String removeApp(@PathVariable int id) {
		as.remove(id);
		return "OK";
	}		
}