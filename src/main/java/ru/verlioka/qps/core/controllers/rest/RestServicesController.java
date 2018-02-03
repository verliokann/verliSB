package ru.verlioka.qps.core.controllers.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

import ru.verlioka.qps.core.models.db.security.EntityApp;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.models.rest.Token;
import ru.verlioka.qps.core.services.AuthService;
import ru.verlioka.qps.core.services.TokenService;
import ru.verlioka.qps.core.services.concrete.secure.db.apps.IAppService;

@Controller
@EnableTransactionManagement 
public class RestServicesController {
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authenticationManager;

	@Autowired
	private IAppService as;
	
	public RestServicesController() {

	}

	public RestServicesController(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public void authenticate(@RequestBody EntityUser user, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		new AuthService();
		Authentication authentication = AuthService.getAuthentication(user.getLogin(), user.getPassword(),
				authenticationManager);
		if (authentication != null) {
			response.setHeader("Access-Control-Allow-Origin", "*");
			if (authentication.isAuthenticated()) {
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				response.setStatus(HttpServletResponse.SC_OK);
				// response.setHeader("token", generateToken(user));
				ObjectMapper mapper = new ObjectMapper();
				String responseJson = mapper.writeValueAsString(new Token(TokenService.generateToken(user)));
				response.getWriter().write(responseJson);
			}
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}

	@RequestMapping(value = "/dashboard", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public void dashboardConfig(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Authentication authentication = AuthService.getAuthenticationByToken(new Token(request.getHeader("token")),
				authenticationManager);
		if (authentication != null) {
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_OK);
			ObjectMapper mapper = new ObjectMapper();
			List<EntityApp> config = new ArrayList<>();
			config.add(new EntityApp("РМ\"Администратор\"", "Управление учетными записями пользователей",
					"dashboard/admin"));
			config.add(new EntityApp("Яндекс карты", "Записная книжка", "dashboard/maps"));
			config.add(new EntityApp("Загрузчик приложений", "Загрузка новых приложений", "dashboard/addApps"));
			String responseJson = mapper.writeValueAsString(config);
			response.getWriter().write(responseJson);
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}
	
	@RequestMapping(value = "/newapp", method = RequestMethod.PUT, produces = "application/json")
	public void addNewApp(@RequestBody EntityApp app, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Authentication authentication = AuthService.getAuthenticationByToken(new Token(request.getHeader("token")),
				authenticationManager);
		response.setHeader("Access-Control-Allow-Origin", "*");
		if (authentication != null) {
			System.out.println(app);
			as.add(app);
			//make DB magic
		    System.out.println(app);
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}

}
