package ru.verlioka.qps.core.dao.generic;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.metamodel.Metamodel;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

@SuppressWarnings("unchecked")
@Repository
public abstract class GenericDaoImpl<E, K extends Serializable> implements IGenericDao<E, K> {

    //private static final Logger logger = Logger.getLogger(GenericDaoImpl.class);

    @PersistenceContext
    private EntityManager em;

    protected Class<? extends E> daoType;

    public GenericDaoImpl() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        daoType = (Class<? extends E>) pt.getActualTypeArguments()[0];
    }

    @Override
    public E insert(E entity) {
        System.out.println(daoType.getName());
        em.persist(entity);
        em.flush();
        System.out.println("^^^^^^^^^^^^^^^^^^" + entity);
        return entity;
    }

    @Override
    public E update(E entity) {
        return em.merge(entity);  // возвращал void 23072017
    }

    @Override
    public void delete(E entity) {
        em.remove(entity);
    }

    @Override
    public E find(K key) {
        return (E) em.find(daoType, key);
    }

    @Override
    public <E> List<E> getAll() {
        return em.createQuery("Select t from " + daoType.getSimpleName() + " t")
                .getResultList();
    }

    @Override
    public List getEntityStructure() {
        Metamodel mm = em.getMetamodel();

        //Set<Attribute<>> es = mm.entity(entity.getClass()).getDeclaredAttributes();


        //System.out.println("Атрибуты сущности: "+mm.entity(Class<? extends E>).toString());

        return null;
    }
}