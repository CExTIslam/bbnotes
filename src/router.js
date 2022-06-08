window.APP = window.APP || {};

window.APP.NoteRouter = Backbone.Router.extend({
	$container: $('#root'),

	routes: {
		"note/new": "create",
		"notes/home": "home",
		"note/:id/edit": "edit",
		"note/:id/delete": "delete"
	},

	initialize: function () {
		this.collection = new APP.NoteCollection();
		this.collection.fetch({ ajaxSync: false });

		// Start backbone
		Backbone.history.start();

		// When initialized ensure home is the first page.
		this.home();
	},

	home: function () {
		const view = new APP.NoteHomeView({
			// Collection is used to show the grid.
			collection: this.collection
			// NOTE: no model is necessary here.
		});

		this.$container.html(view.render().el);
	},

	create: function () {
		const view = new APP.NoteNewView({
			// When a model gets created we store the model memory reference in our collection bag.
			collection: this.collection, 
			model: new APP.NoteModel()
		});

		this.$container.html(view.render().el);
	},

	delete: function (id) {
		const note = this.collection.get(id);

		// We destroy the note, when notes are destroyed the route will change.
		note.destroy();

		// Since the route changed we then go back to home.
		Backbone.history.navigate("notes/home", {
			// Trigger is important to fire the model change event.
			trigger: true
		});
	},

	edit: function (id) {
		const view = new APP.NoteEditView({model: this.collection.get(id)});

		this.$container.html(view.render().el);
	},
});

