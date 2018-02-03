/**
 * http://usejsdoc.org/
 */
define(['backbone'], function(Backbone){

  
 App.Models.Role = Backbone.Model.extend({
	 idAttribute: "id",
	 validate: function(attrs, options) {
		    //имя роли не должно быть пустым
		    if (attrs.rolename == '') {
		  	  alert('Введите название роли');	
		      return "необходимо ввести имя";
		    }
     },	 	  
 });
 return  App.Models.Role;
});