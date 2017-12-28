$(function () {

	function generateId() {
		var chars = '0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ';
		var id = '';
		for (var i = 0; i < 10; i++) {
			id += chars[Math.floor(Math.random() * chars.length)];
		}
		return id;
	}

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
			var $fakeCard = $('<li>').addClass('fake-placeholder');
			self.listLength = $('li').length;

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

			$columnCardList.append($fakeCard);
			
			return $column;
		}

	}

	Column.prototype = {
		addCard: function (card) {
			this.$element.children('ul').append(card.$element);
			console.log(this.listLength = $('li').length);
			checkList();
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
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('X');

			$cardDelete.click(function () {
				self.removeCard();
				checkList();
			});

			$card.click(function () {
				self.changeStatus();
			});
			
			$card.on('mousemove', checkList);

			$card.append($cardDelete)
				.append($cardDescription);

			return $card;
		}
	}

	Card.prototype = {
		removeCard: function () {
			this.$element.remove();
		},

		changeStatus: function () {
			var self = this;

			function changeCardStatus(currentStatus, nextStatus) {
				self.$element.removeClass(currentStatus);
				self.$element.addClass(nextStatus);
			}

			if (this.$element.hasClass('inProgress')) {
				changeCardStatus('inProgress', 'completed');
			} else if (this.$element.hasClass('completed')) {
				changeCardStatus('completed', 'stopped');
			} else if (this.$element.hasClass('stopped')) {
				changeCardStatus('stopped', 'inProgress');

			}

		}
	};

	var board = {
		name: 'Kaban Board',
		addColumn: function (column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder',
			/*dropOnEmpty: true,
			forcePlaceholderSize: true*/
		}).disableSelection();
	}

	$('.create-column').click(function () {
		var columnName = prompt('Enter a column name', 'Column name');
		if (columnName === '') {
			columnName = 'New Column';
		}
		board.addColumn(new Column(columnName));
	});

	function checkList() {
		console.log($('.column-card-list').find('.fake-placeholder').length, ' bla');
		console.log($('.column-card-list').length);
		$('.column-card-list').each(function() {
			console.log('ilosc li ', $(this).find('li').length)
			if($(this).find('li').length > 1){
				$(this).find('.fake-placeholder').hide();
			} else {
				$(this).find('.fake-placeholder').show();
			}
		});
	}
	
	checkList();
});
