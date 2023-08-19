const getFirstEle = (identifier) => { return document.querySelector(identifier);}
const getById = (id) => { return document.getElementById(id);}

const fBoardTiles = () => {
	let content = "";

	const fill = sign => { content = sign; }
	const seek = () => { return content;}
	return {fill, seek}
}

const GAME = (() => {
	let active_player = 0;
	let tiles_filled = 0;
	
	const draw = () => { active_player = Date.now() % 2; }
	const whoseTurn = () => { return active_player; }

	const switchPlayer = () => { 
		active_player = (active_player + 1) % 2; 
		tiles_filled++
	}
	
	const reset = () => {
		draw();
		tiles_filled = 0;
	}

	const whoWins = () => {
		let winner_sign = ""
		let tiles = BOARD.getTiles();
		for(let idx = 0; idx < 3 && winner_sign == ""; idx++) {
			if(tiles[idx*3].seek() == tiles[idx*3 + 1].seek() && 
				tiles[idx*3].seek() == tiles[idx*3 + 2].seek()) 
			{
				winner_sign = tiles[idx*3].seek();
			}
		}

		for(let idx = 0; idx < 3 && winner_sign == ""; idx++) {
			if(tiles[idx].seek() == tiles[3 + idx].seek() && 
				tiles[idx].seek() == tiles[6 + idx].seek()) 
			{
				winner_sign = tiles[idx].seek();
			}
		}

		let diag_right_match = (
			tiles[0].seek() == tiles[4].seek() &&
			tiles[0].seek() == tiles[8].seek())
		let diag_left_match = (
			tiles[2].seek() == tiles[4].seek() &&
			tiles[2].seek() == tiles[6].seek())
		if(diag_right_match || diag_left_match) {
			winner_sign = tiles[4].seek();
		}
		
		return winner_sign
	}

	const isOver = () => {
		let winner_sign = whoWins();
		if(winner_sign == "") {
			if(tiles_filled == 9) {
				return [true, -1]
			}
			return [false, 0]
		}
		
		return [true, (winner_sign == "O" ? 0: 1)];
	}

	return {whoseTurn, draw, switchPlayer, isOver, reset}
})()

const BOARD = (() => {
	let tiles = new Array(9);
	const getTiles = () => { return tiles; }
	
	const clear = () => {
		Object.values(tiles).forEach((tile) => {
			tile.fill("");
		})
	}

	for(let idx = 0; idx < 9; idx++) {
		tiles[idx] = fBoardTiles();
	}

	return {getTiles, clear}
})()

const PAGE_RENDERER = (() => {
	const BOARD_ele = getById("tic-tac-toe").children;
	const BOARD_tiles = BOARD.getTiles()
	const GAME_info = getById("game__info")
	
	const updateGameInfo = () => {
		let game_info = GAME.isOver();
		if(!game_info[0]) {
			GAME_info.textContent = (GAME.whoseTurn() == 0? "Your Turn" : "AI's Turn");
			return
		}

		if(game_info[1] == -1) { GAME_info.textContent = "It's a Draw! But still, you suck!";
		} else { GAME_info.textContent = (game_info[1] == 0? "You Win!": "You Suck!")
		}
	}

	const updateBoard = () => {
		Object.values(BOARD_ele).forEach((elem, idx) => {
			elem.firstChild.textContent = BOARD_tiles[idx].seek()
		})

		document.documentElement.style.setProperty("--color",
			(GAME.whoseTurn() == 0?  "62, 118, 84": "183, 69, 68")
		);
	}
	
	const triggerAnimation = (elem, keyframe_name, duration) => {
		elem.classList.add(keyframe_name);
		setTimeout(() => {
			elem.classList.remove(keyframe_name);
		}, duration*1000);
	}

	const initPage = () => {
		Object.values(BOARD_ele).forEach((elem, idx) => {
			elem.addEventListener("click", () => {
				triggerAnimation(elem.firstChild, "anim_-shake", 0.5)
				if(BOARD_tiles[idx].seek() == "" && !(GAME.isOver()[0])) {
					elem.classList.add("cell--filled");
					BOARD_tiles[idx].fill(
						GAME.whoseTurn() === 0? "O": "X"
					);
					GAME.switchPlayer();
					updateGameInfo();
					updateBoard(); 
				}
			})
		})

		getById("game__start").addEventListener("click", () => {
			GAME.reset();
			BOARD.clear();
			Object.values(BOARD_ele).forEach((elem) => {
				elem.classList.remove("cell--filled")
			})
			updateGameInfo();
			updateBoard();
		})

		updateGameInfo();
		updateBoard();
	}

	return {initPage}
})()


function main() {
	GAME.draw();
	PAGE_RENDERER.initPage();
}

main()
