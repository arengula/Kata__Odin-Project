import trackLibrary from "./components/trackLibrary/trackLibrary.js"

function setEssentialListeners() {
	document.getElementById("submit_addTrack").addEventListener(
		"click", () => {
			trackLibrary.inputRoutine();
		}
	)
}

function main() {
	setEssentialListeners();
}

main();

