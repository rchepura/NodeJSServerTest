var hasFired = false;
$(document).ready(function (e) {
    if (!hasFired) {
        App.init();
        hasFired = true;
    }
});

var App = {
    endpointUrl: '/rest', // the dir with reverse proxy to api-endpointUrl
    Ideacontroller: null,
    Scopes: null,
    Trendcontroller: null,
    Showandtellcontroller: null,
    Usercontroller: null,
    Config: null,
    Topiccontroller: null,
    Echo: null,
    Managercontroller: null,
    init: function () {
        var me = this;
        MagnetJS.set({
            endpointUrl: this.endpointUrl,
            storeCredentials: true
        });

        me.Ideacontroller = new MagnetJS.Controllers.Ideacontroller();
        me.Scopes = new MagnetJS.Controllers.Scopes();
        me.Trendcontroller = new MagnetJS.Controllers.Trendcontroller();
        me.Showandtellcontroller = new MagnetJS.Controllers.Showandtellcontroller();
        me.Usercontroller = new MagnetJS.Controllers.Usercontroller();
        me.Config = new MagnetJS.Controllers.Config();
        me.Topiccontroller = new MagnetJS.Controllers.Topiccontroller();
        me.Echo = new MagnetJS.Controllers.Echo();
        me.Managercontroller = new MagnetJS.Controllers.Managercontroller();

    },
    getAllIdeas: function () {
        this.Ideacontroller.getAllIdeas({
            offset: 0,
            page_size: 20
        }, {
            success: function (ideas) {
                console.log(ideas);
            },
            error: function () {

            }
        });
    },
    getScopeMappings: function () {
        this.Scopes.getScopeMappings({
            success: function (data) {
                console.log(data);
            },
            error: function () {

            }
        });
    },
    getConfig: function () {
        this.Config.getConfig({
            success: function (data) {
                console.log(data);
            },
            error: function () {

            }
        });
    },
    getAllMangers: function () {
        this.Usercontroller.getAllMangers({
            success: function (Mangers) {
                console.log(Mangers);
            },
            error: function () {

            }
        });
    },
    putEcho: function (mess) {
        this.Echo.echo({
            message: mess || 'test message'
        }, {
            success: function (response) {
                console.log(response);
            },
            error: function () {

            }
        });
    },
    createManager: function (userData) {
        this.Usercontroller.createManager({
            body: userData || {
                'firstName': 'testFirstName',
                'lastName': 'TestLastName',
                'picUrl': 'test_pic_url',
                'mmxId': 'mmx1',
                'status': 1,
                'speciality': 'testspec',
                'password': 'test123',
                'city': 'testcity',
                'id': 'testid',
                'email': 'test@test.com',
                'managerId': 'testmanid',
                'role': ['admin'],
                'creationTime': 1434067506881,
                'posId': 'post123',
                'storeId': 'testStoreId'
            }
        }, {
            success: function (Mangers) {
                console.log(Mangers);
            },
            error: function () {

            }
        });
    }

};