import Pos from './Pos'
import { Direction } from '../config/index'

class Snake {
  // 蛇头
  head: Pos
  // 蛇身（全部）
  units: Pos[] = []
  element: HTMLElement = document.querySelector('.snake')!

  private size: number
  private max: number
  alive: boolean = true

  constructor() {
    // head
    const headElt = document.createElement('div')
    headElt.className = 'snake-unit head'
    this.head = new Pos(headElt)
    this.head.x = this.head.random()
    this.head.y = this.head.random()
    this.units.push(this.head)
    this.element.appendChild(headElt)

    this.size = this.head.size
    this.max = this.head.max
  }

  reset() {
    // 元素
    const head = document.querySelector('.snake-unit.head')?.outerHTML
    this.element.innerHTML = head as string

    this.head = new Pos(document.querySelector('.snake-unit.head')!)

    // units
    this.units = [this.head]

    // pos
    this.head.x = this.head.random()
    this.head.y = this.head.random()

    // alive
    this.alive = true
  }

  // 蛇移动
  move(direction: Direction = Direction.right) {
    if (!this.alive) {
      return
    }

    let x = this.head.x
    let y = this.head.y

    switch (direction) {
      case Direction.bottom:
        y += this.size
        break

      case Direction.top:
        y -= this.size
        break

      case Direction.left:
        x -= this.size
        break

      case Direction.right:
        x += this.size
        break
    }

    // 撞边或撞到自己：dead
    if (this.isArriveSelf(x, y) || this.isArriveEdge(x, y)) {
      this.alive = false
      return
    }
    window.requestAnimationFrame(() => {
      this.moveBody()
      this.head.x = x
      this.head.y = y
    })
  }

  // body(不包括蛇头)
  moveBody() {
    const len = this.units.length
    for (let i = len - 1; i > 0; i--) {
      this.units[i].x = this.units[i - 1].x
      this.units[i].y = this.units[i - 1].y
    }
  }

  // 是否撞边
  isArriveEdge(x: number, y: number) {
    let xEdge = x < 0 || x > this.max * this.size
    let yEdge = y < 0 || y > this.max * this.size
    return xEdge || yEdge ? true : false
  }

  // 是否撞到自身
  isArriveSelf(x: number, y: number) {
    return this.units.slice(1).some((unit) => x === unit.x && y === unit.y)
  }

  // 吃到 food 增长
  grow() {
    const el = document.createElement('div')
    const pos = new Pos(el)
    el.className = 'snake-unit'
    this.units.push(pos)
    this.element.appendChild(el)
  }
}

export default Snake
