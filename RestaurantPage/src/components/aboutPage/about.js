import "./about.css"

let heroURL = "https://architizer-prod.imgix.net/media/mediadata/uploads/1514377430489Italian-Restaurant-Interior-Design-4.jpg"

const factSectionGroup = (name, headingText, elements) => {
	let section = document.createElement("section");
	let heading = document.createElement("h2");
	let sectionContent = document.createElement("div");

	section.classList.add("about__sectionGroup");
	sectionContent.classList.add("about__groupContent");
	return () => {
		section.innerHTML = ""
		heading.textContent = headingText;
		section.appendChild(heading);

		elements.forEach((elem) => {
			sectionContent.appendChild(elem);
		})
		section.appendChild(sectionContent.cloneNode(true));
		return section.cloneNode(true);
	}
}

const factTextWithImage = (imgURL, headingText, captionText) => {
	let section = document.createElement("div");
	let img = document.createElement("img");
	let heading = document.createElement("h3");
	let paragraph = document.createElement("p");

	return  () => {
		section.innerHTML = "";
		img.src = imgURL;
		heading.textContent = headingText;
		paragraph.textContent = captionText;

		section.appendChild(img.cloneNode(true));
		section.appendChild(heading.cloneNode(true));
		section.appendChild(paragraph.cloneNode(true));
		return section.cloneNode(true);
	}
}

const makeAbout = () => {
	return factSectionGroup("about", "About Us", [
		(factTextWithImage(
			"https://cdn-icons-png.flaticon.com/512/7064/7064544.png",
			"Who We Are", "We are the chefs with a passion on sharing abour homeland through our cookings"
		))(),
		(factTextWithImage(
			"https://cdn-icons-png.flaticon.com/512/2720/2720119.png",
			"What We Do", "We provides various Italian cuisine with our own special touch!"
		))(),
	]);
}

const makeHeroText = () => {
	let content = document.createElement("div");
	content.classList.add("content__left");

	let heading = document.createElement("h2");
	heading.textContent = "Saluti!";

	let paragraph = document.createElement("p");
	paragraph.textContent = "Enjoy the Italian authentic taste here!";

	content.appendChild(heading);
	content.appendChild(paragraph);

	return content;
}

const makeMainContent = () => {
	let section = document.createElement("section");
	section.appendChild((makeAbout())());
	return section;
}

const makeHero = () => {
	let hero = document.createElement("section");

	let heroBG = document.createElement("img");
	heroBG.src = heroURL;
	heroBG.classList.add("hero__background");
	hero.appendChild(heroBG);

	let heroContent = document.createElement("section");
	heroContent.classList.add("hero__content");
	heroContent.appendChild(makeHeroText());
	hero.appendChild(heroContent);

	return hero;
}

const renderPage = () => {
	let section = document.createElement("section")

	let heroSection = makeHero();
	heroSection.classList.add("hero")
	section.appendChild(heroSection);

	let mainContent = makeMainContent();
	mainContent.classList.add("about")
	section.appendChild(mainContent);

	return section
}

export default renderPage();
