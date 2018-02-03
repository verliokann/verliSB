define(['backbone'], function(Backbone){

  
 App.Models.ActiveModel = Backbone.Model.extend({
	 idAttribute: "id"
 });
 return  App.Models.ActiveModel;
});