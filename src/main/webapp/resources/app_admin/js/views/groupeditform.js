define(['backbone', 'roles', 'role','rolepaggrid', 'grouprolesspr', 'text!app_admin/templates/groupeditform.tpl'], 
		function(BackBone, Roles, Role, RolePagGrid, GroupRolesSpr, GEF){
	
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
		
	 App.Views.GroupEditForm = Backbone.View.extend({
	        
		    template: _.template(GEF),

		    events: {		    	
		      	'click #addbtn': 'addClicked',	        	
	        	'click #updbtn': 'updClicked',
	        	'click #cancelbtn': 'rolebackRoles', 
	        	'click .sprrolesbtn': 'openSpr'
	        		
	    	},	  		    	
		    initialize: function() {
		    	this.generateEditForm();
		    	app.cashrolebackrecords = new App.Collections.Groups();
	    		//Дублируем закэшированные модели в случае отказа от изменений
	    		this.copyCollection(app.casheedtrecords, app.cashrolebackrecords);
		    },
		    
		    openSpr: function(ev) {    	    	    	        	    	    	    
		    	    
		    	    app.sprname = "Роли";
		    	    app.datastate = 'sprdata';	    		
		    	    		    	    
		    	    App.States.id_el = ev.target.id;
		    		App.States.id_el=App.States.id_el.replace('sprrolesbtn', '');
		    				    		
		    		app.cashesprrecords.reset();  //очистка кэша данных справочника
		    		//заполняем кэш моделями ролей, соответствующими редактируемой группе пользователей
		    		app.casheedtrecords.each(function (item, index, all) {			    		 
			    		if (item.get("id")==App.States.id_el){			    			
			    			app.cashesprrecords.add(_.clone(item.get("roles")));
			    		}
			        });
		    	    
		    	    var grs = new App.Views.GroupRolesSpr();
		    		app.rpg = new App.Views.RolePagGrid({collection: app.roles, parentpaggrid: '#sprGridPlace'});
		    		
		    			    			    		
		    },		 
		    generateEditForm:function(){
		    	//Удаляем предыдущую форму
		    	$('div[id="editform"] div[id="groupedtform"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="editform"] div[id="groupedtform"]').append(this.render().el);		    	
		    },
		    render: function() {
		    	 this.$el.html(this.template({operation: app.operation, cashegroups : app.casheedtrecords, mode: app.mode}));
			     return this;		    	
		    },
		    copyCollection: function(collection1, collection2){
			    var idAttribute = collection1.model.prototype.idAttribute;
			    var data = _.map(collection1.toJSON(), function(obj){ return _.omit(obj, idAttribute);});
			    collection2.add(data);
		    },
		    rolebackRoles:function(){		    	 
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){		    	    		    	    
		    	    app.casheedtrecords.at(i).set({roles: app.cashrolebackrecords.at(i).get("roles")});   
		    	}
		    	app.mpg.render();	
		    	app.casheedtrecords.reset(); //сбрасываем кэш (на него реагируют CUD кнопки )		    	
		    },
		    addClicked: function () {	    	
		    	var newgroup = app.groups.create({name: this.$el.find('input[id="groupnameinput"]').val(), roles:app.cashesprrecords.toJSON()},
  	                              {
	                                wait: true,  		                        
	                        	    success: function (model, response) {  		                        
	                        		   			console.log("Идентифиатор новой группы ", response);
	                        	   	 		},
	                        	    error: function (model, err) {
	          			                        console.log("Группа не добавилась ", err);
	          			            } 			
				            });		    	
		    },
		    updClicked: function () {		    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    	    console.log("Обновляем модель с индексом "+i);
		    	    
		    	    app.casheedtrecords.at(i).set({name: this.$el.find('input[id="groupnameinput'+app.casheedtrecords.at(i).get("id")+'"]').val()});   
		    	} 
		    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    	app.casheedtrecords.at(i).save({}, {
		    	    	wait: true,
		    	    	success: function (model, respose, options) {
			                console.log("Группа обновилась");			                			                
			                app.groups.sort(); //привязать к методам grouppaggrid
			                app.mpg.render();			                
			                app.casheedtrecords.reset(); //сбрасываем кэш (на него реагируют CUD кнопки ) 
			            },
			            error: function (model, xhr, options) {
			                console.log("Группа не обновилась");
			            }
			        });
		    	};		    	
		    }		    
	 });
	 
	 return App.Views.GroupEditForm;
});




 

