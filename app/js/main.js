$(function() {
	// Пространство имен
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	// шаблон
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Task = Backbone.Model.extend({});
	App.Views.Task = Backbone.View.extend({
		tagName: 'li',
		render: function () {
			this.$el.html( this.model.get('title') );
			return this;
		}
	});

	App.Collections.Task = Backbone.Collection.extend({
		model: App.Models.task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function (task) {
			// создавать новый дочерний вид
			var taskView = new App.Views.Task({
				model: task
			});
			// добавлять его в корневой элемент
			this.$el.append(taskView.render().el);
		}
	});

	var tasksCollection = new App.Collections.Task([
		{
			title: 'Сходить в магазин',
			priority: 4
		},
		{
			title: 'Получить почту',
			priority: 4
		},
		{
			title: 'Сходить на работу',
			priority: 4
		},
	]);

	var tasksView = new App.Views.Tasks({ collection: tasksCollection });

	taskView.render();
	$('body').html(taskView.el);
})