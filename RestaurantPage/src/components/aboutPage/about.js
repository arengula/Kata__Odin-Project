import "./about.css"

let heroURL = "https://architizer-prod.imgix.net/media/mediadata/uploads/1514377430489Italian-Restaurant-Interior-Design-4.jpg"

const makeHeroRight = () => {
	let content = document.createElement("div");

	return content;
}

const makeHeroLeft = () => {
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

const makeAbout =  () => {
	let section = document.createElement("section");
	section.classList.add("about__about", "about__groupContent");

	let tempHeading = document.createElement("h2");
	let tempParagraph = document.createElement("p");
	let tempSect = document.createElement("section");
	tempSect.classList.add("main__entry");
	let tempImg = document.createElement("img");

	tempImg.src = "https://cdn-icons-png.flaticon.com/512/7064/7064544.png";
	tempHeading.textContent = "Who We Are";
	tempParagraph.textContent = "We are the chefs with a passion to share about our homeland through our cookings!"
	tempSect.appendChild(tempImg.cloneNode(true));
	tempSect.appendChild(tempHeading.cloneNode(true));
	tempSect.appendChild(tempParagraph.cloneNode(true));
	section.appendChild(tempSect.cloneNode(true));

	tempImg.src = "https://cdn-icons-png.flaticon.com/512/2720/2720119.png";
	tempSect.innerHTML = "";
	tempHeading.textContent = "What we do";
	tempParagraph.textContent = "We provide you various Italian cuisine with our own special touch!"
	tempSect.appendChild(tempImg.cloneNode(true));
	tempSect.appendChild(tempHeading.cloneNode(true));
	tempSect.appendChild(tempParagraph.cloneNode(true));
	section.appendChild(tempSect.cloneNode(true));
	
	return section;
}

const makeSignature = () => {
	let section = document.createElement("section")
	return section

}

const makeMainContent = () => {
	let section = document.createElement("article");
	
	let tempGroup = document.createElement("div");
	let tempHeading = document.createElement("h2");
	let tempHeadingWrapper = document.createElement("section");
	tempHeadingWrapper.classList.add("about__groupHeading")

	tempHeading.textContent = "About Us";
	tempHeadingWrapper.appendChild(tempHeading.cloneNode(true));
	tempGroup.appendChild(tempHeadingWrapper.cloneNode(true));
	tempGroup.appendChild(makeAbout());
	section.appendChild(tempGroup.cloneNode(true))

	tempGroup.innerHTML = "";
	tempHeadingWrapper.innerHTML = "";
	tempHeading.textContent = "Our Signature";
	tempHeadingWrapper.appendChild(tempHeading.cloneNode(true));
	tempGroup.appendChild(tempHeadingWrapper.cloneNode(true));
	tempGroup.appendChild(makeSignature());
	section.appendChild(tempGroup.cloneNode(true));

	return section
}

const makeHero = () => {
	let hero = document.createElement("section");

	let heroBG = document.createElement("img");
	heroBG.src = heroURL;
	heroBG.classList.add("hero__background");
	hero.appendChild(heroBG);

	let heroContent = document.createElement("section");
	heroContent.classList.add("hero__content");
	heroContent.appendChild(makeHeroLeft());
	heroContent.appendChild(makeHeroRight());
	hero.appendChild(heroContent);

	return hero;
}

const render = () => {
	let section = document.createElement("section")

	let heroSection = makeHero();
	heroSection.classList.add("hero")
	section.appendChild(heroSection);

	let mainContent = makeMainContent();
	mainContent.classList.add("about")
	section.appendChild(mainContent);

	return section
}

export default render();
