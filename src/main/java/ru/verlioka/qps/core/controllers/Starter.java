package ru.verlioka.qps.core.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;

@Controller
@EnableTransactionManagement
public class Starter {

    private static final Logger logger = LoggerFactory.getLogger(Starter.class);

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String start(Model model, Locale locale) {

        logger.info("Welcome home! The client locale is {}.", locale);

        //Вызывается после прохождения авторизации, поэтому информацию о пользователе считываем из контекста Spring Security

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        List<String> rolelist = new ArrayList<String>();
        for (GrantedAuthority grantedAuthority : authorities) {
            rolelist.add(grantedAuthority.getAuthority());
        }

        for (String role : rolelist) {
            System.out.println(role + " ");
        }
        // в jsp передать объект! (оптимизировать)
        model.addAttribute("login", SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("rolelist", rolelist);
        model.addAttribute("ncol", rolelist.size()); //количество доступных РМ для авторизованного пользователя

        return "rad/apploader";
    }

    //Обработка пользовательской формы аутентификации (для Spring Security)
    //@RequestMapping(value = "/login" должен совпадать с url в настройке пользовательской формы в security.xml
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        ModelAndView model = new ModelAndView();
        model.setViewName("rad/hlogin");
        return model;
    }

    //Завершение сеанса (logout)
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout";
    }
}
