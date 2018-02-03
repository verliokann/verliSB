package ru.verlioka.qps.core.models.db.security;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "usergroups")

public class EntityGroup {	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;

	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "group_roles", joinColumns = {
			@JoinColumn(name = "group_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "role_id", referencedColumnName = "id") })	
	private Set<EntityRole> roles = new HashSet<EntityRole>();
		
	public Set<EntityRole> getRoles() {
		return roles;		
	}
	
	public void setRoles(Set<EntityRole> roles) {
		this.roles = roles;
	}
	
	/*@JsonBackReference //избегаем бесконечного цикла при формировании json, он возникает из-за взаимных ссылок объектов entity друг на друга
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "group_users", joinColumns = {
			@JoinColumn(name = "group_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "user_id", referencedColumnName = "id") })*/
	@JsonBackReference //избегаем бесконечного цикла при формировании json, он возникает из-за взаимных ссылок объектов entity друг на друга
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "groups")
	private Set<EntityUser> users = new HashSet<EntityUser>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<EntityUser> getUsers() {
		return users;
	}

	public void setUsers(Set<EntityUser> users) {
		this.users = users;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());		
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EntityGroup other = (EntityGroup) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (roles == null) {
			if (other.roles != null)
				return false;
		} else if (!roles.equals(other.roles))
			return false;
		if (users == null) {
			if (other.users != null)
				return false;
		} else if (!users.equals(other.users))
			return false;
		return true;
	}

}