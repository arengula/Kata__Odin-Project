import "./about.css"

let heroURL = "https://architizer-prod.imgix.net/media/mediadata/uploads/1514377430489Italian-Restaurant-Interior-Design-4.jpg"

const makeHeroText = () => {
	let content = document.createElement("div");
	content.classList.add("content__left");
	return content;
}

const makeHero = () => {
	let hero = document.createElement("section");

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
}

const renderPage = () => {
	let section = document.createElement("section")

	let heroSection = makeHero();
	heroSection.classList.add("hero")
	section.appendChild(heroSection);

	return section
}

export default renderPage();
