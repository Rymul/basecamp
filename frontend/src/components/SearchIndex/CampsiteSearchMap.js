import { useEffect, useRef, useState } from "react"
import greenPin from "../../green-pin.png"
import blackPin from "../../black-pin.png"
import darkGreenPin from "../../darkGreen-pin.png"


const CampsiteSearchMap = ({ campsites }) => {
    const [map, setMap] = useState(null)
    const [markerList, setMarkerList] = useState([])
    const mapRef = useRef(null);
    // const [count, setCount] = useState(0);
    // window.markerList = []

    useEffect(() => {
        // 
        const centerLat = (Math.max(...campsites.map((campsite) => campsite.lat)) + Math.min(...campsites.map((campsite) => campsite.lat))) / 2
        const centerLng = (Math.max(...campsites.map((campsite) => campsite.lng)) + Math.min(...campsites.map((campsite) => campsite.lng))) / 2
        if (mapRef.current && !map) {
           setMap(new window.google.maps.Map(mapRef.current, {
                center: { lat: centerLat, lng: centerLng },
                zoom:3,
                disableDefaultUI: true,
                zoomControl: true,
                gestureHandling: 'cooperative'
            }));

            return () => {

            }
        }

        const markerLatLngArr = new window.google.maps.LatLngBounds();

        
            if (markerList.length > 0) {
                markerList.forEach((marker) => {
                    marker.setMap(null)
                })
                
                // setMarkerList([])
            }
            
            
            setTimeout(()=>{
            campsites.forEach((campsite) => {
                setMarkerList(markerList.concat(new window.google.maps.Marker({
                position: { lat: campsite.lat, lng: campsite.lng },
                map: map,
                animation: window.google.maps.Animation.DROP,
                icon: {
                    url: blackPin,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0)
                }
            }))
            )
            
            
            
            markerLatLngArr.extend(new window.google.maps.LatLng(campsite.lat, campsite.lng))
            map.fitBounds(markerLatLngArr)
        })
        },1000)   
    
    }, [map, campsites])
        

    return (
        <div className="SearchGoogleMap" ref={mapRef}>
            Map
        </div>
    )
}

export default CampsiteSearchMap;