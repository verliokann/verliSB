/**
 * http://usejsdoc.org/
 */

// Хранит данные прикрепленных справочников для модели,  
define(['content'], function(Content){

	App.Collections.Contents = Backbone.Collection.extend({
		   model: Content,		  
		   initialize: function () {
			    
		        // This will be called when an item is added. pushed or unshifted
		        this.on('add', function(model) {
		        	//console.log(roles.toJSON());
					//console.log(JSON.stringify(roles));
					console.log("Модель добавлена в коллекцию");					
		        });
		        // This will be called when an item is removed, popped or shifted
		        this.on('remove',  function(model) {
		            console.log('Модель удалена из коллекции');
		        });
		        // This will be called when an item is updated
		        this.on('change', function(model) {
		            console.log('Модель изменена в коллекции');
		        });
		  			
		        this.on("request", function(rolerecu){
				    console.log("Модель отправлена на сервер");
			    }),			
		        this.on("sync", function(rolesync){
				console.log("Модель добавлена в БД");
			    });		
		        },	        	   
		});	
	

	return  App.Collections.Contents;
});