package ru.verlioka.qps.core.services.generic.db;

import java.util.List;

public interface IGenericService<E, K> {   
    public E add(E entity);    // было void 2307017
    public E modify(E entity); // было void 2307017   
    public void remove(K id);  // было void 2307017  
    //public void removeE(E entity);
    public E find(K id);
    public <E> List<E> getAll() ;   
    public List getEntityStructure(); //возвращаем список прикладных полей сущности    
}


