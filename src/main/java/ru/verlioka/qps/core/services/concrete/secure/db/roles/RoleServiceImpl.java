package ru.verlioka.qps.core.services.concrete.secure.db.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import ru.verlioka.qps.core.dao.concrete.secure.roles.IRoleDao;
import ru.verlioka.qps.core.dao.generic.IGenericDao;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.services.generic.db.GenericServiceImpl;

@Service("roleService")
public class RoleServiceImpl extends GenericServiceImpl<EntityRole, Integer> implements IRoleService {

    private IRoleDao roleDao;

    public RoleServiceImpl() {

    }

    @Autowired
    public RoleServiceImpl(@Qualifier("roleDaoImpl") IGenericDao<EntityRole, Integer> genericDao) {
        super(genericDao);
        this.roleDao = (IRoleDao) genericDao;
    }
}
