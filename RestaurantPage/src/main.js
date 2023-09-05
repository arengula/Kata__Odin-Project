import "./style.css"
import navbar from "./components/nav.js"
import about from "./components/aboutPage/about.js"


const mainPage = (() => {
	let pages = [about]
	let root = document.getElementById("root")

	const switchPage = (pageNumber) => {
		root.innerHTML = "";
		root.appendChild(navbar);
		root.appendChild(pages[pageNumber]);
	}

	return {switchPage};
})()

const setListeners = () => {
	document.getElementById("MeetTheChef").addEventListener(
		"click", () => {
		mainPage.switchPage(1);
		console.log("whhee")
	})
	document.getElementById("SeeMore").addEventListener(
		"click", () => {
		mainPage.switchPage(2);
		console.log("whhee")
	})
	document.getElementById("OrderNow").addEventListener(
		"click", () => {
		mainPage.switchPage(3);
		console.log("whhee")
	})
}

function main() {
	mainPage.switchPage(0);
	setListeners();
}

main()
