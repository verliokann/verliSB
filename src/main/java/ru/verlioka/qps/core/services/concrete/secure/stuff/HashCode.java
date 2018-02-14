package ru.verlioka.qps.core.services.concrete.secure.stuff;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service("hashCode")
public class HashCode implements IHashCode {

    public String getHashPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        System.out.println(hashedPassword);
        return hashedPassword;
    }

}