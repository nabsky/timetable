define(["jquery", "backbone", "models/EmployeeModel"],
    function ($, Backbone, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,
            pouch: {
                listen: false,
                fetch: 'query',
                options: {
                    query: {
                        include_docs: true,
                        fun: {
                            map: function (doc) {
                                if (doc.type === 'employee') {
                                    emit(doc);
                                }
                            }
                        }
                    },
                    changes: {
                        include_docs: true,
                        filter: function (doc) {
                            return doc._deleted || doc.type === 'employee';
                        }
                    }
                }
            },
            parse: function (result) {
                return _.pluck(result.rows, 'doc');
            }

        });

        return Collection;
    });