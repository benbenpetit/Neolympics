import { IQuestion } from '@/core/types/IQuiz'

export const QUESTIONS_DATA: IQuestion[] = [
  {
    question: `Belle performance ! Quelle était cette dernière figure ?`,
    answer: 1,
    options: ['OLLIE', 'KICKFLIP', 'SHOVE-IT', 'PIGEON FLIP'],
    selected: null,
    img: '/img/skater.jpg',
    info: `Le kickflip, ou simplement flip, est une figure de skateboard, inventée par Curt Lindren, en 1978, puis modifiée et popularisée par Rodney Mullen. Autrefois, on l'appelait encore magic flip, ollie flip ou ollie kickflip. Le but d'un kickflip est de sauter et de faire vriller la planche autour de son axe longitudinal, lui faisant effectuer une rotation de 360°.`,
  },
  {
    question: "Qu'est ce qu'un skatepark ?",
    answer: 0,
    options: [
      'LIEU DE SKATE',
      'COMPETITION DE SKATE',
      'MAGASIN DE SKATE',
      'PARC DE LOISIR',
    ],
    selected: null,
    img: '/img/quoi.jpeg',
    info: `Un skatepark est un espace spécialement conçu pour la pratique du skateboard. Il peut se présenter sous différentes formes et tailles, mais il est généralement composé de rampes, de courbes, de rails et de murs, permettant aux skateurs de réaliser des figures et des tricks en toute sécurité. Les skateparks peuvent être en intérieur ou en extérieur et sont souvent construits en béton ou en bois. Ils sont populaires parmi les skateurs de tous niveaux, des débutants aux professionnels.`,
  },
  {
    question: 'Qui est le créateur de la première marque de planche à roulettes ?',
    answer: 3,
    options: [
      'PAS DE CRÉATEUR SPÉCIFIQUE',
      'TONY HAWK',
      'STEVE CABALLERO',
      'LARRY STEVENSON',
    ],
    selected: null,
    img: '/img/guez.jpeg',
    info: `Larry Stevenson est souvent crédité pour avoir popularisé le skateboard en tant que loisir dans les années 1960 en créant la première marque de planches à roulettes, Makaha. Il a également contribué au développement des premiers trucks de skateboard, ce qui a permis une meilleure maniabilité des planches`,
  },
  {
    question: `Comment s'appelle la position sur le skateboard lorsque le pied gauche est placé à l'avant et le pied droit à l'arrière ?`,
    answer: 0,
    options: ['REGULAR', 'GOOFY', 'SWITCH', 'MONGO'],
    selected: null,
    img: '/img/guez.jpeg',
    info: `En skate, la position "regular" fait référence à la position dans laquelle le pied gauche est placé à l'avant de la planche et le pied droit à l'arrière. C'est la position la plus courante chez les skateurs, mais il existe également une position appelée "goofy" où le pied droit est placé à l'avant de la planche et le pied gauche à l'arrière. La position regular est généralement déterminée par la position naturelle de la personne lorsqu'elle se tient debout et est souvent utilisée comme point de référence pour déterminer la position de la planche lors de figures et de tricks en skate.`,
  },
  {
    question: `Quel est le nom de la technique de saut où le skateur tape sur l'arrière pour faire sauter sa planche ?`,
    answer: 1,
    options: ['KICKFLIP', 'OLLIE', 'JUMP 50-50', 'BACKSIDE SMITH GRIND'],
    selected: null,
    img: '/img/guez.jpeg',
    info: `Le ollie est une figure de base en skateboard qui consiste à sauter avec la planche sans utiliser les mains pour la faire décoller. Pour réaliser un ollie, le skateur doit taper la queue de la planche contre le sol, puis glisser son pied avant vers l'avant de la planche pour la faire décoller, tout en sautant avec les deux pieds en même temps. Le ollie est souvent utilisé comme base pour de nombreuses autres figures en skateboard, et est considéré comme une compétence fondamentale à maîtriser pour les skateurs débutants.`,
  },
]
