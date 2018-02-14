package ru.verlioka.qps.core.dao.concrete.secure.users;

import ru.verlioka.qps.core.dao.generic.IGenericDao;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;

import java.util.Set;

public interface IUserDao extends IGenericDao<EntityUser, Integer> {
    EntityUser getUser(String login);
    Set<EntityRole> getRoles(String login);
}
