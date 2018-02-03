/**
 * http://usejsdoc.org/
 */
define(['backbone'],
function (Backbone){		
    var BBServ;
	BBServ.template = function(id){
		return _.template($('#'+id).html());
	};
	
	return BBServ;

});
