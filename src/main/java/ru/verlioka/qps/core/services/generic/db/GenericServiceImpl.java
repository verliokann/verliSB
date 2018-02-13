package ru.verlioka.qps.core.services.generic.db;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ru.verlioka.qps.core.dao.generic.IGenericDao;

import java.util.List;

@Service
public abstract class GenericServiceImpl<E, K> implements IGenericService<E, K> {

    private IGenericDao<E, K> genericDao;

    public GenericServiceImpl(IGenericDao<E, K> genericDao) {
        this.genericDao = genericDao;
    }

    public GenericServiceImpl() {
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public E add(E entity) {
        genericDao.insert(entity);
        return entity;

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public E modify(E entity) {
        genericDao.update(entity);
        return entity;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void remove(K id) {
        genericDao.delete(genericDao.find(id));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public E find(K id) {
        return genericDao.find(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public <E> List<E> getAll() {
        return genericDao.getAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List getEntityStructure() {
        genericDao.getEntityStructure();
        return null;
    }
}
