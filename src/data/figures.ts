import { IFigure } from '@/core/types/IFigure'

export const HARDFLIP: IFigure = {
  name: 'hardflip',
  anims: {
    board: 'Board_Hardflip',
    perso: 'P_Hardflip',
  },
  pattern: [[5, 4, 3, 6, 9, 10, 11]],
}

export const KICKFLIP: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_Kickflip',
  },
  pattern: [[0, 4, 6, 9, 12]],
}

export const OLLIE: IFigure = {
  name: 'ollie',
  anims: {
    board: 'Board_Ollie',
    perso: 'P_Ollie',
  },
  pattern: [
    [0, 1, 2],
    [12, 13, 14],
  ],
}

export const GRINDFLIP: IFigure = {
  name: 'grindflip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  pattern: [
    [0, 1, 2],
    [12, 13, 14],
  ],
}

export const FIGURES = [HARDFLIP, KICKFLIP, OLLIE, GRINDFLIP]

export const COMBOS = []
