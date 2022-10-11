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
    const { campsiteId } = useParams();
 
    const [review, setReview] = useState({
        title: '',
        body: '',
        rating: 1,
        recomended: 'false'

    });
    const campsite = useSelector(getCampsite(campsiteId))

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createReview(review))
        .catch(async (res) => {
            let data;
            try {
                data = await res.close().json().then(()=> {history.goBack()});
            } catch {
                data = await res.text();
            }
            if (data?.errors) {
                setErrors(data.errors);
            } else if (data) {
                // const newError = Object.values([data])[0]
                // setErrors([newError.slice(12,newError.length-4)])
                const newError = JSON.parse(data)
                setErrors(newError.errors)
                // setErrors([data]);
            } else {
                setErrors([res.statusText]);
            }
                
            // const x = Object.values(errors)[0]
            // console.log(x.slice(12,x.length-4), "errors")
            // console.log(data, 'data')
            
            // errors.map(error => console.log(error[0], 'error'));
            // Object.values(data).map(error => console.log(error, 'error'));
        })
        
        
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
                    {/* <label id='title'>Title:  */}
                        <input 
                            className='review-form-title'
                            placeholder='Title...' 
                            type='text' 
                            value={review.title} 
                            onChange={handleChange("title")} 
                        />
                    {/* </label> */}
                    {/* <label className='body'>Body: */}
                        <textarea 
                            className='review-form-body' 
                            placeholder='Body...' 
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
                    <button className='submit-button'>Create Review</button>
                </form>
                <div className="errors">
                    {errors.map(error => <li className="error" key={error}>{error}</li>)}
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;


