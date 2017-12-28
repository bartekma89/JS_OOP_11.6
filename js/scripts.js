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
			var $columDelete = $('<button>').addClass('btn-delete').html('<span>x</span>');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add Card');
			var $fakeCard = $('<li>').addClass('fake-placeholder');
			self.listLength = $('li').length;

			$columDelete.click(function () {
				self.removeColumn();
			});

			$columnAddCard.click(function () {
				var cardDescription = prompt('Description');
				self.addCard(new Card(cardDescription));
				checkList();
			});
		
			$column.append($columnTitle)
				.append($columnAddCard)
				.append($columDelete)
				.append($columnCardList);

			$columnCardList.append($fakeCard.text('Push card here'));

			return $column;
		}

	}

	Column.prototype = {
		addCard: function (card) {
			this.$element.children('ul').prepend(card.$element);
			checkList();
		},

		removeColumn: function () {
			this.$element.remove();
		}
	};

	//card
	function Card(description) {
		var self = this;

		this.description = description;
		this.id = generateId();
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card inProgress');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').html('<span>x</span>');

			$cardDelete.click(function () {
				self.removeCard();
				checkList();
			});

			$card.click(function () {
				self.changeStatus();
			});

			$card.mouseover(function(){
				checkList();
			});

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
		$element: $('.board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
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
		$('.column-card-list').each(function () {
			if ($(this).find('li').length > 1) {
				$(this).find('.fake-placeholder').hide();
			} else {
				$(this).find('.fake-placeholder').show();
			}
		});
	}

	checkList();
	
	var toDo = new Column("ToDo");
	var doing = new Column("Doing");
	var done = new Column("Done");
	
	board.addColumn(toDo);
	board.addColumn(doing);
	board.addColumn(done);
	
	var card1 = new Card('New Task');
	var card2 = new Card('Create kanban board');
	
	toDo.addCard(card1);
	doing.addCard(card2);
	
});
