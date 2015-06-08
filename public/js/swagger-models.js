/**
* Generated by Magnet Codegen tool version 2.3.0
*/

(function(exports, isNode){ var MagnetJS = isNode ? require('../../target/magnet-sdk') : exports;

  //-------------model definiton for User-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.User = function(){
    this.name = 'User';

    this.schema = {
      'id' : {
        type     : 'long',
        optional : false
      }, 
      'username' : {
        type     : 'string',
        optional : false
      }, 
      'firstName' : {
        type     : 'string',
        optional : false
      }, 
      'lastName' : {
        type     : 'string',
        optional : false
      }, 
      'email' : {
        type     : 'string',
        optional : false
      }, 
      'password' : {
        type     : 'string',
        optional : false
      }, 
      'phone' : {
        type     : 'string',
        optional : false
      }, 
      'userStatus' : {
        type     : 'int',
        optional : false
      }
    };
    /**
    * @property {long id]
    * @property {string username]
    * @property {string firstName]
    * @property {string lastName]
    * @property {string email]
    * @property {string password]
    * @property {string phone]
    * @property {int userStatus]
    **/
    this.attributes = {
      'id'                            : null, 
      'username'                      : null, 
      'firstName'                     : null, 
      'lastName'                      : null, 
      'email'                         : null, 
      'password'                      : null, 
      'phone'                         : null, 
      'userStatus'                    : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.User.prototype = new MagnetJS.Model();
  MagnetJS.Models.User.prototype.constructor = MagnetJS.Models.User;

  //-------------model definiton for ApiResponse-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.ApiResponse = function(){
    this.name = 'ApiResponse';

    this.schema = {
      'code' : {
        type     : 'int',
        optional : false
      }, 
      'type' : {
        type     : 'string',
        optional : false
      }, 
      'message' : {
        type     : 'string',
        optional : false
      }
    };
    /**
    * @property {int code]
    * @property {string type]
    * @property {string message]
    **/
    this.attributes = {
      'code'                          : null, 
      'type'                          : null, 
      'message'                       : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.ApiResponse.prototype = new MagnetJS.Model();
  MagnetJS.Models.ApiResponse.prototype.constructor = MagnetJS.Models.ApiResponse;

  //-------------model definiton for Category-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.Category = function(){
    this.name = 'Category';

    this.schema = {
      'id' : {
        type     : 'long',
        optional : false
      }, 
      'name' : {
        type     : 'string',
        optional : false
      }
    };
    /**
    * @property {long id]
    * @property {string name]
    **/
    this.attributes = {
      'id'                            : null, 
      'name'                          : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.Category.prototype = new MagnetJS.Model();
  MagnetJS.Models.Category.prototype.constructor = MagnetJS.Models.Category;

  //-------------model definiton for Pet-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.Pet = function(){
    this.name = 'Pet';

    this.schema = {
      'id' : {
        type     : 'long',
        optional : false
      }, 
      'category' : {
        type     : 'Category *',
        optional : false
      }, 
      'name' : {
        type     : 'string',
        optional : false
      }, 
      'photoUrls' : {
        type     : 'string[]',
        optional : false
      }, 
      'tags' : {
        type     : 'Tag *[]',
        optional : false
      }, 
      'status' : {
        type     : 'Status ',
        optional : false
      }
    };
    /**
    * @property {long id]
    * @property {Category * category]
    * @property {string name]
    * @property {string[] photoUrls]
    * @property {Tag *[] tags]
    * @property {Status  status]
    **/
    this.attributes = {
      'id'                            : null, 
      'category'                      : null, 
      'name'                          : null, 
      'photoUrls'                     : null, 
      'tags'                          : null, 
      'status'                        : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.Pet.prototype = new MagnetJS.Model();
  MagnetJS.Models.Pet.prototype.constructor = MagnetJS.Models.Pet;

  //-------------model definiton for Tag-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.Tag = function(){
    this.name = 'Tag';

    this.schema = {
      'id' : {
        type     : 'long',
        optional : false
      }, 
      'name' : {
        type     : 'string',
        optional : false
      }
    };
    /**
    * @property {long id]
    * @property {string name]
    **/
    this.attributes = {
      'id'                            : null, 
      'name'                          : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.Tag.prototype = new MagnetJS.Model();
  MagnetJS.Models.Tag.prototype.constructor = MagnetJS.Models.Tag;

  //-------------model definiton for Order-------------
  /**
  * @constructor
  * @memberof MagnetJS.Models
  * @extends MagnetJS.Model
  * @param {object} [attributes] A key-value pair of attributes to be assigned to this Model.
  * @param {boolean} [doValidate] If enabled, validate attributes before set. Default is disabled.
  */
  MagnetJS.Models.Order = function(){
    this.name = 'Order';

    this.schema = {
      'id' : {
        type     : 'long',
        optional : false
      }, 
      'petId' : {
        type     : 'long',
        optional : false
      }, 
      'quantity' : {
        type     : 'int',
        optional : false
      }, 
      'shipDate' : {
        type     : 'date',
        optional : false
      }, 
      'status' : {
        type     : 'Status1 ',
        optional : false
      }, 
      'complete' : {
        type     : 'BOOL',
        optional : false
      }
    };
    /**
    * @property {long id]
    * @property {long petId]
    * @property {int quantity]
    * @property {date shipDate]
    * @property {Status1  status]
    * @property {BOOL complete]
    **/
    this.attributes = {
      'id'                            : null, 
      'petId'                         : null, 
      'quantity'                      : null, 
      'shipDate'                      : null, 
      'status'                        : null, 
      'complete'                      : null
    }
    MagnetJS.Model.apply(this, arguments);
  };
  MagnetJS.Models.Order.prototype = new MagnetJS.Model();
  MagnetJS.Models.Order.prototype.constructor = MagnetJS.Models.Order;


})(this['MagnetJS'] || exports, typeof module !== 'undefined' && module.exports && typeof window === 'undefined');