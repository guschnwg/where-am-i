export interface Google {
  maps: {
    StreetViewPanorama: any
    StreetViewService: any
    LatLng: any
    Map: any
    Marker: any
    geometry: {
      spherical: {
        computeDistanceBetween: any
      }
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