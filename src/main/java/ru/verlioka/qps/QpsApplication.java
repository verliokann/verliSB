package ru.verlioka.qps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource(locations={
		"classpath:root-context.xml",
		"classpath:security.xml"		
	     })
public class QpsApplication {
	public static void main(String[] args) {
		SpringApplication.run(QpsApplication.class, args);
	}
}
