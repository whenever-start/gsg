import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'
import { Direction } from '../config/index'

// 游戏控制
class Game {
  private snake: Snake = new Snake()
  private food: Food = new Food()
  private scorePanel: ScorePanel = new ScorePanel()
  private direction: Direction = Direction.right
  private timer: number = 0
  private handle = this.keyboardHandle.bind(this)
  private baseSpeed: number = 200
  private perSpeed: number = 20
  private restartElt: HTMLElement = document.querySelector('#restart')!

  constructor() {
    this.restartElt.addEventListener('click', this.restart.bind(this))
    this.start()
  }

  // 游戏开始
  start() {
    this.food.changePos(this.snake.units)
    document.addEventListener('keydown', this.handle)
  }

  restart() {
    this.snake.alive = false
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = 0
    this.start()
    this.scorePanel.resetLevel()
    this.scorePanel.resetScore()
    this.snake.reset()
  }

  // 键盘控制
  private keyboardHandle(event: KeyboardEvent) {
    if (Object.values(Direction).includes(event.key as Direction)) {
      event.preventDefault()

      // 掉头
      if (this.doBack(event.key as Direction, this.direction)) {
        return
      }

      this.direction = event.key as Direction
      this.run(this.direction)
    }
  }

  // 蛇 run
  run(direction: Direction) {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.isGetFood()) {
      this.eat()
    }
    // dead
    if (!this.snake.alive) {
      this.gameOver()
      return
    }
    this.snake.move(direction)
    this.timer = window.setInterval(
      this.run.bind(this, direction),
      this.baseSpeed - this.perSpeed * this.scorePanel.level
    )
  }

  // 是否掉头
  private doBack(prev: Direction, cur: Direction): boolean {
    if (this.snake.units.length <= 1) {
      return false
    }
    // left-right top-bottom
    let xBack =
      (prev === Direction.left && cur === Direction.right) ||
      (cur === Direction.left && prev === Direction.right)
    let yBack =
      (prev === Direction.top && cur === Direction.bottom) ||
      (cur === Direction.top && prev === Direction.bottom)
    return xBack || yBack
  }

  // 吃
  private eat() {
    this.scorePanel.increaseScore()
    this.snake.grow()
    this.food.changePos(this.snake.units)
  }

  // 是否到达 food 位置
  private isGetFood(): boolean {
    return (
      this.food.pos.x === this.snake.head.x &&
      this.food.pos.y === this.snake.head.y
    )
  }

  // 游戏结束
  gameOver() {
    window.alert('游戏失败！')
    document.removeEventListener('keydown', this.handle)
  }
}

export default Game
