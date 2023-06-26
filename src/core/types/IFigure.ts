export interface IFigure {
  name: string
  anims: {
    board: string
    perso: string
  }
  module?: string
  pattern: number[][][]
}
