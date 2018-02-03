<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    
	    <link href="resources/css/reset.css" rel="stylesheet" media="screen"> 
	    <link href="resources/css/bootstrap.min.css" rel="stylesheet" media="screen">	    
	    <link href="resources/app_admin/style/css/bootstrap_skin.css" rel="stylesheet" media="screen">
	    
	    <link href="resources/app_loader/css/apploader.css" rel="stylesheet" type="text/css"  media="screen">	    
	    <link href="resources/app_admin/style/css/main.css" rel="stylesheet" type="text/css"  media="screen">
	    <link href="resources/app_admin/style/css/admin_main.css" rel="stylesheet" type="text/css"  media="screen"> 	    		
        

		<script src="resources/js/jquery-3.2.1.js"></script>		
		<script src="resources/js/bootstrap.min.js"></script>	
		<script src="resources/app_admin/js/ui/ui.js"></script>
		<script src="resources/app_admin/configs/namespace.js"></script>
			
		<!-- Подключаем require для организации асинхронной загрузки клиентских js скриптов -->	
		<script data-main="<c:url value="/resources/app_admin/configs/config"/>" src="<c:url value="/resources/js/require.js"/>"> </script>

<title>Админка</title>
</head>
<body>
      
                                    
                             <!-- ************************************** Модальные окна (начало) ********************************************* -->
<div id="modalforms"></div>  


<!-- Модальное  окно удаления записи/записей  -->
                                   <!-- Запрещаем закрытие окна при клике на сером фоне! -->                             
<div id="deleteform" class="modal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div id="roledeleteform" class="modal-content">
    <!-- Заголовок модального окна
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Удаление записей </h4>
      </div>
      Основное содержимое модального окна
      <div class="modal-body">
        <div class="form-group">
			<label class="control-label" for="inputDefault">Удалить пользователя (роль/группу)</label>		
		</div>		
      Футер модального окна
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"
        		onclick="ZUI.modalToFront('firstlevelfade', 'editform');">Удалить</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" 
                onclick="ZUI.modalToFront('firstlevelfade', 'editform');">Отменить</button>        
      </div>
    </div>-->
  </div> 
  <div id="groupdeleteform" class="modal-content unvisibleblock">
  
  </div>
  <div id="userdeleteform" class="modal-content unvisibleblock">
  
  </div>  
</div>	
</div>
                      
<!-- Модальное  окно-справочник  -->
                                <!-- Запрещаем закрытие окна при клике на сером фоне! -->
<div id="sprform" class="modal" data-backdrop="static" data-keyboard="false"> 
    <div class="modal-dialog">
     
    </div>	
</div>

                         							 
<!-- Модальное  окно ввода информации  -->
                                          <!-- Запрещаем закрытие окна при клике на сером фоне! -->                               
<div id="editform" class="modal fade" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">   
   <div id="roleedtform" class="modal-content"> 
      <!-- Заголовок модального окна -->
      <!-- <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Добавление нового ...</h4>
      </div> -->
      
      <!-- Основное содержимое модального окна -->
      
            <!-- Форма для ввода/редактирования информации о пользователях -->
            <!-- Расположен в шаблоне /resource/app_admin/templates/usereditform.tpl -->  	
      		
      		<!-- Форма для ввода/редактирования информации о группах пользователей --> 	
			<!-- Расположен в шаблоне /resource/app_admin/templates/groupeditform.tpl -->
			
			<!-- Форма для ввода/редактирования информации о ролях пользователей -->
			<!-- Расположен в шаблоне /resource/app_admin/templates/roleeditform.tpl -->
			
   <!--    </div> -->
      <!-- Футер модального окна -->
   <!--    <div class="modal-footer">
        <button type="button" id="addupdbtn" class="btn btn-default" data-dismiss="modal">Сохранить</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Отменить</button>             
      </div>-->
    </div>    
    <div id="groupedtform" class="modal-content unvisibleblock">
    </div>
    <div id="useredtform" class="modal-content unvisibleblock">
    </div>
  </div>
</div>							 

<!-- -------------------------------------------- Модальные окна (конец) -------------------------------------------- -->

<!-- -------------------------------------------- Верхняя панель инструментов (начало) ---------------------------------------------------------  -->

<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
				<span class="sr-only">Toggle navigation</span>				
			</button>					
		</div>
		
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">	
				
				<a class="navbar-brand">Справочники:</a>
											
				<form class="navbar-form navbar-left">
					<a href="#" id="rolemode" class="btn btn-default"
					            onclick="ZUI.refreshModal('roleedtform','useredtform','groupedtform'); ZUI.refreshModal('roledeleteform','userdeleteform','groupdeleteform');">Роли пользователей</a>					
					<a href="#" id="groupmode" class="btn btn-default" 
					            onclick="ZUI.refreshModal('groupedtform','roleedtform','useredtform'); ZUI.refreshModal('groupdeleteform','roledeleteform','userdeleteform')">Группы пользователей</a>
					<a href="#" id="usermode" class="btn btn-default" 
					            onclick="ZUI.refreshModal('useredtform', 'groupedtform', 'roleedtform'); ZUI.refreshModal('userdeleteform', 'groupdeleteform', 'roledeleteform')">Пользователи</a>
			    </form>
										
				<a class="navbar-brand">  Управление записями:</a>

				<form class="navbar-form navbar-left">
				<div id="cudcontrol" class="btn-group">
					<a id="newBtn" href="#editform" data-toggle="modal" class="btn btn-default">Добавить</a>
					<a id="edtBtn" href="#editform" data-toggle="modal" class="btn btn-default disabled">Изменить</a>
					<a id="delBtn" href="#deleteform" data-toggle="modal" class="btn btn-default disabled">Удалить</a>
				</div>								
				</form>
				
				
				<form class="navbar-form navbar-left">
				<div class="btn-group">
					<a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						Отчеты
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#">Список ролей</a></li>
						<li><a href="#">Список групп</a></li>						
						<li class="divider"></li>
						<li><a href="/cmf/report">Список пользователей</a></li>
						<li class="divider"></li>
						<li><a href="#">Список приложений</a></li>
					</ul>									
				</div>
				</form>
																				
				<form class="navbar-form navbar-right">
					<a href="/cmf/" class="btn btn-default">Мои приложения</a>					
					<c:if test="${pageContext.request.userPrincipal.name != null}">
		                  	<c:url value="/logout" var="logoutUrl" />		                  	     
								<a href="${logoutUrl}" class="btn btn-default">Выход</a>
					</c:if>			
			    </form>			
				
		</div>
	</div>
</nav>

<!-- ----------------------------------------- Верхняя панель инструментов (конец) ---------------------------------------------------------  -->
     

<!-- ----------------------------------------- Секция для фильтра и поиска по пользователями (начало) ---------------------------------------------------------  -->   
   <div class="section">
      <div id="userfilter">
             
	   </div>      
   </div>

<!-- ----------------------------------------- Секция для фильтра и поиска по пользователями (начало) ---------------------------------------------------------  -->

<!-- ----------------------------------------- Секция для сетки с пользователями (начало) ---------------------------------------------------------  -->   
    <div class="section">
      <div class="container">
        <div class="row">        
          <div id="mainGridPlace">
                            
                                         <!-- backbonegridjs -->
            
          </div>
        </div>
      </div>
    </div>
       
<!-- ----------------------------------------- Секция для сетки с пользователями (начало) ---------------------------------------------------------  -->
    
    <div class="navbar navbar-default navbar-fixed-bottom navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><span>Открытая система быстрого прототипирования "Верлиока", &nbsp; 2017&nbsp;</span></a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#">Контакты</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
 
    
</body>
</html>