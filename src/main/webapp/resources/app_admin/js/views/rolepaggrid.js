define(['backgrid', 'bgpaginator', 'bgfilter', 'bgselectall', 'paggrid', 'roles','role'], 
		function(Backgrid, BGPaginator, BGFilter, BGSelectAll, PagGrid, Roles, Role){

	// Подкачиваем все необходимые css --------------------------------------------------------------------------------
		
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
	
	
//******************************************************************************************************************************
//     (начало) Описание представления, формирующего модальное окно с данными сущности "Роли"
//******************************************************************************************************************************
	
	App.Views.RolePagGrid = App.Views.PagGrid.extend({
		columns : [             {name: "", 	cell: "select-row"	 },				            
				  				{name: "rolename", label: "Наименование", cell: Backgrid.Cell.extend({
		    			        	render: function(){	 
		    			        		this.$el.empty();
		    			        		this.$el.text(this.model.get("rolename"));
		    			        		this.$el.unbind();
		    			        		return this;
		    			        }
		    		           }) 
		    		          }, 
				  				{name: "description", label: "Комментарий", cell: Backgrid.Cell.extend({
		    			        	render: function(){	 
		    			        		this.$el.empty();
		    			        		this.$el.text(this.model.get("description"));		    			        		
		    			        		this.$el.unbind();		    			        		
		    			        		return this;
		    			        }
		    		           })  }
				  			  ],		
	});
//******************************************************************************************************************************
//   (конец)    Описание представления, формирующего модальное окно с данными сущности "Роли"
//	
//******************************************************************************************************************************
 
 return App.Views.RolePagGrid;
});

