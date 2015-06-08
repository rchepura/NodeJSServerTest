var hasFired = false;
$(document).bind('pageinit', 'body', function(e){
    if(!hasFired){
        App.init();
        hasFired = true;
    }
});

var App = {
    endpointUrl   : 'api',
    Pet  : null,
    Store : null,
    User : null,
    init : function(){
        var me = this;
        MagnetJS.set({
            endpointUrl      : this.endpointUrl,
            storeCredentials : true
        });
        MagnetJS.LoginService.on('Unauthorized', function(){
            me.changePage('#login-screen');
        });
        me.Pet = new MagnetJS.Controllers.Pet();
        me.Store = new MagnetJS.Controllers.Store();
        me.User = new MagnetJS.Controllers.User();
        me.bindUI();
        me.bindViewCreation();
        me.attemptAutoLogin(function(){});
    },
    bindUI : function(){
        var me = this;
        var user = $('#login-user');
        var pass = $('#login-pass');
        $('#login-btn').click(function(){
            me.showLoading();
            MagnetJS.LoginService.login({
                name      : $.trim(user.val()),
                password  : $.trim(pass.val())
            }, {
                success : function(){
                    me.hideLoading();
                    pass.val('');
                    me.changePage('#home-screen');
                },
                error : function(error, details){
                    me.hideLoading();
                    if(error == 'INCORRECT_USERNAME_PASSWORD'){
                        alert('Incorrect username and password combination');
                    }else if(error == 'UNAUTHORIZED' || details.status == 500){
                        alert('You are not authorized to access this application.');
                    }else{
                        alert('Error connecting to the server.');
                    }
                }
            });
        });
        $('#btn-goto-contact-create').click(function(){
            App.changePage('#contact-create');
        });
    },
    changePage : function(id, opts){
        $('body').pagecontainer('change', id, opts);
    },
    showLoading : function(){
        $.mobile.loading('show', {
            text        : 'Please Wait..',
            textVisible : true,
            theme       : 'b',
            html        : ''
        });
    },
    hideLoading : function(){
        $.mobile.loading('hide');
    },
    bindViewCreation : function(){
        var me = this;
        $(document).delegate('#home-screen', 'pageshow', function(){
            $('#contact-view-info img').remove();
            $('#toggle-button-ui').show();
            $('#toggle-search-ui').hide();
            $('#toggle-search-ui input').val('');
        });
    },
    attemptAutoLogin : function(callback){
        var me = this;
        MagnetJS.LoginService.loginWithSavedCredentials({
            success : function(){
                me.changePage('#home-screen');
                callback();
            },
            error : function(){
                App.changePage('#login-screen');
            }
        });
    }
};