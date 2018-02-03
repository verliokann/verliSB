<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    
	    <link href="resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
	    <link href="resources/app_loader/css/apploader.css" rel="stylesheet" type="text/css"  media="screen">
	           
		
		<script src="resources/js/jquery-3.2.1.js"></script>		
		<script src="resources/js/bootstrap.min.js"></script> 

<title></title>
</head>
<body>   
    <div class="navbar navbar-default navbar-static-top">
      <div class="container">
         <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><span>${login}, добро пожаловать в систему [наименование системы] </span></a>
         </div>
        
         <div class="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>                
                     <c:if test="${pageContext.request.userPrincipal.name != null}">
		                  	<c:url value="/logout" var="logoutUrl" />			                 
			                     <a href="${logoutUrl}"> Выход </a>			                 
                        </c:if>      
            </li>
          </ul>
        </div>
             
      </div>
    </div>
    
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p></p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section text-center">
      <div class="container">
        <div class="row">
        
        
                     
     <!-- Блок 1 (начало)
      В этом блоке настраиваются точки входа в одностраничные приложения в зависимости от ролей, которыми обладает авторизованный пользователь-->	  
     
       <c:forEach var="role" items="${rolelist}">        
         
        <%--  <c:if test="${role == 'ROLE_EXPERT'}">               
          <div class="col-md-<fmt:formatNumber type="number" maxFractionDigits="0" value="${12/ncol}" />">
          <a class="btn btn-primary">Открыть<br></a>
            <h3 class="text-center">РМ "Эксперт"</h3>
            <p>Подготовка справочников по ФГОС 3+, создание, ввод первичной информации
              по направлению (профилям/программам) обучения, подготовка списка дисциплин,
              подготовка матрицы компетенций&nbsp;с указанием дисциплинарных частей
              <br>
              <br>Генерация образовательной программы</p>
          </div>
          </c:if> --%>
          
          <%-- <c:if test="${role == 'ROLE_METHODIST'}">           
          <div class="col-md-<fmt:formatNumber type="number" maxFractionDigits="0" value="${12/ncol}" />">
           <a class="btn btn-primary">Открыть<br></a>
            <h3 class="text-center">РМ "Методист"</h3>
            <p>Работа со списком дисциплин и списком сотрудников кафедры,&nbsp;</p>
          </div>
          </c:if> --%>
          
        <%--   <c:if test="${role == 'ROLE_TEACHER'}">          
          <div class="col-md-<fmt:formatNumber type="number" maxFractionDigits="0" value="${12/ncol}" />">
            <a class="btn btn-primary">Открыть</a>
            <h3 class="text-center">РМ "Преподаватель"</h3>
            <p>Подготовка сведений о занятиях, фонде оценочных средств и материально-техническом
              обеспечении дисциплины</p>
          </div>
          </c:if> --%>
          
          <c:if test="${role == 'ROLE_ADMIN'}">          
          <div class="col-md-<fmt:formatNumber type="number" maxFractionDigits="0" value="${12/ncol}" />">
          <a class="btn btn-primary" href="/cmf/app_admin">Открыть</a>
            <h3 class="text-center">РМ "Администратор"</h3>
            <p>Управление учетными записями пользователей</p>
          </div>
          
          <div class="col-md-<fmt:formatNumber type="number" maxFractionDigits="0" value="${12/ncol}" />">
          <a class="btn btn-primary" href="/cmf/map">Открыть</a>
            <h3 class="text-center">"Яндекс карты"</h3>
            <p>Записная книжка</p>
          </div>          
          </c:if>
        
        </c:forEach>
       <!-- Блок 1 (конец)  -->	 
                 
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="container">
        <div class="row fixheight">
          <div class="col-md-12">
            <p></p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="navbar navbar-default navbar-fixed-bottom navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><span>Кафедра "ВСТ" ИРИТ , &nbsp;НГТУ &nbsp;Н. Новгород &nbsp;2016&nbsp;</span></a>
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