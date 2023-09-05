import "./order.css"

function main() {
	let section = document.createElement("main");
	let heading = document.createElement("h2");
	heading.textContent = "Ready to order?";

	let caption = document.createElement("p");
	caption.textContent = "Here are several ways to reach us!";

	let textWrapper = document.createElement("div");
	textWrapper.appendChild(heading);
	textWrapper.appendChild(caption);

	section.appendChild(textWrapper);

	// Subsection 1
	let subsec1Heading = document.createElement("h3");
	subsec1Heading.textContent = "Method #1: Call Us!"
	let subsec1Caption = document.createElement("p");
	subsec1Caption.textContent = "Get your order ready and call ... (Standard rate apply)"

	let subsec1 = document.createElement("div");
	subsec1.appendChild(subsec1Heading);
	subsec1.appendChild(subsec1Caption);

	// Subsection 2
	let subsec2Heading = document.createElement("h3");
	subsec2Heading.textContent = "Method #2: Order from your favourite app!"
	let subsec2Caption = document.createElement("p");
	subsec2Caption.textContent = "We're available on these apps! Search for @Giovanni5 to find us!"
	let subsec2Content = document.createElement("section");
	
	let orderApp = [
		["Doordash", "Uber Eats", "Zomato"], 
		[
			"", 
			"", 
			""
		]
	]

	let subsec2 = document.createElement("div");
	subsec2.appendChild(subsec2Heading);
	subsec2.appendChild(subsec2Caption);

	section.appendChild(subsec1);
	section.appendChild(subsec2);
	return section;
}

export default main();
