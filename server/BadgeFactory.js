var availableBadges = [
	'label-blue', 
	'label-green',
	'label-grey', 
	'label-pink', 
	'label-yellow'
];

// fill batch
var badgeBatch = availableBadges.slice(0);

var BadgeFactory = function() {
	this.generate = function() {
		// if the batch is empty, fill up a new one
		if (!badgeBatch.length) {
			badgeBatch = availableBadges.slice(0);
		}

		return badgeBatch.shift();
	};
};

module.exports = BadgeFactory;