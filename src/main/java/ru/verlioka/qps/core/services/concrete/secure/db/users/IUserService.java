package ru.verlioka.qps.core.services.concrete.secure.db.users;

import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.services.generic.db.IGenericService;

import java.util.Set;

public interface IUserService extends IGenericService<EntityUser, Integer> {
    EntityUser getUser(String login);
    Set<EntityRole> getRoles(String login);
}