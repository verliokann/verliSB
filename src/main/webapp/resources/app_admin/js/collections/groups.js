/**
 * http://usejsdoc.org/
 */
define(['group', 'backbone.paginator'], function(Group, BackbonePaginator){
	
	App.Collections.Groups = Backbone.PageableCollection.extend({
		   model: Group,		  
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
		  			
		        /*this.on("request", function(rolerecu){
				    console.log("Модель отправлена на сервер");
			    }),*/			
		        /*this.on("sync", function(rolesync){
				console.log("Модель добавлена в БД");
			    });*/	
		        
		        this.comparator = function(group) {
		        	  return group.get("name");
		        	};
		        
		        
		        },
			    
		  saverole: function(id_c){               	
	               	console.log("Модель по номеру ", this.get(19));			
				},
		        
		   url: "usergroup", 
		
		   state: {
			    pageSize: 15
		   },
		 
		   mode: "client" // page entirely on the client side		    
			   
		});	
	
	console.log("Ehf!!!!!");
	
	return  App.Collections.Groups;
});