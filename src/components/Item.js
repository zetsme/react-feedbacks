import { useFeedbacksContext } from '../feedbacks-context';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Item = ({ item }) => {
  const { deleteFeedback, editFeedback } = useFeedbacksContext();

  const handleUpdate = () => {
    editFeedback(item);
    window.scrollTo(0, document.querySelector('.form').offsetTop);
  };
  const handleDelete = () => deleteFeedback(item.id);
  return (
    <div className='item'>
      <p>Rating: {item.rating}</p>
      <p>Text: {item.text}</p>
      <div className='button-container'>
        <button onClick={handleDelete}>
          <FaTrash color='red' />
        </button>
        <button onClick={handleUpdate}>
          <FaEdit color='blue' />
        </button>
      </div>
    </div>
  );
};

export default Item;
