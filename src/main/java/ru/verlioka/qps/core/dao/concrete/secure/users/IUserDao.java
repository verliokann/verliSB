package ru.verlioka.qps.core.dao.concrete.secure.users;

import java.util.Set;

import ru.verlioka.qps.core.dao.generic.IGenericDao;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;

public interface IUserDao extends IGenericDao<EntityUser, Integer>{
	public EntityUser getUser(String login);
	public Set<EntityRole> getRoles(String login);
}
