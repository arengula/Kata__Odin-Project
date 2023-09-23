import DBHandler from "./DBHandler/DBHandler.js"

const ftTrackEntry = (trackData) => {
	let section = document.createElement("div");
	section.classList.add("trackEntry");

	let img = document.createElement("img");
	img.src = "https://images.unsplash.com/photo-1695239510467-f1e93d649c2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60";
	section.appendChild(img);

	let trackInfo = document.createElement("div");
	trackInfo.classList.add("trackInfo");

	let trackTitle = document.createElement("p");
	trackTitle.classList.add("trackInfo__title");
	let trackArtist = document.createElement("p");
	trackArtist.classList.add("trackInfo__artist");
	trackTitle.textContent = trackData["trackTitle"];
	trackArtist.textContent = trackData["trackArtist"];

	let infoLeft = document.createElement("div");
	infoLeft.classList.add("trackInfo--left");
	infoLeft.appendChild(trackTitle);
	infoLeft.appendChild(trackArtist);

	let infoRight = document.createElement("div");
	let trackDuration = document.createElement("p");
	trackDuration.classList.add("trackInfo__duration");
	trackDuration.textContent = `${trackData["trackDuration-min"]}:${String(trackData["trackDuration-sec"]).padStart(2, '0')}`;
	infoRight.appendChild(trackDuration);

	trackInfo.appendChild(infoLeft);
	trackInfo.appendChild(infoRight);
	section.appendChild(trackInfo);

	return section
}

const ftInputWarning = (state) => { 
	let section = document.createElement("div");
	section.classList.add("inputWarning");
	let text = document.createElement("p");
	switch(state) {
		case "valueMissing":
			text.textContent = "Please fill out this field";
			break;
		case "tooLong":
			text.textContent = "This field is too long";
			break;
		case "tooShort":
			text.textContent = "This field is too short";
			break;
		case "typeMismatch":
			text.textContent = "Please fill with correct type of input";
			break;
		case "rangeOverflow":
			text.textContent = "Song duration is too long!";
			break;
		case "rangeUnderflow":
			text.textContent = "Song duration is too short!";
			break;
		default:
			text.textContent = "Unknown error has occured";
			break;
	}
	section.appendChild(text);
	return section;
}

const trackRenderer = (() => {
	const ROOT = document.getElementById("trackContainer");

	const render = () => {
		ROOT.innerHTML = ""
		console.log(DBHandler.getTracks())
		DBHandler.getTracks().forEach((track) => {
			ROOT.appendChild(ftTrackEntry(track))
		})
	}

	return {render}
})()

const inputHandler = (() => {
	let formLabels = [
		"trackTitle",
		"trackArtist",
		"trackDuration-min",
		"trackDuration-sec",
	]

	const validate = () => {
		let result = []
		formLabels.forEach((id) => {
			let elem = document.getElementById(id);
			result.push({
				id: id,
				validity: elem.validity
			});
		})
		return result;
	}
	
	const getUserInput = () => {
		let DATA = {}
		formLabels.forEach((id) => {
			let elem = document.getElementById(id);
			DATA[id] = elem.value;
		})
		return DATA;
	}

	return {validate, getUserInput}
})()


export default (() => {
	const inputRoutine = () => {
		console.log("ok")
		let validationResult = inputHandler.validate();
		let valid = true;
		validationResult.forEach((result) => {
			let selectedWarnElem = document.getElementById(`WARN_${result.id}`);
			
			for(let state in result.validity) {
				if(result.validity[state] == true && state != "valid") {
					valid = false;
					selectedWarnElem.innerHTML = "";
					selectedWarnElem.appendChild(
						ftInputWarning(state)
					);
				}
			}
		})

		if(valid) {
			DBHandler.addTrack(inputHandler.getUserInput())
			trackRenderer.render()
		}
	}

	return {inputRoutine}
})()
