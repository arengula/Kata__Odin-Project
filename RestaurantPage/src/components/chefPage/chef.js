import "./chef.css"

function main() {
	let section = document.createElement("main");
	let heading = document.createElement("h2");
	heading.textContent = "Meet the Chef!";
	let caption = document.createElement("p");
	caption.textContent = "These are the people behind your tasty meals!";

	section.appendChild(heading);
	section.appendChild(caption);
	return section;
}

export default main();
