import "./menu.css"

function main() {
	let section = document.createElement("main");
	let heading = document.createElement("h2");
	heading.textContent = "Our Products";
	let caption = document.createElement("p");
	caption.textContent = "Explore our menu and discover its greatness!";

	section.appendChild(heading);
	section.appendChild(caption);
	return section;
}

export default main();
