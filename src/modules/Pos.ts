class Pos {
  element: HTMLElement

  constructor(element: HTMLElement) {
    this.element = element
  }

  // x
  get x(): number {
    return this.element.offsetLeft
  }

  set x(value: number) {
    this.element.style.left = value + 'px'
  }

  // y
  get y(): number {
    return this.element.offsetTop
  }

  set y(value: number) {
    this.element.style.top = value + 'px'
  }

  // size：大小
  get size(): number {
    return 10
  }
  // max: 游戏区域宽度（高度）/ size
  get max(): number {
    return 29
  }

  random(): number {
    return Math.round(Math.random() * this.max) * this.size
  }
}

export default Pos
