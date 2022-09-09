import { deleteReview, getCampsiteReviews, updateReview } from '../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'


const ReviewIndex = (props) => {
    
    const { campsiteId } = props;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(getCampsiteReviews(campsiteId))
    // const [button, setButton] = useState("Add Review");
    // const [openForm, setForm] = useState(false);
    // const [formType, setFormType] = useState("create");
    // const [review, setReview] = useState(null);
    
    const hasReviewed = sessionUser && reviews.some(review => review.authorId === sessionUser.id);
    
    return (
        <>
            <div className='rating'>
                <h2>This will be the Total-review</h2>
                <p>Num Ratings</p>
                <p>Num Reviews</p>
            </div>
            <div className='reviews'>
                {reviews.map(review => (
                    <div className="review" key={review.id}>
                        <h2 id="reviewer-name">{review.reviewer.name}</h2>
                        {review.recommended ? <p id="reviewer-name">recommends</p> : null }
                        <p>{review.title}</p>
                        <p>{review.body}</p>
                        {review.authorId === sessionUser?.id && (
                            <div>
                                <button 
                                    onClick={() => dispatch(updateReview(review))}
                                    className='edit-button'
                                >
                                    <BiEdit />
                                </button>
                                <button 
                                    onClick={() => dispatch(deleteReview(review.id))} 
                                    className='delete-button'
                                >
                                    <AiOutlineDelete />
                                </button>

                            </div>
                        )}
                    </div>

                ))}
            </div>
        </>
    )
}


export default ReviewIndex;