package ru.verlioka.qps.core.dao.concrete.secure.groups;

import org.springframework.stereotype.Repository;
import ru.verlioka.qps.core.dao.generic.GenericDaoImpl;
import ru.verlioka.qps.core.models.db.security.EntityGroup;


@Repository("userGroupsDaoImpl")
public class GroupDaoImpl extends GenericDaoImpl<EntityGroup, Integer> implements IGroupDao {

}
