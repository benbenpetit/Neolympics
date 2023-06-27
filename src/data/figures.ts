import { IFigure } from '@/core/types/IFigure'

export const NOLLIE_PATTERN = [
  [4, 2],
  [12, 13, 14],
]
export const NOLLIE: IFigure = {
  name: 'nollie',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [NOLLIE_PATTERN],
}
export const FS270_PATTERN = [[2, 1, 0, 3, 6, 9, 12, 13, 14]]
export const FS270: IFigure = {
  name: 'fs 270',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [FS270_PATTERN],
}
export const BOARDSLIDE_PATTERN = [
  [0, 1, 2],
  [12, 13, 14],
]
export const BOARDSLIDE: IFigure = {
  name: 'boardslide',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [BOARDSLIDE_PATTERN],
}
export const SLIDE270: IFigure = {
  name: 'SLIDE270',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [NOLLIE_PATTERN, FS270_PATTERN, BOARDSLIDE_PATTERN],
}

export const KICKFLIP_PATTERN = [
  [7, 4, 2],
  [12, 13, 14],
]

export const KICKFLIP: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_KickFlip',
  },
  module: 'ModuleKickflip',
  pattern: [KICKFLIP_PATTERN],
}

export const OLLIE_PATTERN = [
  [4, 2],
  [12, 13, 14],
]

export const OLLIE: IFigure = {
  name: 'ollie',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [OLLIE_PATTERN],
}
export const GRIND_PATTERN = [
  [9, 10, 11],
  [12, 13, 14],
]

export const GRIND: IFigure = {
  name: 'grind',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [GRIND_PATTERN],
}
export const NOLLIEKICK_PATTERN = [[0, 1, 2, 5]]

export const NOLLIEKICK: IFigure = {
  name: 'nollie kickflip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [NOLLIEKICK_PATTERN],
}

export const GRINDFLIP: IFigure = {
  name: 'grindflip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [OLLIE_PATTERN, GRIND_PATTERN, NOLLIEKICK_PATTERN],
}

export const B360_PATTERN = [[0, 1, 2, 5, 8, 11, 14, 13, 12]]

export const B360: IFigure = {
  name: 'back 360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [B360_PATTERN],
}

export const BACK360: IFigure = {
  name: 'back 360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [OLLIE_PATTERN, B360_PATTERN],
}

export const SHOVEIT_PATTERN = [
  [5, 4, 3],
  [9, 12, 13, 14],
]

export const SHOVEIT: IFigure = {
  name: 'shoveit',
  anims: {
    board: 'Move_Board_ShoveIt',
    perso: 'Move_P_ShoveIt',
  },
  module: 'ModuleShoveIt',
  pattern: [SHOVEIT_PATTERN],
}

export const PIGEON: IFigure = {
  name: 'pigeon',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_Kickflip',
  },
  pattern: [KICKFLIP_PATTERN],
}

export const FIGURES = [
  NOLLIE,
  FS270,
  BOARDSLIDE,
  KICKFLIP,
  OLLIE,
  GRIND,
  NOLLIEKICK,
  B360,
  SHOVEIT,
]

export const COMBOS = [PIGEON]
