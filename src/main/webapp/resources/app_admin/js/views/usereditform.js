define(['backbone', 'groups', 'group', 'grouppaggrid', 'usergroupsspr', 'text!app_admin/templates/usereditform.tpl'], 
		function(BackBone, Groups, Group, GroupPagGrid, UserGroupsSpr, UEF){
	
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-0.3.7/lib/backgrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-paginator-master/backgrid-paginator.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-filter-master/backgrid-filter.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/app_admin/style/css/simplereferencegrid.css');
	ZUI.loadCss('http://localhost:8080/qps/resources/components/backgrid-select-all-master/backgrid-select-all.min.css');
		
	 App.Views.UserEditForm = Backbone.View.extend({
	        
		    template: _.template(UEF),

		    events: {		    	
		      	'click #addbtn': 'addClicked',	        	
	        	'click #updbtn': 'updClicked',
	        	'click .sprgroupsbtn': 'openSpr',
	        	'click .passcheckbox': 'showPass',
	        	'click .changepasscheckbox': 'enablePassInputs',
	        	'click #cancelbtn': 'rolebackGroups' 
	    	},    	
		    initialize: function() {
		    	this.generateEditForm();    
		    	app.cashrolebackrecords = new App.Collections.Users();
	    		//Дублируем закэшированные модели в случае отказа от изменений
	    		this.copyCollection(app.casheedtrecords, app.cashrolebackrecords);
		    },
		    openSpr: function(ev) {	    	 	    	
	    	     app.sprname = "Группы";
	    	     app.datastate = 'sprdata';
	    	     App.States.id_el = ev.target.id;
		    	 App.States.id_el=App.States.id_el.replace('sprgroupsbtn', '');
	    	     
		    	 app.cashesprrecords.reset();  //очистка кэша данных справочника
		    		//заполняем кэш моделями ролей, соответствующими редактируемой группе пользователей
		    		app.casheedtrecords.each(function (item, index, all) {			    		 
			    		if (item.get("id")==App.States.id_el){			    			
			    			app.cashesprrecords.add(_.clone(item.get("userGroups")));
			    		}
			        });
		    		
	    	     var urs = new App.Views.UserGroupsSpr();	    	 
		    	 app.gpg = new App.Views.GroupPagGrid({collection: app.groups, parentpaggrid: '#sprGridPlace'});	    	     
		    				    		
		    	    		
	        },
		    showPass:function(ev){
		    	var id_el = ev.target.id;
		    		id_el=id_el.replace('passcheckbox', '');
		    			    		    	
		    	if ($(ev.target).prop("checked"))
		    	{
		    		$('#inputPassword'+id_el).attr('type','text');            
			       		    		
		    	}
		    	    else
		    	{
	    	    	$('#inputPassword'+id_el).attr('type','password'); 	        
		    	    			    	
		    	}
		    },		   
		    enablePassInputs: function(ev){
		    	var id_el = ev.target.id;
		    		id_el=id_el.replace('changepasscheckbox', '');
		    	
		    	if ($(ev.target).prop("checked")){
		    		$('#inputPassword'+id_el).removeAttr('disabled');
		    		$('#inputPasswordCopy'+id_el).removeAttr('disabled');
		    	} else{
		    		$('#inputPassword'+id_el).attr('disabled',true);
		    		$('#inputPasswordCopy'+id_el).attr('disabled',true);
		    	}
		    },
		    render: function() {
		        this.$el.html(this.template({operation: app.operation, casheusers: app.casheedtrecords, mode: app.mode}));
		        return this;
		    },
		    generateEditForm:function(){
		    	//Удаляем предыдущую форму
		    	$('div[id="editform"] div[id="useredtform"]').empty();
		    	//Рендерим и добавляем в модальное окно см. app_admin.jsp
		    	$('div[id="editform"] div[id="useredtform"]').append(this.render().el);
		    	console.log('Элемент вьюхи ', this.el);
		    },
		    copyCollection: function(collection1, collection2){
			    var idAttribute = collection1.model.prototype.idAttribute;
			    var data = _.map(collection1.toJSON(), function(obj){ return _.omit(obj, idAttribute);});
			    collection2.add(data);
		    },
		    rolebackGroups:function(){		    	 
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){		    	   		    	    
		    	    app.casheedtrecords.at(i).set({userGroups: app.cashrolebackrecords.at(i).get("userGroups")});   
		    	}
		    	app.mpg.render();	
		    	app.casheedtrecords.reset(); //сбрасываем кэш (на него реагируют CUD кнопки )		    	
		    },
		    addClicked: function () {
		    	 if (this.$el.find('input[id="inputPasswordnew"]').val() ==  this.$el.find('input[id="inputPasswordCopynew"]').val()){
		    		    app.users.create({login: this.$el.find('input[id="usernameinput"]').val().trim(), 
		    		    				  password: this.$el.find('input[id="inputPasswordnew"]').val().trim(),
	    						          userGroups:app.cashesprrecords.toJSON()},
	    						          {
	    						        	  wait: true,  		                        
	    						        	  success: function (model, response) {  		                        
		                        		   				console.log("Идентификатор новой группы ", response);
		                        	   	 			},
		                        	   	 			error: function (model, err) {
		                        	   	 				console.log("Группа не добавилась ", err);
		                        	   	 			}    
	    						          });
		    	 } else {alert("Пароли не совпадают")};	    
	    	},
		    updClicked: function () {	   
		      
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){
		    	    console.log("Обновляем модель с индексом "+i);
		    	    
		    	    if (this.$el.find('input[id="inputPassword'+app.casheedtrecords.at(i).get("id")+'"]').val() == 
		    	    	this.$el.find('input[id="inputPasswordCopy'+app.casheedtrecords.at(i).get("id")+'"]').val()){		    	    
		    	    		app.casheedtrecords.at(i).set({login: this.$el.find('input[id="usernameinput'+app.casheedtrecords.at(i).get("id")+'"]').val().trim(),
		    	    	                                   password: this.$el.find('input[id="inputPassword'+app.casheedtrecords.at(i).get("id")+'"]').val().trim()});
		    	       } else {alert("Пароли не совпадают")} 	
		    	}    
		    	
		    	for (i=(app.casheedtrecords.length-1);i>-1;i--){    		    	    
		    	    app.casheedtrecords.at(i).save({}, {
		    	    	wait: true,		    	    
			            success: function (model, respose, options) {
			                console.log("Пользователь шикарно обновился");			                
			              
			                app.users.sort();  //привязать к методам userpaggrid
			                app.mpg.render();			                
			                app.casheedtrecords.reset(); //сбрасываем кэш (на него реагируют CUD кнопки ) 
			                
			            },
			            error: function (model, xhr, options) {
			                console.log("Пользователь не обновился");
			            }
			        });
		    	};   
		    },
	 });
	 
	 return App.Views.UserEditForm;
});
