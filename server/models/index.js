const db = require("../data/dbConfig.js");

// table: string
module.exports = function (table) {
	
	// returns entire table contents
	function find () {
		return db(table); // object[]
	}

	// finds item by id
	// id: number
	function findById(id) {
		return db(table).where({id}).first(); // object
	}

	// adds item to database
	// item: object
	function add(item) {
		return db(table)
			// inserts into database
			.insert(item, "id")
			// returns newly inserted item
			.then(([id]) => findById(id)); // object
	}

	// finds first instance of item by property of item
	// property: object
	function findBy(property) {
		return db(table).where(property).first();
	}

	return {
		find,
		findById,
		add,
		findBy
	};
}
