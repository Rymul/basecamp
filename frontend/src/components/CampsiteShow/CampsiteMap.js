import { useEffect, useRef, useState } from "react"
import greenPin from "../../green-pin.png"
import blackPin from "../../black-pin.png"
import darkGreenPin from "../../darkGreen-pin.png"

function CampsiteMap({campsite}) {

    const [map, setMap] = useState(null)
    const mapRef = useRef(null)

    useEffect(()=>{
        if (mapRef.current && !map) {
            setMap(new window.google.maps.Map(mapRef.current, { 
                center: { lat: campsite.lat, lng: campsite.lng}, 
                zoom: 10,
                disableDefaultUI:true,
                zoomControl: true,
                gestureHandling: 'cooperative'
            }));
        }
    }, [mapRef, map, campsite.lat, campsite.lng])

    // const marker = 
    new window.google.maps.Marker({
        position: { lat: campsite.lat, lng: campsite.lng },
        map: map,
        icon: {
            url: blackPin, 
            scaledSize: new window.google.maps.Size(70, 70),
            origin: new window.google.maps.Point(0,0)
        },
    });

    return (
        <>
        <div className="CampsiteMapContainer">
            <div className="googleMap" ref={mapRef} >Map</div>
                <p>{campsite.city}, {campsite.state}, United States</p>
        </div>
        </>
    )
}

export default CampsiteMap;