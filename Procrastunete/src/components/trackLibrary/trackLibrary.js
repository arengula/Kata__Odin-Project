import DBHandler from "./DBHandler/DBHandler.js"

const renderer = () => {
	const render = () => {

	}

	return {render}
}

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

	const sanitize = (input) => {
		return true;
	}

	return {validate, sanitize}
})()

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

export default (() => {
	const inputRoutine = () => {
		let validationResult = inputHandler.validate();
		validationResult.forEach((result) => {
			let selectedWarnElem = document.getElementById(`WARN_${result.id}`);
			
			for(let state in result.validity) {
				if(result.validity[state] == true && state != "valid") {
					selectedWarnElem.innerHTML = "";
					selectedWarnElem.appendChild(
						ftInputWarning(state)
					);
				}
			}
		})
	}

	return {inputRoutine}
})()
