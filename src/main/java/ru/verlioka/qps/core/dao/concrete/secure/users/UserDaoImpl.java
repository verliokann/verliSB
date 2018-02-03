package ru.verlioka.qps.core.dao.concrete.secure.users;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import ru.verlioka.qps.core.dao.generic.GenericDaoImpl;
import ru.verlioka.qps.core.models.db.security.EntityRole;
import ru.verlioka.qps.core.models.db.security.EntityUser;
import ru.verlioka.qps.core.models.db.security.EntityGroup;

@Repository("fsesUserDaoImpl")
public class UserDaoImpl extends GenericDaoImpl<EntityUser, Integer> implements IUserDao {

	@PersistenceContext
	private EntityManager em;

	// ******************************************************************************************************************************
	// Получаем логин и пароль пользователя из БД (по логину)
	@Override
	public EntityUser getUser(String login) {

		Query query = em.createQuery("from EntityUser where login=:login");
		query.setParameter("login", login);
		List<EntityUser> userList = query.getResultList();

		if (userList.size() > 0) {
			for (EntityUser u : userList) {
				System.out.print("Имя пользователя :" + u.getLogin());
				System.out.println("\t Пароль пользователя :" + u.getPassword());
			}
			return userList.get(0);
		} else {
			System.out.print("Пользователь с таким логином не найден...");
			return null;
		}

	};

	// ******************************************************************************************************************************
	// Получаем писок ролей пользователя (по логину)
	public Set<EntityRole> getRoles(String login) {
		Query query = em.createQuery("select u from EntityUser u inner join u.groups r where u.login=:login");
		query.setParameter("login", login);
		List<EntityUser> userList = query.getResultList();
    
						

		if (userList.size() > 0) {
			Set<EntityGroup> groups = userList.get(0).getUserGroups();
			Set<EntityRole> roleList = new HashSet<EntityRole>();
			for (EntityGroup group : groups) {
				roleList.addAll(group.getRoles());
			}
			for (EntityRole r : roleList)
				System.out.print("Роль :" + r.getRolename());
			return roleList;
		} else {
			System.out.print("С указанным логином не связано ни одной роли...");
			return null;
		}
	};
}