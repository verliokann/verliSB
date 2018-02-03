//Экземпляр CUDControl создается в paggrid.js после инициализации сетки !!!
//Кнопки реализованы в jsp.. перенести в шаблон текущего представления!

define(['backbone'], function(BackBone){		
	
	
	App.Views.CUDControl = Backbone.View.extend({
		
			template: _.template($('#cudcontrol').html()),
			
		    enableUDBtns: function(){		    	
		    	$('#edtBtn').removeClass('disabled');
	        	$('#delBtn').removeClass('disabled');
		    	
		    },
		    disableUDBtns: function(){		    	
		    	$('#edtBtn').attr('class','disabled btn btn-default');
	        	$('#delBtn').attr('class','disabled btn btn-default');
		    },
		    
		    initialize: function() {	    	
		    	
		    	//Слушаем изменения в коллекции кэшевых записей (для редактирования и удаления)
		    	this.listenTo(app.casheedtrecords, 'add', function(){
		    		if (app.casheedtrecords.length==1) {
			        	this.enableUDBtns();			        	
			        }
		    	});		    	
		    	this.listenTo(app.casheedtrecords, 'remove', function(){
		    		if (app.casheedtrecords.length==0) {
						   this.disableUDBtns();						
				        }
		    	});
		    	this.listenTo(app.casheedtrecords, 'reset', function(){		    	
		    			this.disableUDBtns();		    			
		    	});
		    	
		    	this.listenTo(this.collection, 'change', function(){
		    		this.disableUDBtns();		    		
		    		
		    	});
		    	
		    	this.listenTo(this.collection, 'remove', function(){
		    		this.disableUDBtns();		    		
		    	});		
		    			    		    	
		    	this.render();	    		    	
		    },
		    
		    render: function() {		    	
		    	this.$el.html();
		        return this;
		    }
		    
		 });  
		
		return App.Views.CUDControl;
	}	
);

