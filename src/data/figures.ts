import { IFigure } from '@/core/types/IFigure'

export const KICKFLIP_EASY_1: IFigure = {
  name: 'kickflip',
  pattern: [
    [
      [12, 13, 14],
      [7, 4, 2],
    ],
  ],
}
export const KICKFLIP_EASY: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_KickFlip',
  },
  module: 'ModuleKickflip',
  pattern: [KICKFLIP_EASY_1.pattern[0]],
}

export const KICKFLIP_MEDIUM_1: IFigure = {
  name: 'kickflip',
  pattern: [[[7, 4, 2]]],
}
export const KICKFLIP_MEDIUM_2: IFigure = {
  name: 'kickflip',
  pattern: [
    [
      [9, 12],
      [11, 14],
    ],
  ],
}
export const KICKFLIP_MEDIUM: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_KickFlip',
  },
  module: 'ModuleKickflip',
  pattern: [KICKFLIP_MEDIUM_1.pattern[0], KICKFLIP_MEDIUM_2.pattern[0]],
}

export const KICKFLIP_HARD_1: IFigure = {
  name: 'kickflip',
  pattern: [
    [
      [9, 12],
      [11, 14],
    ],
  ],
}
export const KICKFLIP_HARD_2: IFigure = {
  name: 'kickflip',
  pattern: [[[7, 4, 2]]],
}
export const KICKFLIP_HARD_3: IFigure = {
  name: 'kickflip',
  pattern: [
    [
      [2, 4],
      [10, 14],
    ],
  ],
}
export const KICKFLIP_HARD: IFigure = {
  name: 'kickflip',
  anims: {
    board: 'Move_Board_Kickflip',
    perso: 'Move_P_KickFlip',
  },
  module: 'ModuleKickflip',
  pattern: [
    KICKFLIP_HARD_1.pattern[0],
    KICKFLIP_HARD_2.pattern[0],
    KICKFLIP_HARD_3.pattern[0],
  ],
}

export const SHOVEIT_EASY_1: IFigure = {
  name: 'shove it',
  pattern: [
    [
      [5, 4, 3],
      [9, 12, 13, 14],
    ],
  ],
}
export const SHOVEIT_EASY: IFigure = {
  name: 'shove it',
  anims: {
    board: 'Move_Board_ShoveIt',
    perso: 'Move_P_ShoveIt',
  },
  module: 'ModuleShoveIt',
  pattern: [SHOVEIT_EASY_1.pattern[0]],
}

export const SHOVEIT_MEDIUM_1: IFigure = {
  name: 'shove it',
  pattern: [[[9, 12, 13, 14]]],
}
export const SHOVEIT_MEDIUM_2: IFigure = {
  name: 'shove it',
  pattern: [[[8, 5, 4, 3]]],
}
export const SHOVEIT_MEDIUM: IFigure = {
  name: 'shove it',
  anims: {
    board: 'Move_Board_ShoveIt',
    perso: 'Move_P_ShoveIt',
  },
  module: 'ModuleShoveIt',
  pattern: [SHOVEIT_MEDIUM_1.pattern[0], SHOVEIT_MEDIUM_2.pattern[0]],
}

export const SHOVEIT_HARD_1: IFigure = {
  name: 'shove it',
  pattern: [[[9, 12, 13, 14]]],
}
export const SHOVEIT_HARD_2: IFigure = {
  name: 'shove it',
  pattern: [[[8, 5, 4, 3]]],
}
export const SHOVEIT_HARD_3: IFigure = {
  name: 'shove it',
  pattern: [
    [
      [3, 4, 5],
      [14, 13, 12],
    ],
  ],
}
export const SHOVEIT_HARD: IFigure = {
  name: 'shove it',
  anims: {
    board: 'Move_Board_ShoveIt',
    perso: 'Move_P_ShoveIt',
  },
  module: 'ModuleShoveIt',
  pattern: [
    SHOVEIT_HARD_1.pattern[0],
    SHOVEIT_HARD_2.pattern[0],
    SHOVEIT_HARD_3.pattern[0],
  ],
}

export const BACK360_EASY_1: IFigure = {
  name: 'back 360',
  pattern: [[[0, 1, 2, 5, 8, 11, 14, 13, 12, 9, 6, 3]]],
}
export const BACK360_EASY: IFigure = {
  name: 'back 360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [BACK360_EASY_1.pattern[0]],
}

export const BACK360_MEDIUM_1: IFigure = {
  name: 'back 360',
  pattern: [
    [
      [4, 2],
      [12, 13, 14],
    ],
  ],
}
export const BACK360_MEDIUM_2: IFigure = {
  name: 'back 360',
  pattern: [[[0, 1, 2, 5, 8, 11, 14, 13, 12, 9, 6, 3]]],
}
export const BACK360_MEDIUM: IFigure = {
  name: 'back 360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [BACK360_MEDIUM_1.pattern[0], BACK360_MEDIUM_2.pattern[0]],
}

export const BACK360_HARD_1: IFigure = {
  name: 'ollie',
  pattern: [
    [
      [4, 2],
      [12, 13, 14],
    ],
  ],
}
export const BACK360_HARD_2: IFigure = {
  name: 'back 360',
  pattern: [[[0, 1, 2, 5, 8]]],
}
export const BACK360_HARD_3: IFigure = {
  name: 'back 360',
  pattern: [[[14, 13, 12, 9, 6, 3]]],
}
export const BACK360_HARD: IFigure = {
  name: 'back 360',
  anims: {
    board: 'Move_Board_Back3',
    perso: 'Move_P_Back3',
  },
  module: 'ModuleBack360',
  pattern: [
    BACK360_HARD_1.pattern[0],
    BACK360_HARD_2.pattern[0],
    BACK360_HARD_3.pattern[0],
  ],
}

export const GRINDFLIP_EASY_1: IFigure = {
  name: 'grind flip',
  pattern: [
    [
      [0, 1, 2, 5],
      [9, 10, 11],
      [12, 13, 14],
    ],
  ],
}
export const GRINDFLIP_EASY: IFigure = {
  name: 'grind flip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [GRINDFLIP_EASY_1.pattern[0]],
}

export const GRINDFLIP_MEDIUM_1: IFigure = {
  name: 'grind flip',
  pattern: [
    [
      [9, 10, 11],
      [12, 13, 14],
    ],
  ],
}
export const GRINDFLIP_MEDIUM_2: IFigure = {
  name: 'grind flip',
  pattern: [[[0, 1, 2, 5]]],
}
export const GRINDFLIP_MEDIUM: IFigure = {
  name: 'grind flip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [GRINDFLIP_MEDIUM_1.pattern[0], GRINDFLIP_MEDIUM_2.pattern[0]],
}

export const GRINDFLIP_HARD_1: IFigure = {
  name: 'ollie',
  pattern: [
    [
      [5, 2],
      [12, 13, 14],
    ],
  ],
}
export const GRINDFLIP_HARD_2: IFigure = {
  name: 'grind',
  pattern: [
    [
      [9, 10, 11],
      [12, 13, 14],
    ],
  ],
}
export const GRINDFLIP_HARD_3: IFigure = {
  name: 'flip',
  pattern: [[[0, 1, 2, 5]]],
}
export const GRINDFLIP_HARD: IFigure = {
  name: 'grind flip',
  anims: {
    board: 'Move_Board_Grind_Flip',
    perso: 'Move_P_Grind_Flip',
  },
  module: 'ModuleGrindFlip',
  pattern: [
    GRINDFLIP_HARD_1.pattern[0],
    GRINDFLIP_HARD_2.pattern[0],
    GRINDFLIP_HARD_3.pattern[0],
  ],
}

export const FB270_EASY_1: IFigure = {
  name: '270 Frontside Boardslide',
  pattern: [
    [
      [2, 1, 0, 3, 6, 9, 12, 13, 14],
      [7, 8],
    ],
  ],
}
export const FB270_EASY: IFigure = {
  name: 'FS 270',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [FB270_EASY_1.pattern[0]],
}

export const FB270_MEDIUM_1: IFigure = {
  name: '270',
  pattern: [[[2, 1, 0, 3, 6, 9, 12, 13, 14]]],
}
export const FB270_MEDIUM_2: IFigure = {
  name: '270 Frontside Boardslide',
  pattern: [
    [
      [0, 1, 2],
      [12, 13, 14],
    ],
  ],
}
export const FB270_MEDIUM: IFigure = {
  name: 'FS 270',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [FB270_MEDIUM_1.pattern[0], FB270_MEDIUM_2.pattern[0]],
}

export const FB270_HARD_1: IFigure = {
  name: 'Nollie',
  pattern: [
    [
      [2, 1, 0],
      [10, 12],
    ],
  ],
}
export const FB270_HARD_2: IFigure = {
  name: '270',
  pattern: [[[2, 1, 0, 3, 6, 9, 12, 13, 14]]],
}
export const FB270_HARD_3: IFigure = {
  name: '270 Frontside Boardslide',
  pattern: [
    [
      [0, 1, 2],
      [12, 13, 14],
    ],
  ],
}
export const FB270_HARD: IFigure = {
  name: 'FS 270',
  anims: {
    board: 'Move_Board_270Slide',
    perso: 'Move_P_270Slide',
  },
  module: 'Module270',
  pattern: [FB270_HARD_1.pattern[0], FB270_HARD_1.pattern[0], FB270_HARD_1.pattern[0]],
}

export const FIGURES = [
  KICKFLIP_EASY_1,
  KICKFLIP_EASY,
  KICKFLIP_MEDIUM_1,
  KICKFLIP_MEDIUM_2,
  KICKFLIP_MEDIUM,
  KICKFLIP_HARD_1,
  KICKFLIP_HARD_2,
  KICKFLIP_HARD_3,
  KICKFLIP_HARD,
  //
  SHOVEIT_EASY_1,
  SHOVEIT_EASY,
  SHOVEIT_MEDIUM_1,
  SHOVEIT_MEDIUM_2,
  SHOVEIT_MEDIUM,
  SHOVEIT_HARD_1,
  SHOVEIT_HARD_2,
  SHOVEIT_HARD_3,
  SHOVEIT_HARD,
  //
  BACK360_EASY_1,
  BACK360_EASY,
  BACK360_MEDIUM_1,
  BACK360_MEDIUM_2,
  BACK360_MEDIUM,
  BACK360_HARD_1,
  BACK360_HARD_2,
  BACK360_HARD_3,
  BACK360_HARD,
  //
  GRINDFLIP_EASY_1,
  GRINDFLIP_EASY,
  GRINDFLIP_MEDIUM_1,
  GRINDFLIP_MEDIUM_2,
  GRINDFLIP_MEDIUM,
  GRINDFLIP_HARD_1,
  GRINDFLIP_HARD_2,
  GRINDFLIP_HARD_3,
  GRINDFLIP_HARD,
  //
  FB270_EASY_1,
  FB270_EASY,
  FB270_MEDIUM_1,
  FB270_MEDIUM_2,
  FB270_MEDIUM,
  FB270_HARD_1,
  FB270_HARD_2,
  FB270_HARD_3,
  FB270_HARD,
]

export const FIGURES_EASY = [
  KICKFLIP_EASY,
  SHOVEIT_EASY,
  BACK360_EASY,
  GRINDFLIP_EASY,
  FB270_EASY,
]

export const FIGURES_MEDIUM = [
  KICKFLIP_MEDIUM,
  SHOVEIT_MEDIUM,
  BACK360_MEDIUM,
  GRINDFLIP_MEDIUM,
  FB270_MEDIUM,
]

export const FIGURES_HARD = [
  KICKFLIP_HARD,
  SHOVEIT_HARD,
  BACK360_HARD,
  GRINDFLIP_HARD,
  FB270_HARD,
]
