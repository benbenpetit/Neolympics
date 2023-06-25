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
    perso: 'Move_P_KickFlip',
  },
  module: 'ModuleKickflip',
  pattern: [KICKFLIP_PATTERN],
}

export const GRINDFLIP_PATTERN = [[1, 2, 3]]

export const GRINDFLIP: IFigure = {
  name: 'grindflip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [GRINDFLIP_PATTERN],
}

export const SHOVEIT_PATTERN = [[4, 5, 6]]

export const SHOVEIT: IFigure = {
  name: 'shoveit',
  anims: {
    board: 'Move_Board_ShoveIt',
    perso: 'Move_P_ShoveIt',
  },
  module: 'ModuleShoveIt',
  pattern: [SHOVEIT_PATTERN],
}

export const BACK360_PATTERN = [[7, 8, 9]]

export const BACK360: IFigure = {
  name: 'back360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [BACK360_PATTERN],
}

export const PIGEON: IFigure = {
  name: 'pigeon',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_Kickflip',
  },
  pattern: [KICKFLIP_PATTERN],
}

export const FIGURES = [HARDFLIP, KICKFLIP, GRINDFLIP]

export const COMBOS = [PIGEON]
