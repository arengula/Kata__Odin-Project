import "./style.css"
import navbar from "./components/nav.js"
import about from "./components/aboutPage/about.js"

function main() {
	[navbar, about].forEach((elem) => {
		document.getElementById("root").appendChild(elem);
	})
}

main()
