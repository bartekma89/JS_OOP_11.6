$(function () {

	function generateId() {
		var chars = '0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ';
		var id = '';
		for (var i = 0; i < 10; i++) {
			id += chars[Math.floor(Math.random() * chars.length)];
		}
		return id;
	}

	var board = {
		name: 'Kanban Board',
		addColumn: function (column) {
			this.$element.append(column.$element);
		},
		$element: $('#board .column-container')
	};

	$('.create-column').click(function () {
		var name = prompt('name column');
		var column = new Column(name);
		board.addColumn(column);
	});

	function Column(name) {
		var self = this;

		this.name = name;
		this.id = generateId();
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('X');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add card');

			console.log(self);
			
			$columnDelete.click(function () {
				self.removeColumn();
			});

			$columnAddCard.click(function () {
				self.addCard(new Card(prompt('name card')));
			});

			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};
	
	function Card(description) {
		var self = this;
		
		this.description = description;
		this.id = generateId();
		this.$element = createCard();
		
		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('X');
			
			console.log(self);
			
			$cardDelete.click(function() {
				self.removeCard();
			});

			$card.append($cardDescription).append($cardDelete);
			
			return $card;
		}
	}
	
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};
});
