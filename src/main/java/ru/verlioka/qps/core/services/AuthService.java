package ru.verlioka.qps.core.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import ru.verlioka.qps.core.models.rest.Token;
import ru.verlioka.qps.core.models.rest.User;

public class AuthService {

    public static Authentication getAuthentication(String login, String password, AuthenticationManager authenticationManager) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(login, password);
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException exp) {

        }
        return authentication;
    }

    public static Authentication getAuthenticationByToken(Token token, AuthenticationManager authenticationManager) {
        User user = TokenService.parseToken(token.getToken());
        return getAuthentication(user.getLogin(), user.getPassword(), authenticationManager);
    }
}
