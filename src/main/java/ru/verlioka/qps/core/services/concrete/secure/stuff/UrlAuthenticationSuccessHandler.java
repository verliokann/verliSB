package ru.verlioka.qps.core.services.concrete.secure.stuff;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

// Класс-обработчик перенаправлений на web-страницы при успешной авторизации
@Service("authHandler")
public class UrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler{
	protected Log logger = LogFactory.getLog(this.getClass());
	 
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
 
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
      HttpServletResponse response, Authentication authentication) throws IOException {
        handle(request, response, authentication);
        clearAuthenticationAttributes(request);
    }
 
    protected void handle(HttpServletRequest request, 
      HttpServletResponse response, Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(authentication);
 
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
 
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }
 
    /** Builds the target URL according to the logic defined in the main class Javadoc. */    
    protected String determineTargetUrl(Authentication authentication) {
        boolean isUser = false;
        boolean isAdmin = false;                
        String role = new String();
        
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        
        
        for (GrantedAuthority grantedAuthority : authorities) {
        	//Для преподавателя и эксперта открывается одна страница, у эксперта на странице существуют дополнительные ссылки на страницы подготовки и согласования ОП
        	//Для администраторов открывается своя страница с возможностью управления пользователями (в первой версии)
        	role = grantedAuthority.getAuthority();	        	
            /*if ( (role.equals("ROLE_TEACHER")) || (role.equals("ROLE_EXPERT")) ) {
                isUser = true;
                break;
            } else if (role.equals("ROLE_ADMIN")) {
                isAdmin = true;
                break;
            }*/
        	
        	if (role.equals("ROLE_ADMIN")) {
                isAdmin = true;
                break;
        	} else { 
        		isUser = true;        		
                break;
        	}	
        }
 
              
        if (isUser) {
        	System.out.println(" *********** Препод или эксперт***************** ");
            return "/";
        } else if (isAdmin) {
        	System.out.println(" *********** Админ***************** ");
            return "/";
        } else {
            throw new IllegalStateException();
        }
    }
 
    protected void clearAuthenticationAttributes(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
 
    public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }
    protected RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }
}
