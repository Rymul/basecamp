import { deleteReview, getCampsiteReviews, updateReview } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import ReviewForm from './ReviewForm';
import { getCampsite } from '../../store/campsite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ReviewIndex.css'


const ReviewIndex = ({ campsiteId }) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const campsite = useSelector(getCampsite(campsiteId));
    const reviews = useSelector(getCampsiteReviews(campsiteId))
    console.log(reviews, "reviews")
    // const [button, setButton] = useState("Add Review");
    // const [openForm, setForm] = useState(false);
    // const [formType, setFormType] = useState("create");
    // const [review, setReview] = useState(null);
    
    if (!reviews) return null
    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);
    
    return (
        <div className='review component'>
            <div className='rating'>
                {/* <h2>This will be the Total-review</h2>
                <p>Num Ratings</p>
                <p>Num Reviews</p> */}
            </div>
            <div className='reviews'>
                {reviews.map(review => (
                    <div className="single-review" key={review.id}>
                        <div className='author'>
                            <h4 id="author-name">{review.authorName}</h4>
                            {review.recomended ? <p id='rec'>recommends</p> : null}
                        </div>
                        <p id='rev-date'>{review.createdAt.slice(5, 7)}-{review.createdAt.slice(8, 10)}-{review.createdAt.slice(0, 4)}</p>
                        <p id='rev-title'>{review.title}</p>
                        <p id='rev-body'>{review.body}</p>
                        {review.authorId === sessionUser?.id && (
                            <div className='edit_buttons'>
                                <Link to={`/review/${campsiteId}/${review.id}`} >
                                    <BiEdit id='update-button'/>
                                </Link>
                                {/* <button 
                                    onClick={() => dispatch(updateReview(review))}
                                    className='edit-button'
                                >
                                    
                                </button> */}
                                <button 
                                    onClick={() => dispatch(deleteReview(review.id))} 
                                    id='delete-button'
                                >
                                    <AiOutlineDelete />
                                </button>

                            </div>
                        )}
                    </div>
                ))}
                <div className='create-rev-container'>
                    {/* {!hasReviewed && <LeaveReview campsite={campsite} />} */}
                    {/* {!hasReviewed ? <Link to={`/new_review/${campsiteId}`} /> : null} */}
                    {sessionUser ? <Link to={`/new_review/${campsiteId}`} id='create-rev'>Leave a Review</Link> : null}
                    {/* <Link to={`/new_review`} >Leave a Review</Link>  */}
                </div>
            </div>
        </div>
    )
}


export default ReviewIndex;


// const LeaveReview = ({ campsite }) => {
//     const [showReviewForm, setShowReviewForm] = useState(false)
  
//     return showReviewForm ? (
//       <ReviewForm 
//         campsite={campsite} 
//         closeForm={() => setShowReviewForm(false)}
//       />
//     ) : (
//       <button className="leave-review-button" onClick={() => setShowReviewForm(true)}>
//         Leave a Review
//       </button>
//     );
// }