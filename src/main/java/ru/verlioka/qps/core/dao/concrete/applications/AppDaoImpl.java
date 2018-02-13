package ru.verlioka.qps.core.dao.concrete.applications;

import org.springframework.stereotype.Repository;
import ru.verlioka.qps.core.dao.generic.GenericDaoImpl;
import ru.verlioka.qps.core.models.db.security.EntityApp;


@Repository("appDaoImpl")
public class AppDaoImpl extends GenericDaoImpl<EntityApp, Integer> implements IAppDao {

}