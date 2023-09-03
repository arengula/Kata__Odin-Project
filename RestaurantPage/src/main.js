import "./style.css"
import navbar from "./components/nav.js"
import about from "./components/aboutPage/about.js"

function main() {
	document.getElementById("root").appendChild(navbar)
	document.getElementById("root").appendChild(about)
}

main()
