import "./chef.css"

const ftChef = (imgURL, name, info) => {
	let section = document.createElement("div");
	section.classList.add("chef");

	let img = document.createElement("img");
	img.src = imgURL;
	section.appendChild(img);

	let heading = document.createElement("h3");
	heading.textContent = name;

	let caption = document.createElement("p");
	caption.textContent = info;

	let textSection = document.createElement("div");
	textSection.classList.add("chef__info")
	textSection.appendChild(heading);
	textSection.appendChild(caption);
	section.appendChild(textSection);


	return section;
}

function main() {
	let section = document.createElement("main");
	section.classList.add("main__chef");
	let heading = document.createElement("h2");
	heading.textContent = "Meet the Chef!";
	let caption = document.createElement("p");
	caption.textContent = "These are the people behind your tasty meals!";

	section.appendChild(heading);
	section.appendChild(caption);

	let chefList = [
		["https://thumbs.dreamstime.com/z/italian-chef-4995744.jpg", 
			"Giovanni Esposito", "Giovanni himself, the founder of this restaurant",
		],
		["https://www.shutterstock.com/shutterstock/photos/50772763/display_1500/stock-photo-senior-chef-whisking-egg-in-kitchen-white-background-50772763.jpg",
			"Gus Giuseppe", "Giovanni's little brother with same passion as his brother"
		],
		["https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX8835106.jpg",
			"Carlo Monterri", "Giovanni's mentee, but don't underestimate his expertise!"
		],
		["https://previews.123rf.com/images/auremar/auremar1212/auremar121200052/16670111-italian-chef.jpg",
			"Enzo Tucci", "The fastest one in the kitchen!"
		],
		["https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX8845961.jpg",
			"Alessia Fontana", "Our humble waiter! Also a chef!"
		],
		[" https://i.pinimg.com/originals/09/cf/67/09cf67e51ba3ef20b02f96e0e7a55ca3.jpg ",
			"Andreana Rosella", "Half chef, half waitress. She can do both!"
		],
	]

	let subsection = document.createElement("section");
	subsection.classList.add("chef-list");
	chefList.forEach((data) => {
			subsection.appendChild(ftChef(
				data[0], data[1], data[2]
			));
		}
	)

	section.appendChild(subsection);
	return section;
}

export default main();
