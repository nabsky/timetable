require.config({
    //базовым URL будем считать папку со скриптами приложения, чтобы каждый раз не присать путь до них
    baseUrl:"./js/app",

    //используемые либы
    paths:{
        //основные либы
        "jquery":"../libs/jquery",
        "underscore":"../libs/underscore",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "moment": "../libs/moment/moment-with-locales",
        "webcam":  '../libs/webcam/webcam.min',
        "vis": '../libs/vis/vis',
        "pouchdb": '../libs/pouchdb/pouchdb-3.6.0.min',
        "backbonePouch": '../libs/pouchdb/backbone-pouch',
        "injectCSS": '../libs/injectCSS/jquery.injectCSS',

        //плагины
        "bootstrap":"../libs/plugins/bootstrap",
        "bootstrapTable":"../libs/bootstrap-table/bootstrap-table",
        "text":"../libs/plugins/text",
        "material":"../libs/plugins/material",
        "ripples":"../libs/plugins/ripples",
        "stickit":"../libs/plugins/backbone.stickit",
        "velocity": '../libs/plugins/velocity.min',
        "velocityUI": '../libs/plugins/velocity.ui.min'
    },

    //зависимсоти и экспорты
    shim:{
        "bootstrap":["jquery"],
        "injectCSS":["jquery"],
        "material":["bootstrap"],
        "bootstrapTable":["bootstrap"],
        "ripples":["material"],
        "stickit":["backbone"],
        "velocity": ["jquery"],
        "velocityUI": ["velocity"],
        "webcam": {
            exports: "Webcam"
        },
        "backbonePouch": {
            deps: ["backbone", "pouchdb"],
            exports: "BackbonePouch"
        }
    }
});

require(["App", "routers/AppRouter", "controllers/Controller"],
    function (App, AppRouter, Controller) {
        App.appRouter = new AppRouter({
            controller:new Controller()
        });
        App.start();
    });