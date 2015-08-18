define(['marionette'], function(Marionette) {
   return Marionette.AppRouter.extend({
       //при обращении по URL'у вызывается соответствующий метод контроллера
       appRoutes: {
           "": "index",
           "work(/:date)": "index",
           "employee": "employee",
           "report": "report"
       }
   });
});