const getFirstEle = (identifier) => { return document.querySelector(identifier);}
const getById = (id) => { return document.getElementById(id);}


const fBoardTiles = () => {
	let content = "";

	const fill = sign => { content = sign; }
	const seek = () => { return content;}
	return {fill, seek}
}

const deep_copy_board = (thing) => {
	let dupe_thing = [];
	for(let idx = 0; idx < thing.length; idx++) {
		let temp = fBoardTiles();
		temp.fill(thing[idx].seek())
		dupe_thing.push(temp)
	}
	return dupe_thing
}

const GAME = (() => {
	let active_player = 0;
	let tiles_filled = 0;
	
	const draw = () => { active_player = (Date.now() % 5 == 1? 0: 1); }
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

	const whoWins = (tiles) => {
		let winner_sign = ""
		for(let idx = 0; idx < 3 && winner_sign == ""; idx++) {
			if(tiles[idx*3].seek() == tiles[idx*3 + 1].seek() && 
				tiles[idx*3].seek() == tiles[idx*3 + 2].seek()) 
			{ winner_sign = tiles[idx*3].seek(); }
		}

		for(let idx = 0; idx < 3 && winner_sign == ""; idx++) {
			if(tiles[idx].seek() == tiles[3 + idx].seek() && 
				tiles[idx].seek() == tiles[6 + idx].seek()) 
			{ winner_sign = tiles[idx].seek(); }
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

	const isOver = (tiles = BOARD.getTiles()) => {
		let winner_sign = whoWins(tiles);
		if(winner_sign == "") {
			if(tiles_filled == 9) { return [true, 0] }
			return [false, 0]
		}
		
		return [true, (winner_sign == "O"? 1: -1)];
	}

	return {whoseTurn, draw, switchPlayer, isOver, reset}
})()

const BOARD = (() => {
	let tiles = new Array(9);
	const getTiles = () => { return tiles; }
	
	const clear = () => {
		Object.values(tiles).forEach(tile => { tile.fill(""); })
	}

	for(let idx = 0; idx < 9; idx++) { tiles[idx] = fBoardTiles(); }
	return {getTiles, clear}
})()

const GAMEAI = (() => {
	let max_depth = 0;
	let last_move = 696969;

	const setDepth = depth => {max_depth = depth; }
	const tellDepth = () => {return max_depth; }
	const tellMyMove = () => { return last_move; }

	const observe = (tiles = BOARD.getTiles()) => {
		let empty_tiles = [];
		Object.values(tiles).forEach((tile, idx) => {
			if(tile.seek() == "") { empty_tiles.push(idx); }
		})
		return empty_tiles;
	}

	const FindBestMove = (depth_left, current_board, my_turn) => {
		let empty_tiles = observe(current_board);
		let game_info = GAME.isOver(current_board);
		if(depth_left > 0 && game_info[0] == false && empty_tiles.length > 0) {
			let score_list = []
			empty_tiles.forEach(empty_pos => {
				let next_board = deep_copy_board(current_board);
				next_board[empty_pos].fill(my_turn? "X": "O");
				score_list.push(FindBestMove(
					depth_left - 1, next_board, !my_turn
				));
			})
				
			return (my_turn? Math.max(...score_list): Math.min(...score_list))
			/* if(max_depth - depth_left == 0) {
				console.log(my_turn? "X": "O", empty_tiles, score_list, 
					my_turn? Math.max(...score_list): Math.min(...score_list)
				)
			} */

		}
		return -game_info[1]; // AI_lose, draw, AI_win = -1, 0, 1
	}

	const routine = () => {
		let empty_tiles = observe()
		if(empty_tiles.length == 9) {
			last_move = Date.now() % 9;
		} else if(max_depth == 0) {
			last_move = empty_tiles[Date.now() % empty_tiles.length];
		} else {
			let score_list = []
			// console.log("Before routine work! ", observe())
			empty_tiles.forEach(empty_pos => {
				let next_board = deep_copy_board(BOARD.getTiles());
				next_board[empty_pos].fill("X");
				score_list.push(FindBestMove(max_depth, next_board, false));
			})
			
			let best = 0
			for(let idx = best + 1; idx < score_list.length; idx++) {
				if(score_list[best] < score_list[idx]) { best = idx; }
			}
			// console.log("Final result:", empty_tiles, score_list, best)
			last_move = empty_tiles[best]
		}
		
		BOARD.getTiles()[last_move].fill("X");
		// console.log(last_move, "After routine work! ", observe())
	}

	return {setDepth, tellDepth, routine, tellMyMove};
})()

const PAGE_MANAGER = (() => {
	const BOARD_ele = getById("tic-tac-toe").children;
	const BOARD_tiles = BOARD.getTiles();
	const GAME_info = getById("game__info");
	const fl__game_diff = getById("fl--game-diff");
	const diff_buttons = getById("diff-list").children;

	const updateGameInfo = () => {
		let game_info = GAME.isOver();
		if(!game_info[0]) {
			GAME_info.textContent = (GAME.whoseTurn() == 0? "Your Turn" : "AI's Turn");
			return
		}

		if(game_info[1] == 0) { GAME_info.textContent = "It's a Draw!";
		} else { GAME_info.textContent = (game_info[1] == 1? "You Win!": "You lose! :(")
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
		BOARD.clear();
		GAME.reset();
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

	const handleDiffButtons = (diff) => {
		let prev_diff = GAMEAI.tellDepth();
		switch(prev_diff) {
			case 0: diff_buttons[0].firstChild.classList.remove("button--active-light"); break;
			case 2: diff_buttons[1].firstChild.classList.remove("button--active-light"); break;
			case 9: diff_buttons[2].firstChild.classList.remove("button--active-light"); break;
		}

		GAMEAI.setDepth(diff);
		switch(diff) {
			case 0: diff_buttons[0].firstChild.classList.add("button--active-light"); break;
			case 2: diff_buttons[1].firstChild.classList.add("button--active-light"); break;
			case 9: diff_buttons[2].firstChild.classList.add("button--active-light"); break;
		}

		fl__game_diff.style.display = "none";
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
		getById("diff--medium").addEventListener("click", () => { handleDiffButtons(2); doResetRoutine(); })
		getById("diff--hell").addEventListener("click", () => { handleDiffButtons(9); doResetRoutine(); })
		getById("button--flgame-diff").addEventListener("click", () => {
			if(fl__game_diff.style.display == "block") { fl__game_diff.style.display = "none";
			} else { fl__game_diff.style.display = "block";
			}
		})

		updateGameInfo();
		updateBoard();
	}

	return {initPage}
})()


function main() {
	GAME.reset()
	GAMEAI.setDepth(0);
	PAGE_MANAGER.initPage();
}

main()
