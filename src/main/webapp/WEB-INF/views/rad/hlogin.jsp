<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Авторизация</title>
						
        <link href="resources/css/bootstrap.min.css" rel="stylesheet" media="screen">		
		<script src="resources/js/jquery-3.2.1.js"></script>		
		<script src="resources/js/bootstrap.min.js"></script>

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		  <![endif]-->

<title></title>
</head>
<body>

<div class="container-fluid no-lr-paddings" >
		<header>
		    <!-- ################################## Общая строка (весь заголовок)################################-->
            <div class = "row">
				<div class = "col-md-5"></div>
				<div class = "col-md-5 dl-main">Авторизация</div>
			</div>
		</header>
    	
		<div class="central-part"> 
		    <div class="row">
		       <c:if test="${param.failed == true}"> 
                  <div>Неправильно введены имя пользователя или пароль. Попробуйте еще раз.</div>
               </c:if>
		    </div>
            <div class="row">  
				<div class="col-md-5 col-sm-5 header-block-sz no-lr-paddings"> </div>
				<div class="col-md-2 col-sm-2 header-block-sz no-lr-paddings"> 
					<form role="form" action="j_spring_security_check" method="post">
						<div class="form-group">
							<label class="sr-only" for="exampleInputEmail2">Email</label>
							<input name="j_username" class="form-control" placeholder="Имя пользователя">
						</div>
						<div class="form-group">
							<label class="sr-only" for="exampleInputPassword2">Пароль</label>
							<input name="j_password" type="password" class="form-control" placeholder="Пароль пользователя">
						</div>						
						<button class="btn btn-primary" name="submit" type="submit" value="submit">Войти</button>
												
					</form>
				</div>
				
				
			</div>
		</div	>		
	</div>

</body>
</html>