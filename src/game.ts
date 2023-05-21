class Cell {
  private _isAlive: boolean;
  private _position: [number, number];
  static board: Board;
  neighbors: Cell[] = [];

  constructor(isAlive: boolean, position: [number, number]) {
    this._isAlive = isAlive
    this._position = position
  }

  get position():[number, number] {
    return this._position;
  }
  
  get isAlive():boolean {
    return this._isAlive;
  }

  beBorn():void {
    this._isAlive = true
  }

  die():void {
    this._isAlive = false
  }

  private findNeighbors(board:Board):Cell[] {
    if (this.neighbors.length) return this.neighbors

    const [row, col] = this.position
    const grid = board.getCells()
    const rows = grid.length
    const cols = grid[0].length
    const neighbors:Cell[] = []

    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i >= rows) continue
      for (let j = col - 1; j <= col + 1; j++) {
        if (j < 0 || j >= cols || (i === row && j === col)) continue
        neighbors.push(grid[i][j])
      }
    }

    this.neighbors = neighbors;
    return neighbors
  }

  countNeighbors(board:Board):number {
    if (!this.neighbors) this.findNeighbors(board)
    let count = 0
    this.neighbors.forEach((cell) => {
      if (cell.isAlive) count++
    })

    return count
  }
}

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

  randomize(oddsRate:number = 0.2):void {
    this.grid.forEach((row, i) => {
      row.forEach((_, j) => {
        this.grid[i][j] = new Cell(Math.random() < oddsRate, [i, j])})
    })
  }

  getCells():Cell[][] {
    return this.grid
  }

  getAsBoolean():boolean[][] {
    return this.grid.map((row) => row.map((cell) => cell.isAlive))
  }
}

export class Game {
  board: Board

  constructor(board: Board) {
    this.board = board
    this.board.randomize()
  }

  getBoard():Cell[][] {
    return this.board.getCells()
  }
}
