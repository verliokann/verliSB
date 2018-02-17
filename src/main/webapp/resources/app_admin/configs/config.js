/**
 * http://usejsdoc.org/
 */
requirejs.config({
    baseUrl: 'resources',
	paths: {
		"jquery"    	: 'js/jquery-3.2.1',
		"underscore"	: 'js/underscore',
		"json2"     	: 'js/json2',
		"backbone"  	: 'js/backbone',
		"text"      	: 'js/text',
		"rivets"      	: 'js/rivets.min',
		"rivetsconf" 	: 'js/rivets.backbone.config',
		"role"      	: 'app_admin/js/models/role',
		"group"      	: 'app_admin/js/models/group',
		"user"      	: 'app_admin/js/models/user',
		"activemodel" 	: 'app_admin/js/models/activemodel',
		"content"       : 'app_admin/js/models/content',
		"roles"     	: 'app_admin/js/collections/roles',
		"groups"      	: 'app_admin/js/collections/groups',
		"users"      	: 'app_admin/js/collections/users',
		"activecollection" 	: 'app_admin/js/collections/activecollection',
		"contents"      : 'app_admin/js/collections/contents',
		"v_sprform" 	: 'app_admin/js/views/v_role_ed_form',
		"roleeditform" 	: 'app_admin/js/views/roleeditform',
		"roledeleteform": 'app_admin/js/views/roledeleteform',
		"groupeditform"	: 'app_admin/js/views/groupeditform',
		"groupdeleteform": 'app_admin/js/views/groupdeleteform',
		"usereditform" 	: 'app_admin/js/views/usereditform',
		"userdeleteform": 'app_admin/js/views/userdeleteform',
		"paggrid"  		: 'app_admin/js/views/paggrid',
		"rolepaggrid"  	: 'app_admin/js/views/rolepaggrid',
		"grouppaggrid" 	: 'app_admin/js/views/grouppaggrid',
		"userpaggrid"  	: 'app_admin/js/views/userpaggrid',
		"grouprolesspr" : 'app_admin/js/views/grouprolesspr',
		"usergroupsspr" : 'app_admin/js/views/usergroupsspr',
		"cudcontrol"    : 'app_admin/js/views/cudcontrol',
		"gridcolumns"   : 'app_admin/js/views/gridcolumns',
		"backgrid"  	: 'components/backgrid-0.3.7/lib/backgrid',
		"backbone.paginator" 		: 'components/backbone.paginator-master/lib/backbone.paginator',
		"bgpaginator"   : 'components/backgrid-paginator-master/backgrid-paginator.min',
		"bgfilter"    	: 'components/backgrid-filter-master/backgrid-filter.min',
		"bgselectall"  	: 'components/backgrid-select-all-master/backgrid-select-all',
		"bbserv"       	: 'app_admin/js/bbserv',
		"app"       	: 'app_admin/js/main'
	},
	shim: {
		 underscore: {
		 exports: "_"
		 },
		 backbone: {
		  deps: ["jquery", "underscore", "json2"],
		  exports: "Backbone"
		 }
	},
	waitSeconds: 15
 });


//Стартуем клиентское приложение после его загрузки 
require(['app']);

