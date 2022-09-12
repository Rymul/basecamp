import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const ReviewForm = ({campsite, closeForm}) => {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    // const [rating, onRatingChange] = useInput(5);
    // const [body, onBodyChange] = useInput("");
    // const [errors, onSubmit] = useSubmit({ 
    //   onSuccess: closeForm,
    //   action: createReview({ rating, body, campsiteId: campsite.id })
    // });

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
        <div className="reviewForm-component">
            {/* {!sessionUser && <ReviewModal onClose={closeForm} />} */}
            <div className="review-form-container">
                <form onSubmit={handleSubmit} className="review-form">
                    
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;


