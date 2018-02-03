package ru.verlioka.qps.core.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.models.rest.User;

public class TokenService {
	private static final String secretCode = "ae4fc3aa-783c-11e7-b5a5-be2e44b06b34";
	 
	 public static String generateToken(EntityUser u) {
	        Claims claims = Jwts.claims();
	        claims.put("login", u.getLogin());
	        claims.put("password", u.getPassword());

	        return Jwts.builder()
	                .setClaims(claims)
	                .signWith(SignatureAlgorithm.HS512, secretCode)
	                .compact();
	    }
	 
	 public static User parseToken(String token) {
	        try {
	            Claims body = Jwts.parser()
	                    .setSigningKey(secretCode)
	                    .parseClaimsJws(token)
	                    .getBody();

	            User u = new User();
	            u.setLogin((String) body.get("login"));
	            u.setPassword((String) body.get("password"));

	            return u;

	        } catch (JwtException e) {
	            return null;
	        } catch (ClassCastException e) {
	        	return null;
	        }
	    }
}
