define(['rivets', 'backbone'], function(rivets, Backbone){
	
	rivets.adapters[':'] = {
			  subscribe: function(obj, keypath, callback) {
			    obj.on('change:' + keypath, callback);
			  },
			  unsubscribe: function(obj, keypath, callback) {
			    obj.off('change:' + keypath, callback);
			  },
			  read: function(obj, keypath) {
			    return obj.get(keypath);
			  },
			  publish: function(obj, keypath, value) {
			    obj.set(keypath, value);
			  }
			}	
	return rivets;
	
  /*rivets.configure({
    adapter: {
      subscribe: function(obj, keypath, callback) {
        if (obj instanceof Backbone.Collection) {
          obj.on('add remove reset', function () {
            callback(obj[keypath]);
          });
        } else {
          obj.on('change:' + keypath, function (m, v) {
            callback(v);
          });
        }
      },
      unsubscribe: function(obj, keypath, callback) {
        if (obj instanceof Backbone.Collection) {
          obj.off('add remove reset', function () {
            callback(obj[keypath]);
          });
        } else {
          obj.off('change:' + keypath, function (m, v) {
            callback(v);
          });
        }
      },
      read: function(obj, keypath) {
        if (obj instanceof Backbone.Collection)  {
          // keypath = null
          return obj['models'];
        } else {
          return obj.get(keypath);
        }
      },
      publish: function(obj, keypath, value) {
        if (obj instanceof Backbone.Collection) {
          obj[keypath] = value;
        } else {
          obj.set(keypath, value);
        }
      }
    }
  });*/
});