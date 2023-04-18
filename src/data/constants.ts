import { IQuestion } from '@/core/types/IQuiz'

export const QUESTIONS_DATA: IQuestion[] = [
  {
    question:
      'Très belle performance, mais cette troisième figure était si complexe que vous l’avez ratée ! Qu’est-ce que c’était ?',
    answer: 0,
    options: ['KICKFLIP', 'OLLIE', 'SHOVE-IT', 'PIGEON FLIP'],
    selected: null,
    img: '/img/skater.jpg',
    info: 'informations suplémentaires question 1',
  },
  {
    question: "C'est quoi un skate ?",
    answer: 3,
    options: ['quoi', 'cou', 'beh', 'feur'],
    selected: null,
    img: '/img/quoi.jpeg',
    info: 'informations suplémentaires question 2',
  },
  {
    question: 'Tu préfères mourir ou devenir riche ????',
    answer: 2,
    options: ['rep1', 'rep2', 'rep3', 'rep4'],
    selected: null,
    img: '/img/guez.jpeg',
    info: 'informations suplémentaires question 3',
  },
]
