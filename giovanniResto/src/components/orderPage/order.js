import "./order.css"

const ftImageWithCaption = (imgURL, captionText) => {
	let elem = document.createElement("div");
	let img = document.createElement("img");
	img.src = imgURL;

	let caption = document.createElement("h3");
	caption.textContent = captionText;

	elem.appendChild(img)
	elem.appendChild(caption)

	return elem;
}

function main() {
	let section = document.createElement("main");
	section.classList.add("main__order");
	let heading = document.createElement("h2");
	heading.textContent = "Ready to order?";

	let textWrapper = document.createElement("div");
	textWrapper.appendChild(heading);

	section.appendChild(textWrapper);

	// Subsection 1
	let subsec1Heading = document.createElement("h3");
	subsec1Heading.textContent = "Method #1: Call Us!"
	let subsec1Caption = document.createElement("p");
	subsec1Caption.textContent = "Get your order ready and call 0396 4158130 (P.S. Don't actually call this number!)"

	let subsec1 = document.createElement("div");
	subsec1.appendChild(subsec1Heading);
	subsec1.appendChild(subsec1Caption);

	// Subsection 2
	let subsec2Heading = document.createElement("h3");
	subsec2Heading.textContent = "Method #2: Order from your favourite app!"
	let subsec2Caption = document.createElement("p");
	subsec2Caption.textContent = "We're available on these apps! Search for @Giovanni5 to find us!"
	let subsec2Content = document.createElement("section");
	subsec2Content.classList.add("orderApp__list");
	
	let orderApp = [
		["Doordash",  "https://freelogopng.com/images/all_img/1656222707door-dash-logo.png"], 
		["Uber Eats", "https://seeklogo.com/images/U/uber-eats-logo-39748746B7-seeklogo.com.png"],
		["Zomato", "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png"],
	]

	orderApp.forEach((appInfo) => {
		var elem = ftImageWithCaption(appInfo[1], appInfo[0])
		elem.classList.add("orderApp__item")
		subsec2Content.appendChild(elem);
	})

	let subsec2 = document.createElement("div");
	subsec2.classList.add("orderApp");
	subsec2.appendChild(subsec2Heading);
	subsec2.appendChild(subsec2Caption);
	subsec2.appendChild(subsec2Content);

	section.appendChild(subsec1);
	section.appendChild(subsec2);
	return section;
}

export default main();
