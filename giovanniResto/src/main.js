import "./style.css"
import navbar from "./components/nav.js"
import about from "./components/aboutPage/about.js"
import order from "./components/orderPage/order.js"
import chef from "./components/chefPage/chef.js"
import menu from "./components/menuPage/menu.js"

const mainPage = (() => {
	let pages = [about, chef, menu, order]
	let root = document.getElementById("root")

	const switchPage = (pageNumber) => {
		root.innerHTML = "";
		root.appendChild(navbar);
		root.appendChild(pages[pageNumber]);
	}

	return {switchPage};
})()

const setListeners = () => {
	document.getElementById("Identity").addEventListener(
		"click", () => { mainPage.switchPage(0);
	})

	document.getElementById("Chefs").addEventListener(
		"click", () => { mainPage.switchPage(1);
	})

	document.getElementById("MeetTheChef").addEventListener(
		"click", () => { mainPage.switchPage(1);
	})

	document.getElementById("SeeMore").addEventListener(
		"click", () => { mainPage.switchPage(2);
	})
	document.getElementById("Menu").addEventListener(
		"click", () => { mainPage.switchPage(2);
	})

	document.getElementById("OrderNow").addEventListener(
		"click", () => { mainPage.switchPage(3);
	})
	document.getElementById("nav-OrderNow").addEventListener(
		"click", () => { mainPage.switchPage(3);
	})
}

function main() {
	mainPage.switchPage(0);
	setListeners();
}

main()
