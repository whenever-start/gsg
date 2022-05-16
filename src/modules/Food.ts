import Pos from './Pos'

class Food {
  element: HTMLElement = document.querySelector('.food')!
  // food 的位置
  pos: Pos = new Pos(this.element)

  // food 位置随机改变
  changePos(units: Pos[]) {
    let x: number = this.pos.random()
    let y: number = this.pos.random()
    while (units.some((unit) => unit.x === x && unit.y === y)) {
      x = this.pos.random()
      y = this.pos.random()
    }

    this.pos.x = x
    this.pos.y = y
  }
}
export default Food
