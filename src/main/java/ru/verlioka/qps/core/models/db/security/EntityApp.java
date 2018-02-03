package ru.verlioka.qps.core.models.db.security;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="apps")
public class EntityApp {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;	
	private String name;
	private String description;
	private String path;

	
	public EntityApp() {
		super();
	}

	public EntityApp(String name, String description, String path) {
		super();
		this.name = name;
		this.description = description;
		this.path = path;
	}
	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
}
