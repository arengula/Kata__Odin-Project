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
		if(whoseTurn() == 1) { GAMEAI.routine(); }
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

const GAMEAI = (() => {
	let max_depth = 0;
	let initial_empty_pos = [];
	let last_move = 696969;

	const setDepth = depth => {max_depth = depth; }
	const tellDepth = () => {return max_depth; }
	const tellMyMove = () => { return last_move; }

	const recon = () => {
		Object.values(BOARD.getTiles()).forEach((tile, idx) => {
			if(tile.seek() == "") { initial_empty_pos.push(idx); }
		})
	}

	const project = (depth_left, current_board, next_fill) => { }

	const routine = () => {
		initial_empty_pos = []
		recon()

		let ideal_pos = Date.now() % 9;
		if(initial_empty_pos.length == 9) {
			last_move = ideal_pos
			BOARD.getTiles()[ideal_pos].fill("X");
			return
		}

		if(max_depth == 0) {
			ideal_pos = initial_empty_pos[Date.now() % initial_empty_pos.length];
			last_move = ideal_pos
		}
		return ideal_pos
	}

	return {setDepth, tellDepth, routine, tellMyMove};
})()

const PAGE_RENDERER = (() => {
	const BOARD_ele = getById("tic-tac-toe").children;
	const BOARD_tiles = BOARD.getTiles();
	const GAME_info = getById("game__info");
	const diff_buttons = getById("diff-list").children;

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

	const handleAIMoves = () => {
		BOARD_tiles[GAMEAI.tellMyMove()].fill("X");
		let elem = BOARD_ele[GAMEAI.tellMyMove()]
		elem.classList.add("cell--filled");
		triggerAnimation(elem.firstChild, "anim_-shake", 0.5)
	}

	const doResetRoutine = () => {
		GAME.reset();
		BOARD.clear();
		Object.values(BOARD_ele).forEach((elem) => {
			elem.classList.remove("cell--filled")
		})

		if(GAME.whoseTurn() != 0) {
			handleAIMoves();
			GAME.switchPlayer();
		}
		updateGameInfo();
		updateBoard();

	}

	const handleDiffButtons = (diff, thing) => {
		let prev_diff = GAMEAI.tellDepth();
		switch(prev_diff) {
			case 0: diff_buttons[0].firstChild.classList.remove("button--active-light"); break;
			case 4: diff_buttons[1].firstChild.classList.remove("button--active-light"); break;
			case 9: diff_buttons[2].firstChild.classList.remove("button--active-light"); break;
		}

		GAMEAI.setDepth(diff);
		switch(diff) {
			case 0: diff_buttons[0].firstChild.classList.add("button--active-light"); break;
			case 4: diff_buttons[1].firstChild.classList.add("button--active-light"); break;
			case 9: diff_buttons[2].firstChild.classList.add("button--active-light"); break;
		}
	}

	const initPage = () => {
		if(GAME.whoseTurn() != 0) {
			handleAIMoves();
			GAME.switchPlayer();
		}

		Object.values(BOARD_ele).forEach((elem, idx) => {
			elem.addEventListener("click", () => {
				triggerAnimation(elem.firstChild, "anim_-shake", 0.5)
				if(BOARD_tiles[idx].seek() == "" && !(GAME.isOver()[0])) {
					elem.classList.add("cell--filled");
					BOARD_tiles[idx].fill("O");
					GAME.switchPlayer();

					if(!GAME.isOver()[0]) {
						GAMEAI.routine();
						handleAIMoves();
						GAME.switchPlayer();
					}

					updateGameInfo();
					updateBoard(); 
				}
			})
		})

		getById("game__start").addEventListener("click", () => { doResetRoutine(); })
		getById("diff--easy").addEventListener("click", () => { handleDiffButtons(0); doResetRoutine(); })
		getById("diff--medium").addEventListener("click", () => { handleDiffButtons(4); doResetRoutine(); })
		getById("diff--hell").addEventListener("click", () => { handleDiffButtons(9); doResetRoutine(); })

		updateGameInfo();
		updateBoard();
	}

	return {initPage}
})()


function main() {
	GAME.reset()
	GAMEAI.setDepth(0);
	PAGE_RENDERER.initPage();
}

main()
