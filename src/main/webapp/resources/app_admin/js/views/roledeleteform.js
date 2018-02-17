define(['backbone', 'rolepaggrid', 'roles', 'role', 'text!app_admin/templates/roledeleteform.tpl'], 
		function(BackBone, RolePagGrid,  Roles, Role, RDLF){
	
	ZUI.loadCss('resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('resources/components/backgrid-select-all-master/backgrid-select-all.min.css');

	App.Views.RoleDeleteForm = Backbone.View.extend({
	        className: "modal-content",
		    template: _.template(RDLF),

		    events: {		    	
		      	'click #delbtn': 'delClicked'              
	    	},

	        initialize: function() {        	
	        	this.generateDeleteForm();
		    },		 
		    render: function() {		    	
		        this.$el.html(this.template({casheroles : app.casheedtrecords}));
		        return this;
		    },	    	
		    delClicked: function () {		    	
                app.alerttext = "";	    	
		    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    		app.dl_flag = true;
		    	    console.log("Удаляем модель с индексом "+i);
		    	    		    	    	    
		    	    app.groups.each(function (groupmodel,ind) {					
		    	    	var grouproles = _.clone(groupmodel.get("roles"));	  
		    	    			    	    	
		    	    	_.each(grouproles, function(role) {
		    	    		if ((role.id == app.casheedtrecords.at(i).get("id")) && (app.dl_flag)){			    			
				    			 app.dl_flag = false;
								 app.alerttext = app.alerttext+" "+app.casheedtrecords.at(i).get("rolename");								
				         	} 			        		
 			        	})	    	    	 	       
		    	     });	    	    	
		    	    
		    	    	
		    	    if (app.dl_flag ){		    	   
		    	    app.casheedtrecords.at(i).destroy({	    	      
					    success: function (model, respose, options) {
					        console.log("Роль удалилась");    
					        
					    },
					    error: function (model, xhr, options) {
					        console.log("Роль не удалилась");
					    }	    				   	    				   
				    })
		    	    } 
		    	}
		    	
		    	if (!app.alerttext.trim() == "") alert("Роль/роли: "+app.alerttext+" не могут быть удалены, так как они связаны с группами.");	    	  
		    },		    
		    generateDeleteForm:function(){
		    	//Удаляем предыдущую форму
		    	$('div[id="deleteform"] div[id="roledeleteform"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="deleteform"] div[id="roledeleteform"]').append(this.render().el);		    	
		    }
		  
	 });
	 
	 return App.Views.RoleDeleteForm;
});
