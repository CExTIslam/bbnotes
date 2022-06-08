window.APP.NoteCollection = Backbone.Collection.extend({
	// The local storage backbone dependency enables model persistence via browsers local store.
	localStorage: new Backbone.LocalStorage("NoteCollection"),
	model: APP.NoteModel,
});

