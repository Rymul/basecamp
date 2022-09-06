import './SplashPage.css';

const SplashPage = () => {

    return (
        <div className="splash-container">
            <div className="title">
                <h1 >Find yourself outside.</h1>
                <p>Discover and book tent camping, RV parks, cabins, treehouses, and glamping.</p>
            </div>
            <div className="seachBar">
                <p>Search bar will go here - it will be awesome!</p>
            </div>
            <div className='img-container'>
                <img className='splash-img' src="woman_and_dog_in_tent.jpg" alt="picture of a woman and a dog in a tent"/>
            </div>
        </div>
    )

}

export default SplashPage;