import CampsiteIndex from './CampsiteIndex';
import HomeSearchBar from './SearchBar';
import './SplashPage.css';

const SplashPage = () => {

    return (
        <div className="splash-container">
            <div className="splash-title">
                <h1 >Find yourself outside.</h1>
                <div className='splash-subTitle'>
                    <p>Discover and book tent camping, RV parks, cabins, treehouses, and glamping.</p>
                </div>
            </div>
            <div className='searchBar-container'>
                <div className="searchBar-component">
                    <HomeSearchBar />
                </div>
            </div>
            <div className='img-container'>
                <img className='splash-img' src="woman_and_dog_in_tent.jpg" alt="picture of a woman and a dog in a tent"/>
            </div>
            <div className='campsite-idx'>
                <CampsiteIndex />
            </div>
        </div>
    )

}

export default SplashPage;