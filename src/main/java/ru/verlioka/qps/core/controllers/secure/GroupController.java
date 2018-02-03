package ru.verlioka.qps.core.controllers.secure;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ru.verlioka.qps.core.models.db.security.EntityGroup;
import ru.verlioka.qps.core.services.concrete.secure.db.groups.IGroupService;

//  Все методы реализованы в паре:
//    - метод, принимающий значения через строку вызова (@PathVariable) формальный параметр Model model идет последний
//    - метод, принимающий значения через параметры (@RequestParam) формальный параметр Model model идет первым
//
@Controller
@EnableTransactionManagement   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
public class GroupController {
	
	@Autowired
	private IGroupService ugs;
	
	
	@RequestMapping(value="/usergroup/{id}", method=RequestMethod.GET)
	public @ResponseBody EntityGroup getUserGroup(@PathVariable int id) {
		EntityGroup ug = ugs.find(id);
		return ug;
	}
	
	@RequestMapping(value="/usergroup", method=RequestMethod.GET)	
	public @ResponseBody <EntityUserGroups> List <EntityUserGroups> getUserGroups() {
		List<EntityUserGroups> uglist = ugs.getAll(); 
		return uglist;
	}
	
	@RequestMapping(value="/usergroup/{id}", method=RequestMethod.PUT, consumes="application/json")
	public @ResponseBody EntityGroup updateUserGroup(@RequestBody EntityGroup ug) {
		return ugs.modify(ug);		
	}
	
	@RequestMapping(value="/usergroup", method=RequestMethod.POST, consumes="application/json")
	public @ResponseBody EntityGroup addUserGroup(@RequestBody EntityGroup ug) {		
		return ugs.add(ug);		
	}
	
	@RequestMapping( value="/usergroup/{id}", method=RequestMethod.DELETE)	
	public @ResponseBody String removeUserGroup(@PathVariable int id) {
		ugs.remove(id);
		return "OK";
	}	
	
}