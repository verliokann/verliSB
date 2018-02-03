define(['backbone', 'roles', 'role','rolepaggrid', 'text!app_admin/templates/spr.tpl'], 
		function(BackBone, Roles, Role, RolePagGrid, SPR){
	
	ZUI.loadCss('http://localhost:8080/cmf/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/cmf/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/cmf/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/cmf/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/cmf/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
	
	 
	 App.Views.GroupRolesSpr = Backbone.View.extend({
	        className: 'modal-content',
		    template: _.template(SPR),

		    events: {		    	
		      	'click #addsprdatabtn': 'addClicked',        	
		      	'click #closesprbtn': 'closeSpr',
	    	},		   	  	
	    	closeSpr: function(){
	    		 app.datastate = 'data';
	    	},	    	
	    	addClicked: function () {    		
	    	    // собираем строку имен ролей
	        	var content = '';            	
	        	app.cashesprrecords.each(function(role) {
	        			content+=role.get('rolename')+'   ';
	        		})	        		            		
	        	//передаем сформированную строку соответствующему полю в форме редактирования групп
		        $("#grouprolesinput"+App.States.id_el).val(content);
	        	
	        	//Обновляем список ролей редактируемой группы 
	        	if (app.mode=='editmode')
	        		app.casheedtrecords.get(App.States.id_el).set({roles:app.cashesprrecords.toJSON()}); // обновляем локально список ролей, но не посылаем на сервер   
		    		        	
	        	app.datastate = 'data';
		    },
		    initialize: function() {
		    	this.generateSprForm();		    	
		    },		   
		    render: function() {
		    	 this.$el.html(this.template({sprname: app.sprname}));
			        return this;		    	
		    }, 
		    generateSprForm:function(){
		    	//Удаляем предыдущую форму
		    	$('div[id="sprform"] div[class="modal-dialog"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="sprform"] div[class="modal-dialog"]').append(this.render().el);	    	
		    }		    	
	 });
	 
	 return  App.Views.GroupRolesSpr;
});