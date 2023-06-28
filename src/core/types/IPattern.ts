export interface Point {
  id: number
  isActive: boolean
  coords: {
    x: number
    y: number
  }
}

export interface Line {
  id: number
  isTracing: boolean
  coords: {
    start: {
      x: number
      y: number
    }
    end: {
      x: number
      y: number
    }
  }
}
