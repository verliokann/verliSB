# verliSB
SpringBoot Рефакторинг
#### Порядок развертывания

1. создать ответвление репозитория (Fork) 
2. клонировать на локальную машину (любой клиент для git) 
3. импортировать maven проект в IDE 
   для eclipse:
	* становить плагин m2e отсюда 
          http://download.eclipse.org/technology/m2e/releases/
	* File -> Import -> Maven -> Existing Maven project 
	* добавить папку куда  склонировали проект и выбрать из нее pom.xml	
4. создать БД в postgresql
   Настройки доступа к БД в файле src/main/webapp/WEB-INF/spring/root-context.xml
	 БД postgresql
	 имя     verlistudy_db
	 логин   postgres
	 пароль  0000
 
5. выполнить sql скрипт, который находится в дереве проекта (\sql_script\yandexmapsamplr\rc_verlioka_YMAP_15072017..sql)  
6. запустить проект на tomcat

 ----------------------------------------------------------------------------
Для авторизации используйте
 	логин    пароль
 	admin    admin 
----------------------------------------------------------------------------
