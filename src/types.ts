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
  description: string
  coordinates: Coordinates
  tips: string[]
}