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
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(updateReview(review)).then(()=> { if(review){ history.push(`/campsites/${campsiteId}`)} })
        .catch(async (res) => {
            let data;
            try {
                data = await res.close().json();
            } catch {
                data = await res.text();
            }
            if (data?.errors) {
                setErrors(data.errors);
            } else if (data) {
                const newError = JSON.parse(data)
                setErrors(newError.errors)
            } else {
                setErrors([res.statusText]);
            }
        })
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
            <div className='title'>
                <h1>Thank you for your stay at {`${campsite.name}`}.</h1>
                <p>Your feedback is truly appreciated to make future camping better for all!</p>
            </div>
            {/* {!sessionUser && <ReviewModal onClose={closeForm} />} */}
            <div className='review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    {/* <label className='title'>Title:  */}
                        <input 
                            className='review-form-title' 
                            type='text' 
                            value={review.title} 
                            onChange={handleChange("title")} 
                        />
                    {/* </label> */}
                    {/* <label className='body'>Body: */}
                        <textarea 
                            className='review-form-body' 
                            maxLength="200" cols="50" rows="4" 
                            value={review.body} 
                            onChange={handleChange("body")}>
                        </textarea>
                    {/* </label> */}
                    <div className='rating'>
                        <label className='rating'>Rating:</label>
                            <input type="radio" name="rating" className="rating-input" value='1' onChange={handleChange}/>1 
                            <input type="radio" name="rating" className="rating-input" value='2' onChange={handleChange}/>2 
                            <input type="radio" name="rating" className="rating-input" value='3' onChange={handleChange}/>3 
                            <input type="radio" name="rating" className="rating-input" value='4' onChange={handleChange}/>4 
                            <input type="radio" name="rating" className="rating-input" value='5' onChange={handleChange}/>5 
                    </div>
                    <label className='recommended'>Recommended
                        <input className='recommended-input' type="checkbox" value={review.recomended} onChange={handleChange} />
                    </label>
                    <button className='submit-button'>Update Review</button>
                </form>
                <div className="review-errors">
                    {errors.map(error => <li className="review-error" key={error}>{error}</li>)}
                </div>
            </div>
        </div>
    )
}

export default UpdateReviewForm;


