package ru.verlioka.qps.core.services.generic.db;

import java.util.List;

public interface IGenericService<E, K> {
    E add(E entity);    // было void 2307017
    E modify(E entity); // было void 2307017
    void remove(K id);  // было void 2307017
    //void removeE(E entity);
    E find(K id);
    <E> List<E> getAll() ;
    List getEntityStructure(); //возвращаем список прикладных полей сущности
}


