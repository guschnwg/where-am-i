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