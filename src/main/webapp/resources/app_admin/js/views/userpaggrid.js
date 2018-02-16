define(['backgrid', 'bgpaginator', 'bgfilter', 'bgselectall', 'cudcontrol','paggrid', 'users','user'], 
		function(Backgrid, BGPaginator, BGFilter, BGSelectAll, CUDControl, PagGrid, Users, User){

	// Подкачиваем все необходимые css --------------------------------------------------------------------------------
		
	ZUI.loadCss('resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
			
//******************************************************************************************************************************
//     (начало) Описание представления, формирующего модальное окно с данными сущности "Роли"
//******************************************************************************************************************************
	
	App.Views.UserPagGrid = App.Views.PagGrid.extend({
		columns : [
		              {	
		            	name: "",
		            	cell: "select-row"
		              },		    	
		    		  {
		    		    name: "login",
		    		    label: "Наименование",		   
		    		    cell: Backgrid.Cell.extend({
	    			        render: function(){	    			    
	    			            this.$el.text(this.model.get("login"));		    	
	    			        	this.$el.unbind();
	    			            return this;
	    			        }
	    		      }) 
		    		  }, 
		    		  {
		    			 name: "groups",
		    			 label: "Группы пользователей",			    
		    			 cell: Backgrid.Cell.extend({

		    			        render: function(){
		    			        	//инициализируем добавляемый html элемент
		    			        	this.$el.empty();
		    			        	//клонируем список ролей
		    			            var groupsarray = _.clone(this.model.get("userGroups"));
		    			        			    
		    			            // собираем строку имен ролей
		    			        	app.content = '';		    			        	
		    			        	_.each(groupsarray, function(group) {
		    			        			app.content+=group.name+'   ';
		    			        		})
		    			            this.$el.text(app.content);		    	
		    			        	this.$el.unbind();		    			        	
		    			            return this;
		    			        }
		    		      })
		    		  }
		    		 ]	
	});
//******************************************************************************************************************************
//   (конец)    Описание представления, формирующего модальное окно с данными сущности "Роли"
//	
//******************************************************************************************************************************
 
 return App.Views.UserPagGrid;
});
