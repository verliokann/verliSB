package ru.verlioka.qps.core.dao.generic;

import java.util.List;

// Интерфейс обобщенных базовых операций
// E - класс сущности
// K - тип параметра, определяющего идентификатор объекта (записи в БД)

public interface IGenericDao<E, K> {

    //Работа с данными
    E insert(E entity);
    E update(E entity);      // было void 23072017
    void delete(E entity);
    E find(K key);
    <E> List<E> getAll();

    //Работа с метаданными сущности
    List getEntityStructure(); //возвращаем список прикладных полей сущности
}