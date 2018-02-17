define(['backgrid', 'bgpaginator', 'bgfilter', 'bgselectall', 'paggrid','groups','group'], 
		function(Backgrid, BGPaginator, BGFilter, BGSelectAll, PagGrid, Groups, Group){

	// Подкачиваем все необходимые css --------------------------------------------------------------------------------
		
	ZUI.loadCss('resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
		
//******************************************************************************************************************************
//     (начало) Описание представления, формирующего модальное окно с данными сущности "Роли"
//******************************************************************************************************************************
	
	App.Views.GroupPagGrid = App.Views.PagGrid.extend({		
		columns : [
            {	
         	name: "",
         	cell: "select-row"		            	
            },		    		
 		  {
 		    name: "name",
 		    label: "Наименование",		   
 		    cell: Backgrid.Cell.extend({
			        	render: function(){	 
			        		this.$el.empty();
			        		this.$el.text(this.model.get("name"));
			        		this.$el.unbind();	    			        		
			        		return this;
			        }
		        }) 
 		  }, 
 		  {
 			 name: "roles",
 			 label: "Список ролей",			    
 			 cell:  Backgrid.Cell.extend({

 			        render: function(){
 			        	//инициализируем добавляемый html элемент
 			        	this.$el.empty();
 			        	//клонируем список ролей
 			            var rolesarray = _.clone(this.model.get("roles"));
 			        			    
 			            // собираем строку имен ролей
 			        	app.content = '';		    			        	
 			        	_.each(rolesarray, function(role) {
 			        		app.content+=role.rolename+'   ';
 			        		})	    			        	
 			        
 			            this.$el.text(app.content);      
 			        	this.$el.unbind(); 			        	
 			            return this;

 			        }
 		      })
 		  }
 		 ],	
	});
//******************************************************************************************************************************
//   (конец)    Описание представления, формирующего модальное окно с данными сущности "Роли"
//	
//******************************************************************************************************************************
 
 return App.Views.GroupPagGrid;
});
