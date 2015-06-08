
/* HELPERS */

// custom backbone sync function to use magnet entity model
function syncOverride(mc, eventPubSub){
    Backbone.sync = function(method, model, options){
//        console.log('syncOverride -> Backbone.sync');
        var qsStr = '', relationship = '', uModel = {}, relations = [];
        var url = model.urlRoot;
        var entity = url;
        if(model.attributes){
            // handle models
            var magnetId = model.attributes.magnetId;
            // build an entity object, removing empty properties and relationship properties
            if(model.data){
                if(model.data.relations){
                    relations = model.data.relations;
                }
            }
            $.each(model.attributes, function(key, val){
//                console.log(key + ': ' + val);
                if($.trim(val) != '' && key != 'curPublished' && key != 'appVersions' && key != 'image'&& key != 'id' && key != 'icon' && key != 'dataUrl' && key != 'binaryURL' && key != 'dndtitle' && $.inArray(key, relations) == -1){
                    uModel[key] = val;
                }
            });
        }else{
            // handle collections
        }
        // handle url parameters
        if(options.data){
            if( options.data.userId ) {
                qsStr += 'userId=' + options.data.userId;
            }
        }
//        console.log('syncOverride -> Backbone.sync -> method: ' + method);
//        console.log('syncOverride -> Backbone.sync -> url: ' + url);
        switch(method){
            case 'read':
//                console.log('syncOverride -> Backbone.sync -> method: ' + method);
//                console.log('url: ' + url);
//                console.log('qsStr: ' + qsStr);
//                console.log('options.data: ');
//                console.log(options.data);
//                console.log('qsStr: ' + qsStr);
                mc.get(url, magnetId, qsStr, options.data, function(data, status, xhr){
                    if(typeof options.success === typeof Function){
                        options.success(data, status, xhr);
                    }
                }, function(xhr, ajaxOptions, thrownError){
                    if(typeof options.error === typeof Function){
                        options.error(xhr, ajaxOptions, thrownError);
                    }
                }, entity);
                break;
            case 'delete':
                mc.remove(url, magnetId, function(data, status, xhr){
                    if(typeof options.success === typeof Function){
                        options.success(data, status, xhr);
                    }
                }, function(xhr, ajaxOptions, thrownError){
                    if(typeof options.error === typeof Function){
                        options.error(xhr, ajaxOptions, thrownError);
                    }
                });
                break;
            case 'update':
                mc.update(url, magnetId, uModel, function(data, status, xhr){
                    if(typeof options.success === typeof Function){
                        options.success(data, status, xhr);
                    }
                }, function(xhr, ajaxOptions, thrownError){
                    if(typeof options.error === typeof Function){
                        options.error(xhr, ajaxOptions, thrownError);
                    }
                });
                break;
            case 'create':
//                console.log('uModel: ');
//                console.log(uModel);
                mc.create(url, uModel, function(data, status, xhr){
                    if ( _.isObject(data) ) {
                        if ( data.success ) {                            
                            if(typeof options.success === typeof Function){
                                if ( data.app ) {
                                    options.success(data.app, status, xhr);
                                } else if ( data.userInfo ) {
                                    options.success(data.userInfo, status, xhr);
                                } else if ( data.userGroupInfo ) {
                                    options.success(data.userGroupInfo, status, xhr);
                                } else if ( data.category ) {
                                    options.success(data.category, status, xhr);
                                } else {
                                    options.success(model, status, xhr);
                                }
                            }
                        } else {
                            if(typeof options.error === typeof Function){
                                options.error(data);
                            }
                        }
                    }
                }, function(xhr, ajaxOptions, thrownError){
                    if(typeof options.error === typeof Function){
                        options.error(xhr, ajaxOptions, thrownError);
                    }
                });
                break;
        }
    };
}
// magnet query class
function ModelConnector(httpreq){
    this.httpreq = httpreq;
    this.queries = {};
}
ModelConnector.prototype.get = function(path, id, qs, params, callback, failback, entity){
//    console.log('ModelConnector.prototype.get');
//    console.log('parh: ' + path);
//    console.log('id: ' + id);
//    console.log('params: ');
//    console.log(params);
    var me = this;
    var url = path + ( '' != qs ? '?' + qs : '' );
    // add a unique timestamp to prevent 304 Not Modified caching of dynamic data under IE only
    if($.browser.msie){
        var timestamp = new Date().getTime();
        url += (url.indexOf('?') != -1 ? '&' : '?')+'_='+timestamp;
    }
    me.query(url, 'GET', {}, function(response, status, xhr){
        window.RESPONSE = response;
        var result = {}, data = {}, models = [];
        if ( _.isObject(response) ) {
            if( response.success ){
                data = response.data;
                if ( data.apps ) {
                    $.each(data.apps, function(i, obj){
                        models.push(obj);
                    });
                    result = {data:models, params:params || undefined};
                } else if ( data.usersInfo ) {
                    $.each(data.usersInfo, function(i, obj){
                        models.push(obj);
                    });
                    result = {data:models, params:params || undefined};
                } else if ( data.appgroups ) {
                    $.each(data.appgroups, function(i, obj){
                        models.push(obj);
                    });
                    result = {data:models, params:params || undefined};
                } else if ( data.apptags ) {
                    $.each(data.apptags, function(i, obj){
                        models.push(obj);
                    });
                    result = {data:models, params:params || undefined};
                } else {
                    result = data;
                }
                if ( _.isFunction(callback) ) {
                    callback(result, status, utils.convertHeaderStrToObj(xhr));
                }
            } else if ( _.isFunction(failback) ) {
                failback(response);
            }
        }
    }, undefined, undefined, function(xhr, ajaxOptions, thrownError){
        if(typeof failback === typeof Function){
            failback(xhr, ajaxOptions, thrownError);
        }
    });
}
// not used - instead, read operations via REST are accessed using _magnet_relation
ModelConnector.prototype.getRelationship = function(path, id, rel, callback){
    this.query(path+'/'+id+'/'+rel+'?_magnet_select=*', 'GET', {}, function(data, status, xhr){
        if(typeof callback === typeof Function){
            var result = {};
            if(data.page){
                var models = [];
                $.each(data.page, function(i, obj){
                    obj.magnetId = obj['magnet-uri'].slice(obj['magnet-uri'].lastIndexOf('/')+1);
                    obj.id = obj.magnetId.slice(obj.magnetId.lastIndexOf(':')+1);
                    models.push(obj);
                });
                result[rel] = models;
            }else{
                data.magnetId = data['magnet-uri'].slice(data['magnet-uri'].lastIndexOf('/')+1);
                result[rel] = data;
                result[rel].magnetId = data['magnet-uri'].slice(data['magnet-uri'].lastIndexOf('/')+1);
                result[rel].id = data['magnet-uri'].slice(data['magnet-uri'].lastIndexOf(':')+1);
            }
            callback(result, status, utils.convertHeaderStrToObj(xhr));
        }
    });
}
ModelConnector.prototype.remove = function(path, id, callback, failback){
    this.query(path+'/'+id, 'DELETE', {}, function(data, status, xhr){
        if(typeof callback === typeof Function){
            callback(data, status, utils.convertHeaderStrToObj(xhr));
        }
    }, undefined, undefined, function(xhr, ajaxOptions, thrownError){
        if(typeof failback === typeof Function){
            failback(xhr, ajaxOptions, thrownError);
        }
    });
}
ModelConnector.prototype.update = function(path, id, obj, callback, failback){
    this.query(path+'/'+id, 'PUT', obj, function(data, status, xhr){
        if(typeof callback === typeof Function){
            callback(data, status, utils.convertHeaderStrToObj(xhr));
        }
    }, undefined, undefined, function(xhr, ajaxOptions, thrownError){
        if(typeof failback === typeof Function){
            failback(xhr, ajaxOptions, thrownError);
        }
    });
}
ModelConnector.prototype.create = function(path, obj, callback, failback){
    this.query(path, 'POST', obj, function(data, status, xhr){
        if(typeof callback === typeof Function){
            callback(data, status, utils.convertHeaderStrToObj(xhr));
        }
    }, undefined, undefined, function(xhr, ajaxOptions, thrownError){
        if(typeof failback === typeof Function){
            failback(xhr, ajaxOptions, thrownError);
        }
    });
}
ModelConnector.prototype.createRelationship = function(path, id, rel, obj, callback){
    this.query(path+'/'+id+'/'+rel, 'POST', obj, function(data, status, xhr){
        if(typeof callback === typeof Function){
            callback(data, status, utils.convertHeaderStrToObj(xhr));
        }
    });
}
ModelConnector.prototype.query = function(uri, method, data, callback, returnType, contentType, failback, headers){
    var headerAry = [];
    if($.isArray(headers)){
        headerAry = headerAry.concat(headers);
    }
    this.httpreq.call(uri, method, returnType || 'json', contentType || 'application/json', data, function(result, status, xhr){
        if(typeof callback === typeof Function){
            callback(result, status, xhr);
        }
    }, function(xhr, ajaxOptions, thrownError){
        if(typeof failback === typeof Function){
            failback(xhr, ajaxOptions, thrownError);
        }
    }, headerAry);
}
ModelConnector.prototype.getAPNSCertStatus = function(){
    var me = this;
    if(!me.getAPNSCertStatusOK){
        me.query('MDMAPNSCertificateStatus', 'GET', null, function(res){
            me.getAPNSCertStatusOK = true;
            var msg = '';
            switch(res){
                case 'NOTFOUND':
                    msg = '<div class="alert alert-info">\
                      <strong>Note:</strong> Your iOS APNS certificate is missing. To obtain a valid certificate, login\
                      to the <a href="https://developer.apple.com/" target="_blank">Apple Member Center</a> and follow their<br /> instructions to generate the\
                      certificate. Once you have obtained the certificate, place the file into the Magnet MES config.dir directory<br /> and\
                      restart the server.\
                      </div>';
                    break;
                case 'SECURITYEXCEPTION':
                    msg = '<div class="alert alert-info">\
                      <strong>Note:</strong> There was a security exception attempting to access your iOS APNS certificate. Change the file properties of the\
                      iOS APNS certificate to allow reading, then restart the server for the changes to be applied.\
                      </div>';
                    break;
                case 'EXPIRED':
                    msg = '<div class="alert alert-info">\
                      <strong>Note:</strong> Your iOS APNS certificate has expired. To obtain a valid certificate, login to the <a href="https://developer.apple.com/" target="_blank">Apple Member Center</a>\
                      and follow their<br /> instructions to generate the certificate. Once you have obtained the certificate, place the file into the Magnet MES\
                      config.dir directory<br /> and restart the server.\
                      </div>';
                    break;
                case 'NOTYETVALID':
                    msg = '<div class="alert alert-info">\
                      <strong>Note:</strong> Your iOS APNS certificate is not valid because the current date is not within the alloted range. To obtain a valid\
                      certificate, login to the <a href="https://developer.apple.com/" target="_blank">Apple Member Center</a> and follow their<br /> instructions\
                      to generate the certificate. Once you have obtained the certificate, place the file into the Magnet MES config.dir directory<br /> and restart the server.\
                      </div>';
                    break;
                default:
                    msg = '';
                    break;
            }
            document.getElementById('apns-certificate-notification').innerHTML = msg;
        }, 'text', 'text/plain', function(){
            me.getAPNSCertStatusOK = true;
        });
    }
}
ModelConnector.prototype.appStoreCommand = function(params){
    var me = this;
    me.query("numberOfAppStoreApps", "GET", null, function(res) {
          params.success(res);
    });

}

ModelConnector.prototype.batchCommand = function(params){
    var me = this;
    me.query(params.command, params.method, params.data, function(res){
        if(typeof params.success == typeof Function){
            params.success();
        }
    }, undefined, 'application/json', function(xhr, ajaxOptions, thrownError){
        if(typeof params.error == typeof Function){
            params.error(xhr, ajaxOptions, thrownError);
        }
    });
}
// include magnetId into the relationship entity data
ModelConnector.prototype.appendIds = function(obj, params){
    if(!$.isEmptyObject(params)){
        if(params.relations){
            $.each(params.relations, function(i, relation){
                if($.isArray(obj[relation])){
                    $.each(obj[relation], function(j, entity){
                        entity.magnetId = entity['magnet-uri'].slice(entity['magnet-uri'].lastIndexOf('/')+1);
                    });
                }else if(typeof obj[relation] === 'object' && obj[relation] != null){
                    obj[relation].magnetId = obj[relation]['magnet-uri'].slice(obj[relation]['magnet-uri'].lastIndexOf('/')+1);
                }
            });
        }
    }
}
// wrap jquery ajax function to reduce redundant code
function HTTPRequest(baseUrl){
    this.baseUrl = baseUrl;
    this.timeouts = 0;
}
HTTPRequest.prototype.call = function(loc, method, dataType, contentType, data, callback, failback, headers){
    var me = this;
    var dataStr = null;
    if(!$.isEmptyObject(data) && (contentType == 'application/json' || contentType == 'text/uri-list')){
        dataStr = JSON.stringify(data);
    }else{
        dataStr = data;
    }
    $.ajax({
        type        : method,
        url         : me.baseUrl+loc,
        dataType    : dataType,
        contentType : contentType,
        data        : dataStr,
        beforeSend  : function(xhr){
            if(headers){
                $.each(headers, function(i , header){
                    xhr.setRequestHeader(header.name, header.val);
                });
            }
        }
    }).done(function(result, status, xhr){
            me.timeouts = 0;
            if(typeof callback === typeof Function){
                callback(result, status, xhr);
            }
        }).fail(function(xhr, status, thrownError){
            
        });
    return false;
}
// basic HTML5 upload component - Firefox, Google Chrome and Safari ONLY - not used
function uploader(id, url, property, type){
    var file = document.getElementById(id).files[0];
    uploadFile(file);
    function uploadFile(file){
        var reader = new FileReader();
        reader.onload = (function(theFile){
            return function(evt){
                AJAX(evt, file);
            };
        }(file));
        reader.readAsArrayBuffer(file);
    }
    function AJAX(evt, file){
        var xhr = new XMLHttpRequest();
        xhr.open("put", url+'/'+property, true);
        if(file.type != ''){
            type = file.type;
        }
        xhr.setRequestHeader("Content-Type", type);
        xhr.send(evt.target.result);
    }
}
// cookies
var Cookie = {
    findAll: function() {
        var cookies = {};
        _(document.cookie.split(';'))
            .chain()
            .map(function(m) {
                return m.replace(/^\s+/, '').replace(/\s+$/, '');
            })
            .each(function(c) {
                var arr = c.split('='),
                    key = arr[0],
                    value = null;
                var size = _.size(arr);
                if (size > 1) {
                    value = arr.slice(1).join('');
                }
                cookies[key] = value;
            });
        return cookies;
    },

    find: function(name) {
        var cookie = null,
            list = this.findAll();

        _.each(list, function(value, key) {
            if (key === name) cookie = value;
        });
        return cookie;
    },

    create: function(name, value, time) {
        var today = new Date(),
            offset = (typeof time == 'undefined') ? (1000 * 60 * 60 * 24) : (time * 1000),
            expires_at = new Date(today.getTime() + offset);

        var cookie = _.map({
            name: encodeURIComponent(value),
            expires: expires_at.toGMTString(),
            path: '/'
        }, function(value, key) {
            return [(key == 'name') ? name : key, value].join('=');
        }).join(';');

        document.cookie = cookie;
        return this;
    },

    destroy: function(name, cookie) {
        if (cookie = this.find(name)) {
            this.create(name, null, -1000000);
        }
        return this;
    }
};
// utility functions
timer = {
    loops : {},
    poll : function(action, delay, id){
        var me = this;
        me.loops[id] = me.loops[id] || {};
        me.interval(action, delay, id);
        me.loops[id].timer = setInterval(function(){
            if(!me.loops[id].paused){
                me.interval(action, delay, id);
            }
        }, delay+1000);
    },
    interval : function(action, delay, id){
        var me = this;
        var cls = id.replace('#', '');
        ctr = (delay/1000) - 1;
        clearInterval(me.loops[id].ctr);
        me.loops[id].paused = true;
        action(me.loops[id]);
        me.loops[id].ctr = setInterval(function(){
            var html = 'refreshing content in ';
            var min = Math.floor(ctr/60);
            var sec = ctr-min*60;
            if(min > 0){
                html += min+' minutes and ';
            }
            html += sec+' seconds <button class="btn '+cls+'">Refresh</button>';
            $(id).html(html);
            $('.'+cls).click(function(){
                $(id).html('Refreshing <img src="images/ajax-loader-sm.gif" />');
                me.stop(id);
                me.poll(action, delay, id);
            });
            ctr -= 1;
            if(ctr < 0){
                $(id).html('Refreshing <img src="images/ajax-loader-sm.gif" />');
            }
        }, 1000);
    },
    stop : function(id){
        if(!id){
            $.each(this.loops, function(i, loop){
                clearInterval(loop.timer);
                clearInterval(loop.ctr);
            });
        }else{
            clearInterval(this.loops[id].timer);
            clearInterval(this.loops[id].ctr);
        }
    }
}
function ListViewWidget(eventPubSub){
    this.eventPubSub = eventPubSub;
}
ListViewWidget.prototype.initListView = function(params){
    switch(params.type){
        case 'users' : return this.initUserListView(params); break;
        case 'mobile_devices' : this.initDeviceListView(params); break;
        case 'apps' : this.initAppListView(params); break;
        case 'securitygroups' : this.initGroupListView(params); break;
        case 'app-categories' :  return this.initCategoryListView(params);
        case 'unmanaged-apps' :  return this.initUnrestrictedAppListView(params);
        case 'log-event-records' : this.initHistoryListView(params); break;
    }
}
ListViewWidget.prototype.initUserListView = function(params){
    var col = this.cols.UserCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    this.eventPubSub.trigger('initListView', {
        el         : params.el || '#user-list',
        col        : new col(),
        headers    : this.metadata[params.type].criteria.searchby.attrs,
        searchBy   : 'name',
        data       : params.data || undefined,
        hideSearch : params.hideSearch,
        selectable : params.selectable,
        commands   : this.metadata[params.type].criteria.commands,
        root       : params.type,
        pageSize    : 100
    });
    this.eventPubSub.trigger("initInfoView", {
        title : 'User Information',
        data  : {relations:['mobile_devices', 'securityGroups']},
        tmpl  : 'basicUserInfo',
        root  : params.type
    });
}
ListViewWidget.prototype.initDeviceListView = function(params){
    var col = this.cols.DeviceCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    params.data = params.data || {};
    params.data.relations = ['user'];
    this.eventPubSub.trigger('initListView', {
        el         : params.el || 'device-list',
        col        : new col(),
        headers    : this.metadata[params.type].criteria.searchby.attrs,
        searchBy   : 'modelInfo',
        data       : params.data || undefined,
        hideSearch : params.hideSearch
    });
    this.eventPubSub.trigger("initInfoView", {
        title : 'Device Information',
        tmpl  : 'basicDeviceInfo',
        root  : params.type
    });
}
ListViewWidget.prototype.initAppListView = function(params){
    var col = this.cols.AppCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    this.eventPubSub.trigger('initListView', {
        el         : params.el || '#all-apps',
        col        : new col(),
        headers    : this.metadata[params.type].criteria.searchby.attrs,
        searchBy   : 'title',
        data       : params.data || undefined,
        hideSearch : params.hideSearch,
        callback    : params.callback
    });
    this.eventPubSub.trigger("initInfoView", {
        title : 'App Information',
        tmpl  : 'basicAppInfo',
        root  : params.type
    });
}
ListViewWidget.prototype.initGroupListView = function(params){
    var col = this.cols.SecurityGroupCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    this.eventPubSub.trigger('initListView', {
        el          : params.el || '#group-list',
        col         : new col(),
        headers     : this.metadata[params.type].criteria.searchby.attrs,
        searchBy    : 'name',
        data        : params.data || undefined,
        hideSearch  : params.hideSearch,
        disableInfo : true,
        selectable  : params.selectable,
        commands    : this.metadata[params.type].criteria.commands,
        root        : params.type
    });
}
ListViewWidget.prototype.initCategoryListView = function(params){
    var me = this;
    var col = me.cols.AppCategoryCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    var categories = new col();
    me.eventPubSub.trigger('initListView', {
        el         : params.el || '#category-list',
        col        : categories,
        headers    : this.metadata[params.type].criteria.searchby.attrs,
        searchBy   : 'name',
        data       : params.data || undefined,
        hideSearch : params.hideSearch
    });
    me.eventPubSub.trigger("initInfoView", {
        title : 'Category Information',
        tmpl  : 'basicCategoryInfo',
        root  : params.type,
        btns  : [
            {"selector":"info-category-delete", "pubSubEvent":"deleteCategory"},
            {"selector":"info-category-update", "pubSubEvent":"updateCategory"}
        ],
        onShow : function(){
            // create web component for category icon upload
            var uploader = new me.cols.UploadView({
                el          : '#category-icon-replace',
                context     : 'CategoryIconReplace',
                method      : 'PUT',
                validation  : {
                    allowedExtensions : ['png', 'jpg', 'bmp', 'gif']
                },
                eventPubSub : me.eventPubSub
            });
        }
    });
    return categories;
}
ListViewWidget.prototype.initUnrestrictedAppListView = function(params){
    var me = this;
    var col = me.cols.UnrestrictedAppCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    var apps = new col();
    me.eventPubSub.trigger('initListView', {
        el         : params.el || '#unmanaged-app-list',
        col        : apps,
        headers    : this.metadata[params.type].criteria.searchby.attrs,
        searchBy   : 'title',
        data       : params.data || undefined,
        hideSearch : params.hideSearch
    });
    me.eventPubSub.trigger("initInfoView", {
        title : 'Unrestricted App Information',
        tmpl  : 'basicUnrestrictedAppInfo',
        root  : params.type,
        btns  : [
            {"selector":"info-unmanaged-app-delete", "pubSubEvent":"deleteUnrestrictedApp"},
            {"selector":"info-unmanaged-app-update", "pubSubEvent":"updateUnrestrictedApp"}
        ]
    });
    return apps;
}
ListViewWidget.prototype.initHistoryListView = function(params){
    var col = this.cols.HistoryCollection;
    if(params.data && params.data.relationship){
        col = params.data.relationship.col;
    }
    this.eventPubSub.trigger('initListView', {
        el          : params.el || '#event-log-list',
        col         : new col(),
        headers     : this.metadata[params.type].criteria.searchby.attrs,
        searchBy    : 'message',
        disableInfo : true,
        sortDefault : {'property':'timestamp', 'order':'desc'},
        data        : params.data || undefined,
        hideSearch  : params.hideSearch
    });
}
ListViewWidget.prototype.setMetadata = function(){
    this.metadata = {
        'users': {
            name     : 'Users',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        primaryEmailAddress : 'Email Address',
                        name                : 'Name'
                    }
                },
                belongstogroup : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to Group',
                    search      : true,
                    placeholder : 'Name of Group',
                    property    : 'name',
                    col         : this.cols.SecurityGroupCollection
                },
                commands : {
                    activateUserList : {
                        name    : 'Send Activation Email',
                        command : 'activateUserList',
                        method  : 'POST'
                    }
                }
            }
        },
        'mobile_devices': {
            name     : 'Devices',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        modelInfo  : 'Model',
                        osVersion  : 'OS/Vender Details',
                        carrier    : 'Carrier Info',
                        deviceType : 'Device Type',
                        status     : 'Status',
                        _relation  : {
                            path  : ['user', 'name'],
                            mapTo : 'userName',
                            title : 'User'
                        }
                    }
                },
                belongstouser : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to User',
                    search      : true,
                    placeholder : 'Name of User',
                    property    : 'name',
                    col         : this.cols.UserCollection
                }
            }
        },
        'apps': {
            name     : 'Apps',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        title       : 'Title',
                        description : 'Description',
                        publisher   : 'Publisher'
                    }
                },
                belongstocat : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to Category',
                    search      : true,
                    placeholder : 'Name of Category',
                    property    : 'name',
                    col         : this.cols.AppCategoryCollection
                }
                /*,
                 belongstouser : {
                 baseType    : 'belongsto',
                 name        : 'Installed By',
                 search      : true,
                 placeholder : 'Name of User',
                 property    : 'name',
                 col         : this.cols.UserCollection
                 }
                 */
            }
        },
        'securitygroups': {
            name     : 'Groups',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        name              : 'Name',
                        distinguishedName : 'Distinguished Name',
                        description       : 'Description'
                    }
                },
                belongstouser : {
                    baseType    : 'belongsto',
                    name        : 'Which Contain User',
                    baseRel     : 'securityGroups',
                    search      : true,
                    placeholder : 'Name of User',
                    property    : 'name',
                    col         : this.cols.UserCollection
                },
                commands : {
                    activateGroupList : {
                        name    : 'Send Activation Email',
                        command : 'activateGroupList',
                        method  : 'POST'
                    }
                }
            }
        },
        'app-categories': {
            name     : 'Categories',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        name        : 'Title',
                        description : 'Description',
                        locale      : 'Locale'
                    }
                },
                belongstoapp : {
                    baseType    : 'belongsto',
                    name        : 'Which Contain App',
                    baseRel     : 'categories',
                    search      : true,
                    placeholder : 'App Title',
                    property    : 'title',
                    col         : this.cols.AppCollection
                }
            }
        },
//        'unmanaged-apps': {
//            name     : 'Unrestricted Apps',
//            criteria : {
//                searchby : {
//                    baseType : 'searchby',
//                    name     : 'Search by Property',
//                    input    : true,
//                    attrs    : {
//                        title               : 'Title',
//                        supportedDeviceType : 'Device Type',
//                        publisher           : 'Publisher'
//                    }
//                }
//            }
//        },
        'log-event-records': {
            name     : 'History',
            criteria : {
                searchby : {
                    baseType : 'searchby',
                    name     : 'Search by Property',
                    input    : true,
                    attrs    : {
                        timestamp : 'Time Stamp',
                        message   : 'Event'
                    }
                },
                belongstouser : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to User',
                    search      : true,
                    placeholder : 'Name of User',
                    property    : 'name',
                    col         : this.cols.UserCollection
                },
                belongstodevice : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to Device',
                    search      : true,
                    placeholder : 'Device Model#',
                    property    : 'modelInfo',
                    col         : this.cols.DeviceCollection
                },
                belongstoapp : {
                    baseType    : 'belongsto',
                    name        : 'Belonging to App',
                    search      : true,
                    placeholder : 'App Title',
                    property    : 'title',
                    col         : this.cols.AppCollection
                }
            }
        }
    }
}
var utils = {
    isAndroid : /(Android)/g.test(navigator.userAgent),
    isIOS : /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
    isMobile : /(Android|iPad|iPhone|iPod)/g.test(navigator.userAgent),
    baseUrl : window.location.href.replace(window.location.hash, '').substr(0, window.location.href.replace(window.location.hash, '').lastIndexOf('/')),
    txtDefaults : function(sel){
        $(sel).focus(function(){
            if(this.value == this.defaultValue){
                this.value = '';
                $(this).css('color', '#000');
            }
        }).blur(function(){
                if(this.value == ''){
                    this.value = this.defaultValue;
                    $(this).css('color', '#555');
                }
            })
    },
    strToObj : function(str){
        var obj = {};
        if(str !== undefined){
            var ary = str.split(' ');
            $.each(ary, function(i, val){
                obj[val] = val;
            });
        }
        return obj;
    },
    getAttributes : function(obj){
        var attributes = {};
        if(!$.isEmptyObject(obj) && obj[0] !== undefined){
            $.each(obj[0], function(name, val){
                attributes[name] = name;
            });
        }
        return attributes;
    },
    getValidJSON : function(str){
        try{
            str = $.parseJSON(str);
        }catch(e){
            return false;
        };
        return str;
    },
    getValidXML : function(str){
        try{
            str = $.parseXML(str);
        }catch(e){
            return false;
        };
        return str;
    },
    convertHeaderStrToObj : function(xhr){
        var dataObj = {};
        $.each(xhr, function(i, val){
            if(($.type(val) == 'string' || $.type(val) == 'number')  && i != 'responseText'){
                dataObj[i] = val;
            }
        });
        $.each(xhr.getAllResponseHeaders().split('\n'), function(i, line){
            var ary = $.trim(line).split(': ');
            if(ary.length > 1){
                dataObj[ary[0]] = ary[1];
            }
        });
        return dataObj;
    },
    getInfoHeader : function(str){
        var hdrAry = str.split(','), obj = {};
        $.each(hdrAry, function(i, val){
            var ary = Base64.decode($.trim(val)).match(/([^ ]*) (.*)/);
            if(ary != null){
                obj[ary[1]] = ary[2];
            }
        });
        return obj;
    },
    toISO8601 : function(d){
        function pad(n){return n<10 ? '0'+n : n}
        return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z';
    },
    ISO8601ToDT: function(str){
        var date = new Date(str);
        if(isNaN(date)){
            date = this.fromISO8601(str);
        }
        var yyyy = date.getFullYear();
        var mm = this.formatDT(date.getMonth()+1);
        var dd = this.formatDT(date.getDate());
        var hh = this.formatDT(date.getHours());
        var m = this.formatDT(date.getMinutes());
        var ss = this.formatDT(date.getSeconds());
        dt = mm+'-'+dd+'-'+yyyy+' '+hh+':'+m+':'+ss;
        return dt;
    },
    formatDT: function(str){
        return str < 10 ? '0'+str : str;
    },
    fromISO8601: function(s){
        var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
        var d = [];
        d = s.match(re);
        if(!d){
            throw "Couldn't parse ISO 8601 date string '" + s + "'";
        }
        var a = [1,2,3,4,5,6,10,11];
        for(var i in a){
            d[a[i]] = parseInt(d[a[i]], 10);
        }
        d[7] = parseFloat(d[7]);
        var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);
        if(d[7] > 0){
            ms += Math.round(d[7] * 1000);
        }
        if(d[8] != "Z" && d[10]){
            var offset = d[10] * 60 * 60 * 1000;
            if(d[11]){
                offset += d[11] * 60 * 1000;
            }
            if(d[9] == "-"){
                ms -= offset;
            }else{
                ms += offset;
            }
        }
        return new Date(ms);
    },
    getCurrentTime : function(isRand){
        var now    = new Date();
        var hour   = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var ap = 'AM';
        if (hour   > 11) { ap = 'PM';             }
        if (hour   > 12) { hour = hour - 12;      }
        if (hour   == 0) { hour = 12;             }
        if (hour   < 10) { hour   = '0' + hour;   }
        if (minute < 10) { minute = '0' + minute; }
        if (second < 10) { second = '0' + second; }
        return isRand ? hour+minute+second+ap : hour+':'+minute+':'+second+' '+ap;
    },
    cleanChar : function(str){
        return str.replace(/[^a-zA-Z0-9]+/g, '');
    },
    htmlEncode : function(str){
        if(str){
            return $('<div />').text(str).html().replace(/&nbsp;/g, " ");
        }else{
            return '';
        }
    },
    htmlDecode : function(str){
        if(str){
            return $('<div />').html(str).text();
        }else{
            return '';
        }
    },
    isNumeric : function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    highLightJSON : function(str){
        if(str === undefined || str === null){
            return '';
        }
        if(typeof str != 'string'){
            str = JSON.stringify(str, null, 6);
        }
        str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match){
            var cls = 'number';
            if(/^"/.test(match)){
                cls = /:$/.test(match) ? 'key' : 'string';
            }else if(/true|false/.test(match)){
                cls = 'boolean';
            }else if(/null/.test(match)){
                cls = 'null';
            }
            return '<span class="SYN'+cls+'">'+match+'</span>';
        });
    },
    fixImgContent: function(content) {
        if ( (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/).test(content) ) {            
            return 'data:image/png;base64,' + content;
        }
        return false;
    },
    getAmPmTime: function(longTime, minutes) {
        var hours = null, res = 'AM', dt = new Date();
        
        if ( longTime ) {
            dt = new Date(longTime); 
        }
        
        hours = dt.getHours();
        
        if ( hours == 0 ) {
            hours = 12;
        } else if ( hours > 12 ) {
            hours = hours % 12;
            res = 'PM';
        }
        
        if ( minutes ) {
            hours += ':' + this.formatDT(dt.getMinutes()) + ' ';
        }
        
        return  hours + res;       
    },
    firstUpCase: function(str) {
        str = str || '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}