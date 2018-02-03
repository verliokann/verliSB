package ru.verlioka.qps.core.services.concrete.secure.db.users;

import ru.verlioka.qps.core.dao.concrete.secure.users.IUserDao;
import ru.verlioka.qps.core.dao.generic.IGenericDao;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.services.generic.db.GenericServiceImpl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("fsesUserService")
public class UserServiceImpl extends GenericServiceImpl<EntityUser, Integer>
                             implements IUserService{

	private IUserDao userDao;
    
	public UserServiceImpl(){
 
    }
    
    @Autowired    
    public UserServiceImpl(@Qualifier("fsesUserDaoImpl") IGenericDao<EntityUser, Integer> genericDao){
    	 super(genericDao);
         this.userDao = (IUserDao) genericDao;
    }
    
    //сервис, запрашивающий информацию о пользователе по его логину
    public EntityUser getUser(String login){
    	return userDao.getUser(login);
    };
    
    public Set<EntityRole> getRoles(String login){
    	return userDao.getRoles(login);
    };
}
