define(['App', 'backbone', 'marionette', 'views/WorkView', 'views/HeaderView', 'views/ReportView', 'views/EmployeeView'],
    function (App, Backbone, Marionette, WorkView, HeaderView, ReportView, EmployeeView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new HeaderView());
        },

        //страница с рабочим временем
        index:function (date) {
            App.mainRegion.show(new WorkView({date: date}));
        },

        //страница создания сотрудников
        employee: function(){
            App.mainRegion.show(new EmployeeView());
        },

        //страница создания отчётов
        report: function(){
            App.mainRegion.show(new ReportView());
        }
    });
});