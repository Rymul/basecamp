import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getCampsite } from '../../store/campsite';
import { createReview } from '../../store/review';
import { login } from '../../store/session';
import './ReviewForm.css'



const ReviewForm = () => {
    // const ReviewForm = ({campsite, closeForm}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState({
        title: '',
        body: '',
        rating: 1,
        recomended: 'false'

    });
    const { campsiteId } = useParams()
    const campsite = useSelector(getCampsite(campsiteId))

    // const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(history)
        dispatch(createReview(review)).then(()=> 
        {
            debugger 
            history.goBack()})
        
    }

    const handleChange = (field) => {
        return (e)=>{
            let authorId = parseInt(sessionUser.id)
            let newReview = Object.assign({}, review, {[field]: e.currentTarget.value},{campsiteId: parseInt(campsiteId), authorId: authorId})
            setReview(newReview)
        }
    }

    return(
        <div className='reviewForm-component'>
            <div className='title'>
                <h1>Thank you for your stay at {`${campsite.name}`}.</h1>
                <p>Your feedback is truly appreciated to make future camping better for all!</p>
            </div>
            {/* {!sessionUser && <ReviewModal onClose={closeForm} />} */}
            <div className='review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    <label id='title'>Title: 
                        <input id='title-input' type='text' value={review.title} onChange={handleChange("title")} />
                    </label>
                    <label id='body'>Body:
                        <textarea id='body-input' maxLength="200" cols="50" rows="4" value={review.body} onChange={handleChange("body")}></textarea>
                    </label>
                    <label id='rating'>Rating</label>
                        <input type="radio" name="rating" id="rating-input" value='1' onChange={handleChange}/>1 
                        <input type="radio" name="rating" id="rating-input" value='2' onChange={handleChange}/>2 
                        <input type="radio" name="rating" id="rating-input" value='3' onChange={handleChange}/>3 
                        <input type="radio" name="rating" id="rating-input" value='4' onChange={handleChange}/>4 
                        <input type="radio" name="rating" id="rating-input" value='5' onChange={handleChange}/>5 
                    <label id='recommended'>Recommended
                        <input id='recommended-input' type="checkbox" value={review.recomended} onChange={handleChange} />
                    </label>
                    <button>Submit Review</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;


