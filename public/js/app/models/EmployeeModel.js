define(["jquery", "backbone"],
    function ($, Backbone) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({
            initialize:function () {
                this.set("type", this.defaults.type);
            },

            defaults:{
                _id: undefined,//идентификатор сотрудника, пока используется фамилия, нужно добавить к ней таймстемп создания для уникальности
                name: undefined,//фамилия сотрудника
                phone: undefined,//телефон для СМС-уведомлений (на будущее)
                timeStart: undefined,//начало смены
                notifyOnBreak: undefined,//уведомлять ли о необходимости пообедать
                notifyOnEnd: undefined,//уведомлять ли о необходимости закнчить рабочий день
                type: "employee",//тип записи - сотрудник
                state: undefined //текущее состояние сотрудника: "work" - на работе, "break" - на обеде
            },

            validate:function (attrs) {

            }

        });

        return Model;
    }
);