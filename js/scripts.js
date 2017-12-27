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
		name: 'Kaban Board',
		addColumn: function (column) {
			this.$element.append(column.$element);
		},
		$element: $('#board .column-container')
	};

	$('.create-column').click(function () {
		var columnName = prompt('Enter a column name', 'Column name');
		if (columnName === '') {
			columnName = 'New Column';
		}
		board.addColumn(new Column(columnName));

	});

	function Column(name) {
		var self = this;

		this.id = generateId();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columDelete = $('<button>').addClass('btn-delete').text('X');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add Card');

			$columDelete.click(function () {
				self.removeColumn();
			});

			$columnAddCard.click(function () {
				var cardDescription = prompt('Description');
				self.addCard(new Card(cardDescription));
			});

			$column.append($columnTitle)
				.append($columnAddCard)
				.append($columDelete)
				.append($columnCardList);

			return $column;
		}

	}

	Column.prototype = {
		addCard: function (card) {
			this.$element.children('ul').append(card.$element);
		},

		removeColumn: function () {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.description = description;
		this.id = generateId();
		this.$element = createCard();

		console.log(self);
		console.log(this.$element);

		function createCard() {
			var $card = $('<li>').addClass('card inProgress');
			var $carDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('X');

			$cardDelete.click(function () {
				self.removeCard();
			});

			$card.click(function () {
				self.changeStatus();
			})

			$card.append($carDescription)
				.append($cardDelete);

			return $card;
		}
	}

	Card.prototype = {
		removeCard: function () {
			this.$element.remove();
		},

		changeStatus: function () {
			
			if (this.$element.hasClass('inProgress')) {
				this.$element.removeClass('inProgress');
				this.$element.addClass('completed');
			} else if (this.$element.hasClass('completed')) {
				this.$element.removeClass('completed');
				this.$element.addClass('stopped');
			} else if (this.$element.hasClass('stopped')) {
				this.$element.removeClass('stopped');
				this.$element.addClass('inProgress');
			}

		}
	};

});
