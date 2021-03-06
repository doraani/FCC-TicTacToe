
let State = function(old, player) {
    this.turn = player;
    this.moveCount = 0;
    this.result = "playing";

    if(typeof old !== "undefined") {
      // if the state is constructed using a copy of another state
      this.board = old.board.copyBoard(old.board);

      this.moveCount = old.moveCount;
      this.result = old.result;
      this.turn = old.turn;
    } else {
      this.board = new Board(boardSize, this.turn);
    }

    this.advanceTurn = function() {
        this.turn = (this.turn === "X" ? "O" : "X");
        this.board.switch_player();
        this.moveCount++;
    }

    /* list the empy cells */
    this.emptyCells = function() {
      return this.board.emptyCells();
    }

    this.isTerminal = function() {
      return this.board.game_end;
    }

    this.play = function(i,j) {
      let res = this.board.play(i,j);
      if ( typeof(res) === "string" )
        this.result = res;
    }
}

State.prototype.score = function() {
    if(this.result === "AI-won"){
        return 10;
    }
    else if(this.result === "player-won") {
        return -10;
    }
    else if (this.result === "drawn") {
        return 0;
    }
}
