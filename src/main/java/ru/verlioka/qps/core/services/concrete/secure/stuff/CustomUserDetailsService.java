package ru.verlioka.qps.core.services.concrete.secure.stuff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.verlioka.qps.core.dao.concrete.secure.users.IUserDao;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service("сustomUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private IUserDao userDao;

    //Реализуем метод, определенный в интерфейсе UserDetailsService
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        EntityUser domainUser = userDao.getUser(login);
        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        return new User(
                domainUser.getLogin(),
                domainUser.getPassword(),
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                getAuthorities(login)
        );
    }

    public List<GrantedAuthority> getAuthorities(String login) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        Set<EntityRole> authList = userDao.getRoles(login);

        for (EntityRole r : authList) {
            authorities.add(new SimpleGrantedAuthority(r.getRolename()));
        }

        return authorities;
    }
}