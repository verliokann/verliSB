/**
 * http://usejsdoc.org/
 */

define(['role', 'roles', 'group', 'groups',
	    'rolepaggrid', 
	    'grouppaggrid', 
	    'userpaggrid', 
	    'groupeditform', 
	    'usereditform', 
	    'roleeditform',
	    'roledeleteform',
	    'groupdeleteform',
	    'userdeleteform'], 
        function(Role, Roles, Group, Groups, RolePagGrid, GroupPagGrid, UserPagGrid, GroupEditForm, UserEditForm, RoleEditForm, RoleDeleteForm, GroupDeleteForm, UserDeleteform){
	
			
	//  ****************************  ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ********************************************	
	
		
	//Создаем модели и коллекции для работы с данными
	app.roles = new App.Collections.Roles();       //создаем коллекцию справочных данных
	app.groups = new App.Collections.Groups();     //создаем коллекцию справочных данных
	app.users = new App.Collections.Users();       //создаем коллекцию справочных данных
	
	app.groups.fetch();
	app.users.fetch();
	
	//инициируем сетку с информацией по ролям
	app.casheedtrecords = new App.Collections.Roles();  //создаем коллекцию данных для редактирования (попадают выделенные в сетке данные)	
	
	app.block = false;                        
	app.datastate = 'data';	
	app.cc = new App.Views.CUDControl();
		
	app.mpg = new App.Views.RolePagGrid({collection: app.roles, parentpaggrid: '#mainGridPlace'});	
	
	
					
	// *************************************** НЕКОТОРЫЕ ОБРАБОТЧИКИ DOM ************************************************************
	
	//Создаем формы для редактирования данных и размещаем их в центральной части модальных окон
	//При клике по #newBtn переводим приложение в режим формирования формы для вставки записи  
	$('#newBtn').on('click',function(){
		   app.mode='newmode';	//используется в roleeditform.tpl, groupeditform.tpl, usereditform.tpl
		   app.operation = 'Добавление новой записи';
		   var ref = new App.Views.RoleEditForm();  //по умолчанию спрятана
		   var gef = new App.Views.GroupEditForm(); //по умолчанию спрятана
		   var uef = new App.Views.UserEditForm();  //по умолчанию показана

		}			
	);

	//При клике по #edtBtn переводим приложение в режим формирования формы для изменения значений 1 и более записей
	$('#edtBtn').on('click',function(){
		   app.mode='editmode';	//используется в roleeditform.tpl, groupeditform.tpl, usereditform.tpl
		   app.operation = 'Редактирование записей';
		   var ref = new App.Views.RoleEditForm();  //по умолчанию спрятана
		   var gef = new App.Views.GroupEditForm(); //по умолчанию спрятана
		   var uef = new App.Views.UserEditForm();  //по умолчанию показана

		}			
	);	
	//	При клике по #edtBtn переводим приложение в режим формирования формы для изменения значений 1 и более записей
	$('#delBtn').on('click',function(){	   
		var rdlf = new App.Views.RoleDeleteForm();  //по умолчанию спрятана
		var gdlf = new App.Views.GroupDeleteForm();  //по умолчанию спрятана
		var udlf = new App.Views.UserDeleteForm();  //по умолчанию спрятана
		}			
	);
		
	// загружаем основную сетку с данными при клике по кнопкам на верхней панели инструментов
	$('#rolemode').on('click',function(){
		//Создаем модели и коллекции для работы с данными		
		app.casheedtrecords.reset();
		app.casheedtrecords = new App.Collections.Roles();		
		$('#mainGridPlace').empty();
		app.datastate = 'data';
		app.cc = new App.Views.CUDControl({collection: app.roles});		
		app.mpg = new App.Views.RolePagGrid({collection: app.roles, parentpaggrid: '#mainGridPlace'});
		
		
		}			
	);
	$('#groupmode').on('click',function(){		  
		//Создаем модели и коллекции для работы с данными
		app.casheedtrecords.reset();				
		app.casheedtrecords = new App.Collections.Groups();  //создаем коллекцию справочных данных для  (попадают выделенные в сетке данные)
		app.cashesprrecords = new App.Collections.Roles();
		$('#mainGridPlace').empty();
		app.datastate = 'data';
		app.cc = new App.Views.CUDControl({collection: app.groups });		
		app.mpg = new App.Views.GroupPagGrid({collection: app.groups, parentpaggrid: '#mainGridPlace'});	
		}			
	);
	
	$('#usermode').on('click',function(){		
		 app.casheedtrecords.reset();
		 app.casheedtrecords = new App.Collections.Users();  //создаем коллекцию справочных данных для кэширования выделенных в сетке данных
		 app.cashesprrecords = new App.Collections.Groups();
		 $('#mainGridPlace').empty(); 
		 app.datastate = 'data';
		 app.cc = new App.Views.CUDControl({collection: app.users});			
		 app.mpg = new App.Views.UserPagGrid({collection: app.users, parentpaggrid: '#mainGridPlace'});			
		}			
	);
	//---------------------------------------------------------------------------------------------------------------------------------------------  	
	console.log("Приложение загружено успешно");
  }
);

