package ru.verlioka.qps.core.controllers.secure;

import java.util.List;
import java.util.Set;

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

import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.services.concrete.secure.db.users.IUserService;
import ru.verlioka.qps.core.services.concrete.secure.stuff.HashCode;
import ru.verlioka.qps.core.services.concrete.secure.stuff.IHashCode;



//  Все методы реализованы в паре:
//    - метод, принимающий значения через строку вызова (@PathVariable) формальный параметр Model model идет последний
//    - метод, принимающий значения через параметры (@RequestParam) формальный параметр Model model идет первым
//
@Controller
@EnableTransactionManagement   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

public class UserController {
	
	@Autowired
	private IUserService fusi;
	
	//запрос информации о пользователе
	//http://localhost:8080/qps/FsesUser/userbylogin/user1
	@RequestMapping(value = "/getuserbylogin/{login}", method = RequestMethod.GET)
	@ResponseBody
	public String getuserbylogin(@PathVariable String login)  {
		EntityUser e = fusi.getUser(login); 
		return e.getLogin()+" "+e.getPassword();
	}
	
	//запрос информации о пользователе
	//http://localhost:8080/qps/FsesUser/userbyloginjson/admin
	@RequestMapping(value = "/getuserbyloginjson/{login}", method = RequestMethod.GET)
	@ResponseBody
	public EntityUser getuserbyloginjson(@PathVariable String login)  {
		EntityUser e = fusi.getUser(login); 
		return e;
	}

	//запрос информации о ролях пользователя
	//http://localhost:8080/qps/FsesUser/rolesbylogin/user1
	@RequestMapping(value = "/rolesbylogin/{login}", method = RequestMethod.GET)
	@ResponseBody
	public String rolesbylogin(@PathVariable String login)  {
		Set<EntityRole> e = fusi.getRoles(login);
		String s="";
		for( EntityRole r:e ) s = s+r.getRolename(); 
		return s;
	}

    // ------------------------------------------------------------------------------------------------- 
	//                                  Методы для REST клиента
	//--------------------------------------------------------------------------------------------------
	
	//запрос информации о пользователе  
	//http://localhost:8080/qps/FsesUser/user
	@RequestMapping(value = "/user", method = RequestMethod.GET)
	@ResponseBody
	public <EntityUser> List <EntityUser> getUsersjson()  {
		List<EntityUser> ulist = fusi.getAll(); 
		return ulist;
	}
	
	// Запрос информации о пользователе по идентификатору
	// Строка вызова http://localhost:8080/qps/FsesUser/users/{id}
    // Пример вызова http://localhost:8080/qps/FsesUser/users/1
	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)	 
	public @ResponseBody EntityUser findUserjson(@PathVariable int id) {	  	  
	   EntityUser u = fusi.find(id);	   
	  return u;
	}	 	
	 
	@RequestMapping(value="/user", method=RequestMethod.POST, consumes="application/json")
	public @ResponseBody EntityUser addUser(@RequestBody EntityUser u) {
		IHashCode hc = new HashCode();
		u.setPassword(hc.getHashPassword(u.getPassword()));
		return fusi.add(u);	
	}		
	
	@RequestMapping(value="/user/{id}", method=RequestMethod.PUT, consumes="application/json")
	public @ResponseBody EntityUser updateUser(@RequestBody EntityUser r) {
		    EntityUser u = fusi.find(r.getId());	
		    if (!u.getPassword().equals(r.getPassword())){ 
		    	IHashCode hc = new HashCode();
		    	r.setPassword(hc.getHashPassword(r.getPassword()));	
		    }
		    
		    return fusi.modify(r);		
	}
	
	@RequestMapping( value="/user/{id}", method=RequestMethod.DELETE)	
	public @ResponseBody String removeUser(@PathVariable int id) {
		fusi.remove(id);
		return "OK";
	}
}