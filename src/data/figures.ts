import { IFigure } from '@/core/types/IFigure'

export const HARDFLIP_PATTERN = [[5, 4, 3, 6, 9, 10, 11]]

export const HARDFLIP: IFigure = {
  name: 'hardflip',
  anims: {
    board: 'Board_Hardflip',
    perso: 'P_Hardflip',
  },
  pattern: [HARDFLIP_PATTERN],
}

export const KICKFLIP_PATTERN = [[0, 4, 6, 9, 12]]

export const KICKFLIP: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_Kickflip',
  },
  pattern: [KICKFLIP_PATTERN],
}

export const OLLIE_PATTERN = [
  [0, 1, 2],
  [12, 13, 14],
]

export const OLLIE: IFigure = {
  name: 'ollie',
  anims: {
    board: 'Board_Ollie',
    perso: 'P_Ollie',
  },
  pattern: [OLLIE_PATTERN],
}

export const GRINDFLIP_PATTERN = [[1, 5, 9]]

export const GRINDFLIP: IFigure = {
  name: 'grindflip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  pattern: [GRINDFLIP_PATTERN],
}

export const PIGEON: IFigure = {
  name: 'pigeon',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_Kickflip',
  },
  pattern: [OLLIE_PATTERN, KICKFLIP_PATTERN],
}

export const FIGURES = [HARDFLIP, KICKFLIP, OLLIE, GRINDFLIP]

export const COMBOS = [PIGEON]
