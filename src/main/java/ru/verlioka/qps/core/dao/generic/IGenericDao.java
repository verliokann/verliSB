package ru.verlioka.qps.core.dao.generic;

import java.util.List;

// Интерфейс обобщенных базовых операций
// E - класс сущности
// K - тип параметра, определяющего идентификатор объекта (записи в БД)

public interface IGenericDao<E,K> {
	
	//Работа с данными
    public E insert(E entity);    
    public E update(E entity);      // было void 23072017 
    public void delete(E entity);    
    public E find(K key);
    public <E> List<E> getAll();
    
    //Работа с метаданными сущности
    public List getEntityStructure(); //возвращаем список прикладных полей сущности
}