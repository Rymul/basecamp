import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/review';



const ReviewForm = ({campsite, closeForm}) => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [review, setReview] = useState();

    const [errors, setErrors] = useState([]);
    // const [rating, onRatingChange] = useInput(5);
    // const [body, onBodyChange] = useInput('');
    // const [errors, onSubmit] = useSubmit({ 
    //   onSuccess: closeForm,
    //   action: createReview({ rating, body, campsiteId: campsite.id })
    // });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview(review))
    }

    const handleChange = (e) => {
        switch(e.target.id){
            case 'title-input':
                setReview({...review, title: e.target.value});
            case 'body-input':
                setReview({ ...review, body: e.target.value})
        }

    }

    return(
        <div className='reviewForm-component'>
            {/* {!sessionUser && <ReviewModal onClose={closeForm} />} */}
            <div className='review-form-container'>
                <form onSubmit={handleSubmit} className='review-form'>
                    <label id='title'>Title: 
                        <input id='title-input' type='text' value={review.title} onChange={handleChange} />
                    </label>
                    <label id='body'>
                        <textarea id='body-input' maxlength='200' cols="50" rows="4" value={review.body} onChange={handleChange}></textarea>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;


