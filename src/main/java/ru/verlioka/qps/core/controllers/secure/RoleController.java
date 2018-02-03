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
import org.springframework.web.bind.annotation.ResponseStatus;

import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.services.concrete.secure.db.roles.IRoleService;

//  Все методы реализованы в паре:
//    - метод, принимающий значения через строку вызова (@PathVariable) формальный параметр Model model идет последний
//    - метод, принимающий значения через параметры (@RequestParam) формальный параметр Model model идет первым
//
@Controller
@EnableTransactionManagement   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
public class RoleController {
	
	@Autowired
	private IRoleService rs;
	
	
	@RequestMapping(value="/role/{id}", method=RequestMethod.GET)
	public @ResponseBody EntityRole getRole(@PathVariable int id) {
		EntityRole r = rs.find(id);
		return r;
	}
	
	@RequestMapping(value="/role", method=RequestMethod.GET)	
	public @ResponseBody <EntityRole> List <EntityRole> getRoles() {
		List<EntityRole> rlist = rs.getAll(); 
		return rlist;
	}
	
	@RequestMapping(value="/role/{id}", method=RequestMethod.PUT, consumes="application/json", produces = "application/json")	
	public @ResponseBody EntityRole updateRole(@RequestBody EntityRole r) {
		return rs.modify(r);		 
	}
	
	@RequestMapping(value="/role", method=RequestMethod.POST, consumes="application/json", produces = "application/json")	
	public @ResponseBody EntityRole addRole(@RequestBody EntityRole r) {		
		return rs.add(r);	
	}
	
	@RequestMapping( value="/role/{id}", method=RequestMethod.DELETE)	
	public @ResponseBody String removeRole(@PathVariable int id) {
		rs.remove(id);
		return "OK";
	}		
}