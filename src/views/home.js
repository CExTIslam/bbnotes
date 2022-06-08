window.APP.NoteHomeView = Backbone.View.extend({
	template: _.template($('#homeTemplate').html()),

	render: function () {
		this.$el.html(this.template({
			// When the collection is parsed as a JSON object and passed down,
			// The template will directly have access to the notes variable within it.
			notes: this.collection.toJSON()
		}));

		return this;
	}
});

