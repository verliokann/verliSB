package ru.verlioka.qps.core.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
@EnableTransactionManagement 
public class AppStarter {		
	
	// -------- Вызов основных одностраничных приложений --------------------------------------
	// Вызов админки
	@RequestMapping(value = "/app_admin", method = RequestMethod.GET)
	public ModelAndView app_admin() {		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("rad/app_admin");		
		return mv;
	}
	
	// Вызов приложения работы с Яндекс-картами
	@RequestMapping(value = "/map", method = RequestMethod.GET)
    public String map() {
        return "rad/map";
    }
	
	// -------- Вызов основных одностраничных приложений (конец) --------------------------------------	
}