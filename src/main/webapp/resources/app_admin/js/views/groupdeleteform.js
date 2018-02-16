define(['backbone', 'grouppaggrid', 'groups', 'group', 'text!app_admin/templates/groupdeleteform.tpl'], 
		function(BackBone, GroupPagGrid,  Groups, Group, GDLF){
	
	ZUI.loadCss('resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('resources/components/backgrid-select-all-master/backgrid-select-all.min.css');

	App.Views.GroupDeleteForm = Backbone.View.extend({
		    className: 'modal-content',
		    template: _.template(GDLF),

		    events: {		    	
		      	'click #delbtn': 'delClicked'		      
	    	},

	        initialize: function() {        	
	        	this.generateDeleteForm();
		    },		 
		    render: function() {		    	
		        this.$el.html(this.template({cashegroups : app.casheedtrecords}));
		        return this;
		    },	    	
		    delClicked: function () {			    	
		    	app.alerttext = "";	    	
		    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    		app.dl_flag = true;
		    	    console.log("Удаляем модель с индексом "+i);
		    	    		    	    	    
		    	    app.users.each(function (usermodel,ind) {					
		    	    	var usergroups = _.clone(usermodel.get("userGroups"));	  
		    	    	
		    	    	_.each(usergroups, function(group) {
		    	    		if ((group.id == app.casheedtrecords.at(i).get("id")) && (app.dl_flag)){			    			
				    			 app.dl_flag = false;
								 app.alerttext = app.alerttext+" "+app.casheedtrecords.at(i).get("name");									
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
		    	
		    	if (!app.alerttext.trim() == "") alert("Группа/группы: "+app.alerttext+" не могут быть удалены, так как в них зарегистрированы пользователи.");
		    },		    
		    generateDeleteForm:function(){		    	
		    	//Удаляем предыдущую форму
		    	$('div[id="deleteform"] div[id="groupdeleteform"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="deleteform"] div[id="groupdeleteform"]').append(this.render().el);
		    	console.log('Шаблончик алерта ', this.el);
		    }		  
		    
	 });
	 
	 return App.Views.GroupDeleteForm;
});