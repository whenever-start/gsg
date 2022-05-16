class ScorePanel {
  private scoreElt: HTMLElement = document.querySelector('.game .score')!
  private levelElt: HTMLElement = document.querySelector('.game .level')!
  private score: number = 0
  level: number = 0
  // 最高等级
  private maxLevel: number = 10
  // 几分升一级
  private base: number = 1

  constructor() {
    // init
    this.updateScoreElt()
    this.updateLevelElt()
  }

  // 增加分数
  increaseScore() {
    this.score++
    this.updateScoreElt()
    if (this.base > 0 && this.score % this.base === 0) {
      this.levelUP()
    }
  }

  // 增加等级
  levelUP() {
    this.level++
    this.level = Math.min(this.level, this.maxLevel)
    this.updateLevelElt()
  }

  // 重置分数
  resetScore() {
    this.score = 0
    this.updateScoreElt()
  }

  // 重置等级
  resetLevel() {
    this.level = 0
    this.updateLevelElt()
  }

  // score 元素内容
  private updateScoreElt() {
    this.scoreElt.innerHTML = this.score + ''
  }

  // level 元素内容
  private updateLevelElt() {
    this.levelElt.innerHTML = this.level + ''
  }
}

export default ScorePanel
