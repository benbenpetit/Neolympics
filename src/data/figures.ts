import { IFigure } from '@/core/types/IFigure'

export const HARDFLIP: IFigure = {
  name: 'hardflip',
  anims: {
    board: 'Board_Hardflip',
    perso: 'P_Hardflip',
  },
  pattern: [[1, 6, 11, 12, 13, 8, 3]],
}

export const KICKFLIP: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Board_Kickflip',
    perso: 'KickFlip',
  },
  pattern: [[10, 6, 12, 13, 14]],
}

export const OLLIE: IFigure = {
  name: 'ollie',
  anims: {
    board: 'Board_Ollie',
    perso: 'P_Ollie',
  },
  pattern: [
    [0, 5, 10],
    [4, 9, 14],
  ],
}

export const FIGURES = [HARDFLIP, KICKFLIP, OLLIE]

export const COMBOS = []
