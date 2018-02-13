package ru.verlioka.qps.core.services.concrete.secure.db.apps;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import ru.verlioka.qps.core.dao.concrete.applications.IAppDao;
import ru.verlioka.qps.core.dao.generic.IGenericDao;
import ru.verlioka.qps.core.models.db.security.EntityApp;
import ru.verlioka.qps.core.services.generic.db.GenericServiceImpl;

@Service("appService")
public class AppServiceImpl extends GenericServiceImpl<EntityApp, Integer> implements IAppService {

    private IAppDao appDao;

    public AppServiceImpl() {

    }

    @Autowired
    public AppServiceImpl(@Qualifier("appDaoImpl") IGenericDao<EntityApp, Integer> genericDao) {
        super(genericDao);
        this.appDao = (IAppDao) genericDao;
    }
}
