/**
* Generated by Magnet Codegen tool version 2.3.0
*/

(function(exports, isNode){ var MagnetJS = isNode ? require('../../target/magnet-sdk') : exports;

  //-------------service definition for Store-------------
  /**
  * @extends MagnetJS.Controller
  * @memberof MagnetJS.Controllers
  * @constructor
  */
  MagnetJS.Controllers.Store = function(){};
  MagnetJS.Controllers.Store.prototype = new MagnetJS.Controller('Store');
  MagnetJS.Controllers.Store.prototype.constructor = MagnetJS.Controllers.Store;

  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Store.deleteOrder.
  * @typedef {function} Store-deleteOrder
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Store
  * @param {object} data The request data.
  * @param {string} data.orderId
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Store-deleteOrder} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Store.prototype.deleteOrder = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'deleteOrder',
        path       : '/v2/store/order/{orderId}',
        method     : 'DELETE',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "orderId" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Store.getInventory.
  * @typedef {function} Store-getInventory
  * @param {NSDictionary *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Store
  * @param {object} data The request data.
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Store-getInventory} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Store.prototype.getInventory = function(options){
    return MagnetJS.Method.call(this, null, options, {
      params : {
        name       : 'getInventory',
        path       : '/v2/store/inventory',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'NSDictionary *'
      },
      schema : {
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Store.getOrderById.
  * @typedef {function} Store-getOrderById
  * @param {Order *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Store
  * @param {object} data The request data.
  * @param {string} data.orderId
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Store-getOrderById} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Store.prototype.getOrderById = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'getOrderById',
        path       : '/v2/store/order/{orderId}',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'Order *'
      },
      schema : {
        "orderId" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Store.placeOrder.
  * @typedef {function} Store-placeOrder
  * @param {Order *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Store
  * @param {object} data The request data.
  * @param {Order *} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Store-placeOrder} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Store.prototype.placeOrder = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'placeOrder',
        path       : '/v2/store/order',
        method     : 'POST',
        produces   : ['application/json', 'application/xml'],
        returnType : 'Order *'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'Order *',
           optional : true
        }
      }
    });
  };

  //-------------service definition for Pet-------------
  /**
  * @extends MagnetJS.Controller
  * @memberof MagnetJS.Controllers
  * @constructor
  */
  MagnetJS.Controllers.Pet = function(){};
  MagnetJS.Controllers.Pet.prototype = new MagnetJS.Controller('Pet');
  MagnetJS.Controllers.Pet.prototype.constructor = MagnetJS.Controllers.Pet;

  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.addPet.
  * @typedef {function} Pet-addPet
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {Pet *} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-addPet} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.addPet = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'addPet',
        path       : '/v2/pet',
        method     : 'POST',
        consumes   : ['application/json', 'application/xml'],
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'Pet *',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.deletePet.
  * @typedef {function} Pet-deletePet
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {string} [data.api_key]
  * @param {long} data.petId
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-deletePet} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.deletePet = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'deletePet',
        path       : '/v2/pet/{petId}',
        method     : 'DELETE',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "api_key" : {
           style    : 'HEADER',
           type     : 'string',
           optional : true
        }, 
        "petId" : {
           style    : 'PATH',
           type     : 'long',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.findPetsByStatus.
  * @typedef {function} Pet-findPetsByStatus
  * @param {Pet *[]} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {string[]} [data.status]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-findPetsByStatus} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.findPetsByStatus = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'findPetsByStatus',
        path       : '/v2/pet/findByStatus',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'Pet *[]'
      },
      schema : {
        "status" : {
           style    : 'QUERY',
           type     : 'string[]',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.findPetsByTags.
  * @typedef {function} Pet-findPetsByTags
  * @param {Pet *[]} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {string[]} [data.tags]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-findPetsByTags} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.findPetsByTags = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'findPetsByTags',
        path       : '/v2/pet/findByTags',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'Pet *[]'
      },
      schema : {
        "tags" : {
           style    : 'QUERY',
           type     : 'string[]',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.getPetById.
  * @typedef {function} Pet-getPetById
  * @param {Pet *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {long} data.petId
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-getPetById} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.getPetById = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'getPetById',
        path       : '/v2/pet/{petId}',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'Pet *'
      },
      schema : {
        "petId" : {
           style    : 'PATH',
           type     : 'long',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.updatePet.
  * @typedef {function} Pet-updatePet
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {Pet *} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-updatePet} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.updatePet = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'updatePet',
        path       : '/v2/pet',
        method     : 'PUT',
        consumes   : ['application/json', 'application/xml'],
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'Pet *',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.updatePetWithForm.
  * @typedef {function} Pet-updatePetWithForm
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {string} data.petId
  * @param {string} [data.name]
  * @param {string} [data.status]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-updatePetWithForm} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.updatePetWithForm = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'updatePetWithForm',
        path       : '/v2/pet/{petId}',
        method     : 'POST',
        consumes   : ['application/x-www-form-urlencoded'],
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "petId" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }, 
        "name" : {
           style    : 'FORM',
           type     : 'string',
           optional : true
        }, 
        "status" : {
           style    : 'FORM',
           type     : 'string',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.Pet.uploadFile.
  * @typedef {function} Pet-uploadFile
  * @param {ApiResponse *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.Pet
  * @param {object} data The request data.
  * @param {long} data.petId
  * @param {string} [data.additionalMetadata]
  * @param {_data} [data.file]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {Pet-uploadFile} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.Pet.prototype.uploadFile = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'uploadFile',
        path       : '/v2/pet/{petId}/uploadImage',
        method     : 'POST',
        consumes   : ['application/x-www-form-urlencoded', 'multipart/form-data'],
        produces   : ['application/json'],
        returnType : 'ApiResponse *'
      },
      schema : {
        "petId" : {
           style    : 'PATH',
           type     : 'long',
           optional : false
        }, 
        "additionalMetadata" : {
           style    : 'FORM',
           type     : 'string',
           optional : true
        }, 
        "file" : {
           style    : 'FORM',
           type     : '_data',
           optional : true
        }
      }
    });
  };

  //-------------service definition for User-------------
  /**
  * @extends MagnetJS.Controller
  * @memberof MagnetJS.Controllers
  * @constructor
  */
  MagnetJS.Controllers.User = function(){};
  MagnetJS.Controllers.User.prototype = new MagnetJS.Controller('User');
  MagnetJS.Controllers.User.prototype.constructor = MagnetJS.Controllers.User;

  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.createUser.
  * @typedef {function} User-createUser
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {User *} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-createUser} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.createUser = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'createUser',
        path       : '/v2/user',
        method     : 'POST',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'User *',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.createUsersWithArrayInput.
  * @typedef {function} User-createUsersWithArrayInput
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {User *[]} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-createUsersWithArrayInput} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.createUsersWithArrayInput = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'createUsersWithArrayInput',
        path       : '/v2/user/createWithArray',
        method     : 'POST',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'User *[]',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.createUsersWithListInput.
  * @typedef {function} User-createUsersWithListInput
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {User *[]} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-createUsersWithListInput} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.createUsersWithListInput = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'createUsersWithListInput',
        path       : '/v2/user/createWithList',
        method     : 'POST',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "body" : {
           style    : 'BODY',
           type     : 'User *[]',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.deleteUser.
  * @typedef {function} User-deleteUser
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {string} data.username
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-deleteUser} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.deleteUser = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'deleteUser',
        path       : '/v2/user/{username}',
        method     : 'DELETE',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "username" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.getUserByName.
  * @typedef {function} User-getUserByName
  * @param {User *} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {string} data.username
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-getUserByName} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.getUserByName = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'getUserByName',
        path       : '/v2/user/{username}',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'User *'
      },
      schema : {
        "username" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.loginUser.
  * @typedef {function} User-loginUser
  * @param {string} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {string} [data.username]
  * @param {string} [data.password]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-loginUser} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.loginUser = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'loginUser',
        path       : '/v2/user/login',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'string'
      },
      schema : {
        "username" : {
           style    : 'QUERY',
           type     : 'string',
           optional : true
        }, 
        "password" : {
           style    : 'QUERY',
           type     : 'string',
           optional : true
        }
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.logoutUser.
  * @typedef {function} User-logoutUser
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-logoutUser} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.logoutUser = function(options){
    return MagnetJS.Method.call(this, null, options, {
      params : {
        name       : 'logoutUser',
        path       : '/v2/user/logout',
        method     : 'GET',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
      }
    });
  };
  /**
  * This callback is fired after a successful call of MagnetJS.Controllers.User.updateUser.
  * @typedef {function} User-updateUser
  * @param {void} response
  * @param {object} details An object containing details of the request, such as HTTP request, response, and status code.
  * @param {boolean} isCached True if the result came from local cache.
  */
  /**
  * @memberof MagnetJS.Controllers.User
  * @param {object} data The request data.
  * @param {string} data.username
  * @param {User *} [data.body]
  * @param {object} options Request options.
  * @param {MagnetJS.CallOptions} [options.callOptions] A CallOptions object.
  * @param {string} [options.callOptions.saveAs] Save to a file. On a Phonegap client, this property designates a filename. On Node.js,
  * this property designates a directory path and filename. Not compatible with Web client.
  * @param {boolean} [options.callOptions.returnRaw] If enabled, return the response as raw data rather than a Model or Collection.
  * @param {User-updateUser} [options.success] Success callback. See Type for return values.
  * @param {ControllerError} [options.error] Error callback. See Type for return values.
  * @returns {MagnetJS.Promise} A MagnetJS.Promise instance.
  */
  MagnetJS.Controllers.User.prototype.updateUser = function(data, options){
    return MagnetJS.Method.call(this, data, options, {
      params : {
        name       : 'updateUser',
        path       : '/v2/user/{username}',
        method     : 'PUT',
        produces   : ['application/json', 'application/xml'],
        returnType : 'void'
      },
      schema : {
        "username" : {
           style    : 'PATH',
           type     : 'string',
           optional : false
        }, 
        "body" : {
           style    : 'BODY',
           type     : 'User *',
           optional : true
        }
      }
    });
  };

})(this['MagnetJS'] || exports, typeof module !== 'undefined' && module.exports && typeof window === 'undefined');