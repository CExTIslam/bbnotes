window.APP.NoteEditView = Backbone.View.extend({
	events: {
		"click button.save": "save",
	},

	template: _.template($('#formTemplate').html()),

	initialize: function () {
		this.model.bind('invalid', this.showFieldErrors, this);
	},

	showFieldErrors: function (note, errors) {
		$('.validation-error').removeClass('validation-error');
		$('.alert').html(_.values(errors).join('<br>')).show();
		_.each(_.keys(errors), function (key) {
			$('*[name=' + key + ']').parent().addClass('validation-error');
		});
	},

	save: function (event) {
		event.stopPropagation();
		event.preventDefault();

		this.model.set({
			title: this.$el.find('input[name=title]').val(),
			author: this.$el.find('input[name=author]').val(),
			description: this.$el.find('textarea[name=description]').val()
		});

		if (this.model.isValid()) {
			this.model.save();
			Backbone.history.navigate('notes/home', {trigger: true});
		}
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}
});

