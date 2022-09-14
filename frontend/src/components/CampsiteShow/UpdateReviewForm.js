import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getCampsite } from '../../store/campsite';
import { getReview, updateReview } from '../../store/review';
import './ReviewForm.css'



const UpdateReviewForm = () => {
    // const ReviewForm = ({campsite, closeForm}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { campsiteId } = useParams();
    const { reviewId } = useParams();
    const reviewData = useSelector(getReview(reviewId))
    delete reviewData['authorName']
    // const reviewData = {}
    const [review, setReview] = useState(reviewData);
    const campsite = useSelector(getCampsite(campsiteId))

    // const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(history)
        dispatch(updateReview(review)).then(()=> 
        {
            // debugger 
            history.goBack()})
        
    }

    const handleChange = (field) => {
        return (e)=>{
            let authorId = parseInt(sessionUser.id)
            let newReview = Object.assign({}, review, {[field]: e.currentTarget.value},{campsiteId: parseInt(campsiteId), authorId: authorId})
            setReview(newReview)
        }
    }

    // if(!review) return null;

    return(
        <div className='reviewForm-component'>
            {/* {console.log(reviewData, "hellowwww")} */}
            <div className='title'>
                <h1>Thank you for your stay at {`${campsite.name}`}.</h1>
                <p>Your feedback is truly appreciated to make future camping better for all!</p>
            </div>
            {/* {!sessionUser && <ReviewModal onClose={closeForm} />} */}
            <div className='review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    {/* <label id='title'>Title:  */}
                        <input 
                            id='review-form-title' 
                            type='text' 
                            value={review.title} 
                            onChange={handleChange("title")} 
                        />
                    {/* </label> */}
                    {/* <label id='body'>Body: */}
                        <textarea 
                            id='review-form-body' 
                            maxLength="200" cols="50" rows="4" 
                            value={review.body} 
                            onChange={handleChange("body")}>
                        </textarea>
                    {/* </label> */}
                    <div className='rating'>
                        <label id='rating'>Rating:</label>
                            <input type="radio" name="rating" id="rating-input" value='1' onChange={handleChange}/>1 
                            <input type="radio" name="rating" id="rating-input" value='2' onChange={handleChange}/>2 
                            <input type="radio" name="rating" id="rating-input" value='3' onChange={handleChange}/>3 
                            <input type="radio" name="rating" id="rating-input" value='4' onChange={handleChange}/>4 
                            <input type="radio" name="rating" id="rating-input" value='5' onChange={handleChange}/>5 
                    </div>
                    <label id='recommended'>Recommended
                        <input id='recommended-input' type="checkbox" value={review.recomended} onChange={handleChange} />
                    </label>
                    <button id='submit-button'>Update Review</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateReviewForm;


