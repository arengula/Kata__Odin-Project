import "./about.css"

const ftTextBesideImage = (imageURL, imagePos, headingText, captionText) => {
	let section = document.createElement("section");
	if(imagePos == "right") { 
		section.classList.add("textBesideImage--reverse", headingText.split(" ").join(""));
	} else { 
		section.classList.add("textBesideImage", headingText.split(" ").join(""));
	}

	let img = document.createElement("img");
	img.classList.add("contentImage", "contentImage--large")
	img.src = imageURL;
	section.appendChild(img);

	let heading = document.createElement("h2");
	heading.classList.add("sectionHeading");
	heading.textContent = headingText;

	let caption = document.createElement("p");
	caption.classList.add("sectionParagraph");
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
	img.classList.add("contentImage--medium", "contentImage")
	img.src = imageURL;
	section.appendChild(img);

	let heading = document.createElement("h3");
	heading.textContent = headingText;
	section.appendChild(heading);
	
	let caption = document.createElement("p");
	caption.classList.add("sectionParagraph");
	caption.textContent = captionText;
	section.appendChild(caption);

	return section;
}

const sect__signature = (() => {
	let section = document.createElement("section");
	section.classList.add("pointsWithImage", "signature");


	let heading = document.createElement("h2");
	heading.classList.add("sectionHeading");
	heading.textContent = "Our signature";
	section.appendChild(heading);

	let paragraph = document.createElement("p");
	paragraph.textContent = "We only serve the best. Here are the best of our best!";
	section.appendChild(paragraph);

	let signatureItems = document.createElement("div");
	signatureItems.classList.add("signatureItems")
	let sources = [
		["https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f.jpg", 
			"Lasagna", "Layers of greatness"],
		["https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg",
			"Fettucine Alfredo", "Creamy and Savory Pasta"],
		["https://www.blossmangas.com/wp-content/uploads/2021/05/Margherita-pizza-2.jpg",
			"Pizza", "Share its greatness with your loved ones"],
	]

	sources.forEach((info) => { 
		let signatureItem = ftTextUnderImage(info[0], info[1], info[2]);
		signatureItem.classList.add("signature__item");
		signatureItems.appendChild(signatureItem)
	})

	section.appendChild(signatureItems);
	return section;
})()

const sect__callToAction = (() => {
	let section = document.createElement("section");
	section.classList.add("entryGroup", "callToAction");
	
	let heading = document.createElement("h2");
	heading.classList.add("sectionHeading");
	heading.textContent = "What are you waiting for?";
	section.appendChild(heading);

	let paragraph = document.createElement("p");
	paragraph.textContent = "Experience the authentic Italian taste today!";
	section.appendChild(paragraph);

	let button = document.createElement("button");
	button.type = "button"
	button.textContent = "Order now"
	section.appendChild(button);

	return section;
})()

const sect__hero = (() => {;
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
	paragraph.classList.add("sectionParagraph");
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
	section.appendChild(ftTextBesideImage(
		"https://st.focusedcollection.com/18590116/i/650/focused_224830810-stock-photo-head-chef-teaching-his-team.jpg", 
		"left", "Who We Are", 
		"We are the chef with passion on sharing amazing things from our homeland through our cooking."
	));
	section.appendChild(ftTextBesideImage(
		"https://assets.architecturaldigest.in/photos/600837f1e6e1f64740188ee5/16:9/w_2560%2Cc_limit/Italian-food_1-1366x768.jpg", 
		"right", "What We Do", "Lorem ipsum sit dolor amet"
	));
	section.appendChild(sect__signature);
	section.appendChild(sect__callToAction);
	return section
}

export default renderPage();
