package ru.verlioka.qps.core.models.rest;

public class AppConfig {

    private String name;
    private String description;
    private String navigation;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getNavigation() {
        return navigation;
    }

    public AppConfig(String name, String description, String navigation) {
        this.name = name;
        this.description = description;
        this.navigation = navigation;
    }
}
