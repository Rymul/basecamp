import { Wrapper } from "@googlemaps/react-wrapper";
import CampsiteMap from "./CampsiteMap";

function CampsiteMapWrapper({apiKey, campsite}) {
    

    return (
        <>
            <Wrapper apiKey={apiKey}>
                <CampsiteMap campsite={campsite}/>
            </Wrapper>
        </>
    )
}

export default CampsiteMapWrapper;