export interface Google {
  maps: {
    StreetViewPanorama: any
    StreetViewService: any
    LatLng: any
    Map: any
    Marker: any
    Polyline: any
    geometry: {
      spherical: {
        computeDistanceBetween: any
      }
    }
    event: {
      clearListeners: any
    }
    ControlPosition: {
      TOP_RIGHT: number
    }
  }
}

export interface LatLng {
  lat: () => number
  lng: () => number
}

export interface Point {
  icon: string
  position: LatLng
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Place {
  id: number
  name: string
  country: string
  countryCode: string
  description: string
  wikipedia: string
  difficulty: Difficulty
  coordinates: Coordinates
  tips: string[]
}

export interface GameGuess {
  place: Place
  coordinates: Coordinates
  time: MinSec
  distance: number
}

export interface MinSec {
  minutes: number
  seconds: number
}

export enum Difficulty {
  'Fácil' = 1,
  'Médio' = 2,
  'Difícil' = 3,
}