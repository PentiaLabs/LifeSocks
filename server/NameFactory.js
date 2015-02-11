var NameFactory = function() {
	var names = [
		'Arthur',
		'Bone',
		'Cherry',
		'Doc',
		'Edelweiss',
		'Fanny',
		'Ginger',
		'Herpy',
		'Iggy',
		'Joker',
		'King',
		'Lucky',
		'Misty',
		'Nipple',
		'Odin',
		'Pinkie',
		'Ruby',
		'Snails',
		'Titsdale',
		'Usher'
	];
	
	this.generate = function() {
		return names.splice(Math.floor(Math.random() * names.length), 1);
	};
};

module.exports = NameFactory;