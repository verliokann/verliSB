package ru.verlioka.qps.core.system;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class ContextUpdater {
    public static void Refresh() {
        ApplicationContext ctx = new FileSystemXmlApplicationContext();
        ((ConfigurableApplicationContext) ctx).refresh();
    }

    public static String getconfig(String beanconfigname) {
        String s = "";
        ApplicationContext ctx = new FileSystemXmlApplicationContext(beanconfigname);

        return s;
    }

}

