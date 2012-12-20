$(document).ready(function () {
    var resizeHandler = function () {
        var page = {
            height : document.documentElement.clientHeight,
            miniHeight : 620
        }
        if (page.height > page.miniHeight) {
            $("#footer").css({
                "position" : "absolute",
                "bottom" : "0"
            });
        } else {
            $("#footer").css({
                "position" : "static",
                "bottom" : "auto"
            });
        }
    };
    resizeHandler();
    $(window).resize(resizeHandler);
    var UserInfo = Backbone.Model.extend({
        defaults : {
            username : "",
            password : ""
        },
        urlRoot : "/users"
    });
    var LoginView = Backbone.View.extend({
        el : "#login",
        model : new UserInfo(),
        initialize : function () {
            this.model.set({
                username : this.$("#username").val(),
                password : this.$("#password").val()
            });
            this.model.on("change:password", this.checkPassword, this.$("#password").parents(".control-group"));
        },
        events : {
            "click #submit" : "login",
            "change #username" : "changeName",
            "change #password" : "changePassword"
        },
        changeName : function (e) {
            this.model.set({
                username : this.$("#username").val()
            });
        },
        changePassword : function (e) {
            this.model.set({
                password : this.$("#password").val()
            });
        },
        checkPassword : function (model) {
            if (model.get("password").length < 6 && model.get("password") != "") {
                this.addClass("error");
            } else {
                this.removeClass("error");
            }
        },
        login : function (e) {
            e.preventDefault();
            this.model.fetch({
                data:this.model.toJSON()
            });
            this.loginError();
        },
        loginError : function () {
            $("#login").animate({
                "left" : "-=100"
            }, 150, function () {
                $(this).animate({
                    "left" : "+=200"
                }, 150, function () {
                    $(this).animate({
                        "left" : "-=100"
                    }, 150)
                });
            });
        }
    });
    var test = new LoginView;
});