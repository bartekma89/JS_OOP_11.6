$(function() {
	
	function generateId() {
		
		var chars = '0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ';
		
		var id = '';
		
		for(var i = 0; i < 10; i++) {
			id += chars[Math.floor(Math.random() * chars.length)];
		}
		
		return id;
	}
	
	generateId();
	
});