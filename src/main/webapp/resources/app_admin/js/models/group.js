/**
 * http://usejsdoc.org/
 */
define(['backbone'], function(Backbone){

  
 App.Models.Group = Backbone.Model.extend({
	 idAttribute: "id",
	 validate: function(attrs, options) {
		    //имя роли не должно быть пустым
		    if (attrs.name == '') {
		  	  alert('Введите название группы');	
		      return "необходимо ввести имя";
		    }
     },	 
 });
 return  App.Models.Group;
});