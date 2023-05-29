class Cell {
  private _isAlive: boolean;
  readonly position: [number, number];
  neighborCount: number = 0;
  board: Board;
  neighbors: Cell[] = [];

  constructor(isAlive: boolean, position: [number, number], board:Board) {
    this._isAlive = isAlive
    this.position = position
    this.board = board
  }
  
  get isAlive():boolean {
    return this._isAlive;
  }

  beBorn():Cell {
    this._isAlive = true
    return this
  }

  die():Cell {
    this._isAlive = false
    return this
  }

  findNeighbors():Cell[] {
    // if (this.neighbors.length) return this.neighbors

    const [row, col] = this.position
    const grid = this.board.getCells()
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

  private shouldDieByUnderpopulation(count:number):boolean {
    return count < 2
  }

  private shouldDieByOverpopulation(count:number):boolean {
    return count > 3
  }

  private shouldBeBorn(count:number):boolean {
    return count === 3
  }

  countNeighbors():number {
    // if (!this.neighbors.length) this.findNeighbors()
    let count = 0
    this.neighbors.forEach((cell) => {
      if (cell.isAlive) count++
    })
    this.neighborCount = count
    return count
  }

  shouldDie():boolean {
    if(!this.isAlive) return false
    const count = this.countNeighbors()
    return this.shouldDieByUnderpopulation(count) ||
      this.shouldDieByOverpopulation(count)
  }

  next():Cell {
    const count = this.neighborCount

    if( this.shouldDie()) {
      return this.die();
    }
    if (this.shouldBeBorn(count)) {
      return this.beBorn();
    }
    return this;
  }
}

export class Board {
  private grid: Cell[][]
  constructor(rows:number = 3, cols?:number ) {
    if (!cols) cols = rows
    this.grid = new Array(rows).fill(false).map(
        () => new Array(cols).fill(false)
    )
    this.randomize()
  }

  empty():void {
    this.grid = this.grid.map((row) => row.map((cell) => cell.die()))
  }

  countNeighborsPerCell():number[][] {
    return this.grid.map((row) => row.map((cell) => cell.countNeighbors()))
  }

  next():void {
    this.grid.forEach((row) => row.forEach((cell) => cell.next()))
  }

  getCell(row:number, col:number):Cell {
    return this.grid[row][col]
  }

  randomize(oddsRate:number = 0.12):void {
    this.grid.forEach((row, i) => {
      row.forEach((_, j) => {
        this.grid[i][j] = new Cell(Math.random() < oddsRate, [i, j], this)})
    })
  }

  getCells():Cell[][] {
    return this.grid
  }

  getAsBoolean():boolean[][] {
    return this.grid.map((row) => row.map((cell) => cell.isAlive))
  }

  get cells():Cell[] {
    return this.grid.flat()
  }
}

export class Game {
  board: Board
  boardHistory: boolean[][][] = []

  constructor(row:number, col?:number) {
    this.board = new Board(row, col)
    this.board.randomize()
  }

  restart():void {
    this.board.randomize()
    this.boardHistory = []
  }

  getBoard():Cell[][] {
    return this.board.getCells()
  }

  empty():void {
    this.board.empty()
  }

  computeNeighbors():void {
    this.boardHistory.push(this.board.getAsBoolean())
    this.board.cells.forEach(cell => {
      cell.findNeighbors()
      cell.countNeighbors()
    })
  }

  next():void {
    this.addHistory()
    this.board.next()
  }

  addHistory():void {
    this.boardHistory.push(this.board.getAsBoolean())
  }
}

export function prettyPrintBoard(board: boolean[][]): void {
  console.log(board.map(row => row.map(cell => cell ? 'X' : 'O').join(' ')).join('\n'))
}

export function prettyNeiborsCount(board: number[][]): void {
  console.log(board.map(row => row.map(cell => cell).join(' ')).join('\n'))
}