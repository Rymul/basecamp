import { Wrapper } from  "@googlemaps/react-wrapper"
import CampsiteSearchMap from "./CampsiteSearchMap";



function SearchMapWrapper({ apiKey, campsites }) {


    return (
        <>
            <Wrapper apiKey={apiKey}>
                <CampsiteSearchMap campsites={campsites} />
            </Wrapper>
        </>
    )
}

export default SearchMapWrapper;
