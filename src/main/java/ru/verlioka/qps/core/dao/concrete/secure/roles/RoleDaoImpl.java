package ru.verlioka.qps.core.dao.concrete.secure.roles;

import org.springframework.stereotype.Repository;
import ru.verlioka.qps.core.dao.generic.GenericDaoImpl;
import ru.verlioka.qps.core.models.db.security.EntityRole;


@Repository("roleDaoImpl")
public class RoleDaoImpl extends GenericDaoImpl<EntityRole, Integer>
								implements IRoleDao{

}