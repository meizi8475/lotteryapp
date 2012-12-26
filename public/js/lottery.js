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
    var LoginView = Backbone.View.extend({
        el : "#login",
        events : {
            "click #submit" : "login"
        },
        initialize : function () {
            this.username = this.$("#username").parents(".control-group");
            this.password = this.$("#password").parents(".control-group");
        },
        checkUsername : function () {
            var partner = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/ig,
                username = this.$("#username").val();
            if (!partner.test(username)) {
                this.username.addClass("error");
                return false
            } else {
                this.username.removeClass("error");
                return true;
            }
        },
        checkPassword : function () {
            var password = this.$("#password").val();
            if (password.length < 6) {
                this.password.addClass("error");
                return false
            } else {
                this.password.removeClass("error");
                return true;
            }
        },
        login : function (e) {
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
    var loginView = new LoginView;
    var AdminInfo = Backbone.Model.extend({
        urlRoot : "/adminInfo",
        defaults : {
            password : "defaultPassword"
        },
        validate : function (attrs) {
            if (attrs.password.length < 6) {
                return "error"
            }
        },
        initialize : function () {
            this.fetch();
        }
    });
    var AdminView = Backbone.View.extend({
        model : new AdminInfo,
        el : "#admin",
        render : function () {
            var password = "", model = this.model;
            this.$("#email").html(model.get("email"));
            (function () {
                for (var i = 0, l = model.get("password").length; i < l; i++) {
                    password += "*";
                }
            })()
            this.$("#password").html(password);
            this.$("#realName").html(model.get("realName"));
            this.$("#nickname").html(model.get("nickname"));
            this.$("#company").html(model.get("company"));
            if ("undefined" != typeof model.previous("email")) {
                this.$("#ensure").show();
            }
        },
        initialize : function () {
            this.model.on("change", this.render, this);
            this.model.on("error", this.passwordError, this);
        },
        passwordError : function (error) {
            alert(error);
        },
        events : {
            "click .changeable" : "change",
            "click #ensure" : "ensure"
        },
        ensure : function () {
            var view = this;
            this.model.save("author", "F.D.R.", {
                success : function (model, data) {
                    if (data.code == "SUCCESS") {
                        this.$(".info").removeClass("info");
                        this.$("#ensure").hide();
                    }
                },
                context : view
            });
        },
        change : function (e) {
            var el = e.target, $el = $(el), model = this.model, view = this;
            $(e.target).hide();
            if (el.id != "password") {
                var html = view.make("input", {type : "text", value : model.get(el.id)});
            } else {
                var html = view.make("input", {type : "text", value : model.get(el.id)});
            }
            $(html).insertAfter($el);
            html.focus();
            $(html).change(function () {
                model.set(el.id, $(this).val());
                $el.parents("tr").addClass("info");
            }).blur(function () {
                    $(this).remove();
                    $el.show();
                });
        }
    });
    var adminView = new AdminView;
});