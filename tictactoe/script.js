const GetById = (id) => { return document.getElementById(id); }
const GetByClass = (cls) => { return document.getElementByClass(cls); }

/* A game consists of a board, two players, one AI*/
const GAME = (() => {
	let tiles_filled = 0;
	let fill_success = -1;
	let player_turn = true;
	let status_bar = GetById("game__info");

	const set = () => {
		player_turn = (Date.now() % 2 == 1);
		if(player_turn) { status_bar.textContent = "Your turn";
		} else { status_bar.textContent = "Opponent's turn";
		}

		BOARD.clear_tiles();
	}

	const toggle_turn = () => {
		if(fill_success == 1) {
			tiles_filled++;
			player_turn = !player_turn;
			if(player_turn) { status_bar.textContent = "Your turn";
			} else { status_bar.textContent = "Opponent's turn";
			}
		}
	}
	
	const current_sign = () => {
		if(player_turn) { return "O";}
		return "X";
	}

	const set_success = (signal) => { fill_success = signal;}
	const get_winner = (sign) => {
		if(sign !== "O" && sign !== "X") { 
			if(tiles_filled == 9) {GetById("game__info").textContent = "No one wins!"; }
			return 
		}

		BOARD.freeze();
		if(sign === "O") { GetById("game__info").textContent = "You win!";
		} else if(sign == "X") { GetById("game__info").textContent = "AI wins!";
		}


	}
		

	return {set, toggle_turn, current_sign, get_winner, set_success}
})()

const board__tiles = () => {
	let cell = null;

	const bind = (element) => { cell = element; }
	const fill = () => { 
		cell.classList.add("anim_-shake");
		setTimeout(() => {
			cell.classList.remove("anim_-shake");
		}, 1000);

		if(cell.textContent === "") {
			cell.textContent = GAME.current_sign();
			return 1;
		}
		return -1;
	}
	
	const freeze = () => { 
		if(cell.textContent === "") {
			cell.textContent = " ";
		}
	}

	const get_content = () => {return cell.textContent; }
	const clear = () => {cell.textContent = ""; }
	return {fill, bind, clear, freeze, get_content}
}

/* A board consists of 9 tiles*/
const BOARD = (() => {
	let tiles = new Array(9)

	/* Presets */
	for(let idx = 0; idx < 9; idx++) {
		tiles[idx] = board__tiles()
	}

	const get_tiles = () => { return tiles; }
	const clear_tiles = () => {
		let board_tiles = GetById("tic-tac-toe").children;
		for(let idx = 0; idx < 9; idx++) {
			board_tiles[idx].classList.remove("cell--filled")
			tiles[idx].clear();
		}
	}

	const freeze = () => {
		for(let idx = 0; idx < 9; idx++) {
			tiles[idx].freeze();
		}
	}
	
	const scan = () => {
		let winner_sign = ""
		for(let idx = 0; idx < 3 && winner_sign == ""; idx++) {
			if(tiles[idx*3].get_content() == tiles[idx*3 + 1].get_content() && 
				tiles[idx*3].get_content() == tiles[idx*3 + 2].get_content()) 
			{
				winner_sign = tiles[idx*3].get_content();
			}
		}
		
		// Horizontal Check
		return winner_sign 
	}
	return {get_tiles, clear_tiles, scan, freeze}
})()

const GAMEAI = (() => {
	let my_opportunity = 0;
	let their_opportunity = 0;
	let stance = 0

	const analyze = () {

	}

	const think = () => {
		if(my_opportunity > their_opportunity) {stance = 1
		} else if(my_opportunity < their_opportunity) { stance = 0
		} else { stance = Date.time() % 2; }
	}
	
	const act = () => {

	}

	return {analyze, think, act};
})()

function initialize_site() {
	let board_tiles = GetById("tic-tac-toe").children;
	let BOARD_tiles = BOARD.get_tiles();
	
	for(let idx = 0; idx < 9; idx++) {
		BOARD_tiles[idx].bind(board_tiles[idx].children[0])
		board_tiles[idx].addEventListener("click", (e) => {
			board_tiles[idx].classList.add("cell--filled");
			GAME.set_success(BOARD_tiles[idx].fill())
			GAME.toggle_turn();
			GAME.get_winner(BOARD.scan());
		})
	}

	GAME.set();
	let button = GetById("game__start");
	button.addEventListener("click", () => {
		GAME.set();
		if(GAME.current_sign() === "X") {
			GAMEAI.think();
		}
	})
}

function main() {
	initialize_site();
}

main()

