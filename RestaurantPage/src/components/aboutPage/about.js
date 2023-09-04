import "./about.css"

const ftTextBesideImage = (imageURL, imagePos, headingText, captionText) => {
	let section = document.createElement("section");
	if(imagePos == "right") { 
		section.classList.add("textBesideImage--reverse", headingText.split(" ").join(""));
	} else { 
		section.classList.add("textBesideImage", headingText.split(" ").join(""));
	}

	let img = document.createElement("img");
	img.src = imageURL;
	section.appendChild(img);

	let heading = document.createElement("h2");
	heading.textContent = headingText;

	let caption = document.createElement("p");
	caption.textContent = captionText;

	let textGroup = document.createElement("div");
	textGroup.appendChild(heading);
	textGroup.appendChild(caption);
	section.appendChild(textGroup);

	return section;
}

const ftTextUnderImage = (imageURL, headingText, captionText) => {
	let section = document.createElement("div");

	let img = document.createElement("img");
	img.src = imageURL;
	section.appendChild(img);

	let heading = document.createElement("h3");
	heading.textContent = headingText;
	section.appendChild(heading);
	
	let caption = document.createElement("p");
	caption.textContent = captionText;
	section.appendChild(caption);

	return section;
}

const sect__signature = (() => {
	let section = document.createElement("section");
	section.classList.add("pointsWithImage", "signature");


	let header = document.createElement("h2");
	header.textContent = "Our signature";
	section.appendChild(header);

	let paragraph = document.createElement("p");
	paragraph.textContent = "We only serve the best so, here are the best of our best!";
	section.appendChild(paragraph);

	let signatureItems = document.createElement("div");
	signatureItems.classList.add("signatureItems")
	let sources = [
		["", 
			"Lasagna", "Layers of greatness"],
		["",
			"Alfredo", "Creamy and Savory Pasta"],
		["",
			"Pizza", "Share its greatness with your loved ones"],
	]

	sources.forEach((info) => { signatureItems.appendChild(ftTextUnderImage(info[0], info[1], info[2])); })
	section.appendChild(signatureItems);
	return section;
})()

const sect__callToAction = (() => {
	let section = document.createElement("section");
	section.classList.add("entryGroup", "callToAction");
	
	let header = document.createElement("h2");
	header.textContent = "What are you waiting for?";
	section.appendChild(header);

	let paragraph = document.createElement("p");
	paragraph.textContent = "Experience the authentic Italian taste today!";
	section.appendChild(paragraph);

	let button = document.createElement("button");
	button.type = "button"
	button.textContent = "Order now"
	section.appendChild(button);

	return section;
})()

const sect__hero = (() => {
	let heroURL = "https://architizer-prod.imgix.net/media/mediadata/uploads/1514377430489Italian-Restaurant-Interior-Design-4.jpg"
	let hero = document.createElement("section");
	hero.classList.add("hero")

	let heroBG = document.createElement("img");
	heroBG.src = heroURL;
	heroBG.classList.add("hero__background");
	hero.appendChild(heroBG);

	let heroContent = document.createElement("section");

	let heading = document.createElement("h2");
	let paragraph = document.createElement("p");
	heading.textContent = "Saluti!";
	paragraph.textContent = "Enjoy the Italian authentic taste here!";
	heroContent.appendChild(heading);
	heroContent.appendChild(paragraph);

	heroContent.classList.add("hero__content");
	hero.appendChild(heroContent);

	return hero;
})()

const renderPage = () => {
	let section = document.createElement("main")

	section.appendChild(sect__hero);
	section.appendChild(ftTextBesideImage("", "left", "Who We Are", "Lorem ipsum sit dolor amet"));
	section.appendChild(ftTextBesideImage("", "left", "What We Do", "Lorem ipsum sit dolor amet"));
	section.appendChild(sect__signature);
	section.appendChild(sect__callToAction);
	return section
}

export default renderPage();
