define(['activemodel', 'backbone.paginator'], function(ActiveModel, BackbonePaginator){

	App.Collections.ActiveCollection = Backbone.PageableCollection.extend({
		   model: ActiveModel,		   
		});	
	
	console.log("Ehf!!!!!");
	
	return  App.Collections.ActiveCollection;
});