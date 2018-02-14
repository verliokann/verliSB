define(['backgrid', 'bgpaginator', 'bgfilter', 'bgselectall', 'cudcontrol'], 
		function(Backgrid, BGPaginator, BGFilter, BGSelectAll, CUDControl){

	// Подкачиваем все необходимые css --------------------------------------------------------------------------------		
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');	
	
//******************************************************************************************************************************
//     (начало) Описание представления, формирующего модальное окно с данными сущности "Роли"
//******************************************************************************************************************************
	
	App.Views.PagGrid = Backbone.View.extend({
		tagName: 'div',
		className: '.paggrid',					
		/* ********************************** Инициализация********************************************** */
		initialize: function(options){		
			
			app.content=''; //используем для хранения склеенных справочных данных (списка групп пользователей)
																	
			//	инициализация сетки			
			this.datastate = options.datastate; // данные или справочник
			this.parentpaggrid = options.parentpaggrid; // определение элемента для привязки текущего элемента 
			this.collection = options.collection; 
			
			this.eventOn();
			
			// Создание пагинатора и сетки
			this.paginator = new Backgrid.Extension.Paginator({
				collection: this.collection
			});	

			this.grid = new Backgrid.Grid({	
				columns: this.columns,
				collection: this.collection
			});		
			
            // рендер сетки при получении данных
			var _thisView = this; // передаем ссылку на область видимости в обработчик успешной загрузки данных
				
			this.collection.fetch({				
				 reset: true,
				 success: function () {		
					console.log("Записи получены без ошибок");					
					  //  Создание и инициализация виджета постраничного просмотра данных					
													
					_thisView.render();				
					
					//Если сетка открывается в режиме справочных данных, то необходимо выделить записи с полями выбранной для редактирования группы пользователей  
					if (app.datastate =="sprdata"){
					    app.block = true; // блокируем добавление модели в кэш (см. eventOn строка 69 )
						_thisView.collection.each(function (gridmodel) {
							var id = gridmodel.get("id");	
							app.cashesprrecords.each(function (sprmodel) {
								if (id == sprmodel.get("id")) {
									gridmodel.trigger("backgrid:select", gridmodel, true);						
								}
							});
						});
						app.block = false;						
					}
										
					$(_thisView.parentpaggrid).append(_thisView.el);
				}
			})				
		 },
		 eventOn: function(){			
				this.collection.on('backgrid:selected', function(model, selected) { 
				   // Получаем доступ к выделенному объекту(объектам)			   
				   // Передаем данные в текущую модель, если она выделена						   
				  if (app.block==false) {			
					if (selected) {				    
				        currentid = model.get('id');			        
				        if (app.datastate =="data"){
				           app.casheedtrecords.add(model); //добавляем модель в коллекцию			           
				        }  
				        else{
				           app.cashesprrecords.add(model); //добавляем модель в коллекцию				           
				        }			        
				        console.log("Выбран идентификатор: ", currentid);		        			        
				   } else  {				   
					   if (app.datastate =="data"){
						   app.casheedtrecords.remove(model); //удаляем модель из коллекции				       
					   } 
					   else{
				           app.cashesprrecords.remove(model); //добавляем модель в коллекцию				           
					   }			        
				   }				 	
				  };
				})	 
		 },			 		
		 /*********************************** Рендер ******************************************* */		 
		 render: function(){			 
		    this.$el.empty();
			this.$el.append(this.paginator.render().el);
			this.$el.append(this.grid.render().el);			
			console.log("Основная сетка отрендерилась!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log(this.el);			
		    return this;
		 }
	});
//******************************************************************************************************************************
//   (конец)    Описание представления, формирующего модальное окно с данными сущности "Роли"
//	
//****************************************************************************************************************************** 
 return App.Views.PagGrid;
});