/**
 * http://usejsdoc.org/
 */
define(['backbone'], function(Backbone){

  
 App.Models.User = Backbone.Model.extend({
	 idAttribute: "id",
	 validate: function(attrs, options) {
		    //имя роли не должно быть пустым
		    if ((attrs.login == '') || (attrs.password == '')) {
		  	  alert('Логин и/или пароль не должны быть пустыми');	
		      return "необходимо ввести логин и/или пароль";
            } 
		    //проверка того, что введенные пароль и его копия совпадают, реализована в представлении usereditform.js  в методе updClicked:
     },	 
	 
 });
 return  App.Models.User;
});