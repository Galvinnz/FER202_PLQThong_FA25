const person = {
	name: "Costas",
	address: {
		street: "Lalaland 12"
		// city không có
	}
};

// Destructuring object lồng nhau, city mặc định "Unknown City"
const { address: { street, city = "Unknown City" } } = person;

console.log("street:", street); // Lalaland 12
console.log("city:", city);     // Unknown City