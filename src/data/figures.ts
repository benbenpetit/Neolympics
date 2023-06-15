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
    board: 'Board_Kickflip',
    perso: 'KickFlip',
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

export const FIGURES = [HARDFLIP, KICKFLIP, OLLIE]

export const COMBOS = []
