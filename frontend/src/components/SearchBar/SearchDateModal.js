import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { updateStoreFilter } from '../../store/filters';


function SplashDateModal() {

    const dispatch = useDispatch();

    // const [value, setValue] = useState(new Date());

    function onChange(nextValue) {

        // setValue(nextValue);
        dispatch(updateStoreFilter({ startDate: nextValue[0], endDate: nextValue[1] }))
    }






    return (
        <>
            <div id="SearchDateModal" className="SearchDateModalContainer" >
                <Calendar
                    onChange={onChange}
                    showDoubleView={true}
                    selectRange={true}
                    prevLabel='←'
                    nextLabel='→'
                    next2Label={null}
                    prev2Label={null}
                    minDetail='month'
                    minDate={new Date()}
                    showNeighboringMonth={false}
                />
            </div>

        </>
    )
}


export default SplashDateModal;