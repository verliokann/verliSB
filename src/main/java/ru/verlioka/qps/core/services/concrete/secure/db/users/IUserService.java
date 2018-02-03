package ru.verlioka.qps.core.services.concrete.secure.db.users;

import java.util.Set;

import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.services.generic.db.IGenericService;

public interface IUserService extends IGenericService<EntityUser,Integer>{
	public EntityUser getUser(String login);
	public Set<EntityRole> getRoles(String login);
}