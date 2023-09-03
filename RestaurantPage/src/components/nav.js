import "./nav.css"
let menus = ["News", "Menu"]
let logoURL = "https://cdn-icons-png.flaticon.com/512/483/483841.png"
let container = document.createElement("section");

const makeSiteIdentity = () => {
	let section = document.createElement("section");

	let siteLogo = document.createElement("img");
	siteLogo.src = logoURL;
	siteLogo.classList.add("logo--large", "identity__logo", "logo", "--blackToWhite");
	section.appendChild(siteLogo);

	let texts = document.createElement("section");
	texts.classList.add("identity__text")
	let siteName = document.createElement("h1");
	siteName.textContent = "Giovanni\'s";
	texts.appendChild(siteName);

	let siteParagraph = document.createElement("p");
	siteParagraph.textContent = "Authentic Italian Taste. Mamma Mia!";
	texts.appendChild(siteParagraph);

	section.appendChild(texts);
	return section;
}

const makeCallToAction = () => {
	let button = document.createElement("button");
	button.type = "button";
	button.textContent = "Order now"
	button.addEventListener("click", () => {
		alert("Thank you for booking us!")
	})
	
	return button;
}

const makeSiteMenuButtons = () => {
	let section = document.createElement("ul");

	let buttonTemplate = document.createElement("button");
	buttonTemplate.type = "button";
	buttonTemplate.classList.add("nav__button");

	menus.forEach((val) => {
		let button = buttonTemplate.cloneNode(true);
		button.textContent = val;
		button.onclick = () => { console.log(`This is ${val} button`); }
		section.appendChild(button);
	})

	return section;
}

const render = () => {
	container.innerHTML = "";
	container.classList.add("nav");

	let siteIdentity = makeSiteIdentity();
	siteIdentity.classList.add("nav__identity");
	container.appendChild(siteIdentity);

	let siteButtons = makeSiteMenuButtons();
	siteButtons.classList.add("nav__button-list");
	container.appendChild(siteButtons);

	let siteAction = makeCallToAction();
	siteAction.classList.add("nav__action")
	container.appendChild(siteAction);

	return container;
}

export default render();
