define(['backbone', 'userpaggrid', 'users', 'user', 'text!app_admin/templates/userdeleteform.tpl'], 
		function(BackBone, UserPagGrid,  Users, User, UDLF){
	
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');

	App.Views.UserDeleteForm = Backbone.View.extend({
		    className: 'modal-content',
		    template: _.template(UDLF),

		    events: {		    	
		      	'click #delbtn': 'delClicked'		      	
	    	},

	        initialize: function() {        	
	        	this.generateDeleteForm();
		    },		 
		    render: function() {		    	
		        this.$el.html(this.template({casheusers : app.casheedtrecords}));
		        return this;
		    },	    	
		    delClicked: function () {	    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    	    console.log("Удаляем модель с индексом "+i);
		    	    app.casheedtrecords.at(i).destroy({	    	      
					    success: function (model, respose, options) {
					        console.log("Пользователь удален");    
					        
					    },
					    error: function (model, xhr, options) {
					        console.log("Пользователь не удалился");
					    }	    				   	    				   
				    })	 
		    	}  
		    },		    
		    generateDeleteForm:function(){		    	
		    	//Удаляем предыдущую форму
		    	$('div[id="deleteform"] div[id="userdeleteform"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="deleteform"] div[id="userdeleteform"]').append(this.render().el);
		    	console.log('Элемент вьюхи ', this.el);
		    }	  
		    
	 });
	 
	 return App.Views.UserDeleteForm;
});