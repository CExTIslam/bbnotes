window.APP.NoteModel = Backbone.Model.extend({
	defaults: {
		id: _.random(0, 10000),
		title: "",
		description: "",
		author: "",
	},

	validate: function (attrs) {
		const errors = _.reduce(attrs, (acc, value, key) => {
			// We want "" to be considered as an error as well.
			if (!value) {
				acc[key] = `The field "${key}" is mandatory`
			}

			return acc;
		}, {});

		return !_.isEmpty(errors) ? errors : null;
	}
});

