import { useFeedbacksContext } from '../feedbacks-context';
import Item from './Item';

const List = () => {
  const { loading, feedbacks } = useFeedbacksContext();
  const average = (feedbacks.reduce((acc, cur) => acc + cur.rating, 0) / feedbacks.length).toFixed(
    1
  );
  if (loading) return <h2>Loading....</h2>;
  if (!loading && !feedbacks.length) return <h2>No Feedbacks</h2>;
  return (
    <div className='list-container'>
      <div className='stats'>
        <p>Total: {feedbacks.length || 0}</p>
        <p>Average:{average}</p>
      </div>
      <div className='feedbacks'>
        {feedbacks.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
