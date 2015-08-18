define( [ 'App', 'marionette', 'underscore', 'text!templates/report.html', 'material', 'ripples',
    'bootstrapTable', 'velocity', "moment", 'collections/TimeCollection', 'collections/EmployeeCollection', 'text!templates/reportTable.html'],
    function( App, Marionette, _, template, material, ripples,
              bootstrapTable, velocity, moment, TimeCollection, EmployeeCollection, ReportTable) {

        return Marionette.ItemView.extend( {

            template: _.template(template),

            timeCollection: undefined,

            employeeCollection: undefined,

            info: {},

            ui: {
                reportButton: "#reportButton",
                inputFrom: "#inputFrom",
                inputTo: "#inputTo",
                reportTableContainer: ".report-container"
            },

            initialize: function(){
                this.employeeCollection = new EmployeeCollection();
                this.employeeCollection.fetch();
            },

            events: {
                'click @ui.reportButton': 'reportButtonClick'
            },

            onAttach: function () {
                $.material.init();
                this.ui.inputFrom.val(moment().format("YYYY-MM-DD"));
                this.ui.inputTo.val(moment().format("YYYY-MM-DD"));
            },

            reportButtonClick: function(){
                var that = this;
                var timeFrom = moment(this.ui.inputFrom.val()).startOf('day');
                var timeTo = moment(this.ui.inputTo.val()).endOf('day');

                this.timeCollection = new TimeCollection({
                        from: timeFrom.unix(),
                        to: timeTo.unix()
                    }
                );

                //TODO вынести в отдельный хелпер
                function pad(num, size) {
                    return ('000000000' + num).substr(-size);
                }

                this.timeCollection.fetch({
                    success: function(collection){
                        $.each(that.employeeCollection.models,  function(index, employee){
                            that.info[employee.get("_id")] = {
                                work: 0,
                                dinner: 0,
                                late: 0
                            };
                        });

                        $.each(collection.models,  function(index, time){
                            if(time.get("mode") == 'work' && time.has("start")){
                                var end = moment().unix();
                                if(time.has("end")){
                                   end = time.get("end");
                                }
                                var period = end - time.get("start");
                                that.info[time.get("employeeId")].work += period;
                                if(time.has("late")) {
                                    that.info[time.get("employeeId")].late++;
                                }
                            } else if (time.get("mode") == 'break' && time.has("start")){
                                var end = moment().unix();
                                if(time.has("end")){
                                    end = time.get("end");
                                }
                                var period = end - time.get("start");
                                that.info[time.get("employeeId")].dinner += period;
                            }
                        });

                        var data = [];

                        $.each(that.info, function(employeeId, info){
                            var name = that.employeeCollection.get(employeeId).get("name");
                            var timeWork = pad(Math.floor(info.work / 60 / 60), 2) + ":" + pad(Math.floor(info.work / 60 % 60), 2);
                            var timeBreak = pad(Math.floor(info.dinner / 60 / 60), 2) + ":" + pad(Math.floor(info.dinner / 60 % 60), 2);
                            data.push({
                                name:name,
                                work: timeWork,
                                dinner: timeBreak,
                                late: info.late
                            });
                        });

                        that.ui.reportTableContainer.html(_.template(ReportTable)({data: data}));
                    }
                })

            }

        });
    });