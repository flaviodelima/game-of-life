type Cell = boolean

export class Board {
  private grid: Cell[][]

  constructor(rows:number = 3, cols:number = 3) {
    this.grid = new Array(rows).fill(false).map(
        () => new Array(cols).fill(false)
    )
  }

  getCell(row:number, col:number):Cell {
    return this.grid[row][col]
  }

  setCell(row:number, col:number, value:Cell):void {
    this.grid[row][col] = value
  }

  randomize(oddsRate:number = 0.2):void {
    this.grid.forEach((row, i) => {
      row.forEach((_, j) => {
        this.setCell(i, j, Math.random() < oddsRate)
      })
    })
  }

  getBoard():Cell[][] {
    return this.grid
  }
}

export class Game {
  board: Board

  constructor(board: Board) {
    this.board = board
    this.board.randomize()
  }

  getBoard():Cell[][] {
    return this.board.getBoard()
  }
}
