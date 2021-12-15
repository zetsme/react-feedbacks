import { useEffect, useReducer } from 'react';
import { useFeedbacksContext } from '../feedbacks-context';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'set-rating':
      return { ...state, rating: payload };
    case 'set-text':
      if (payload === '') {
        return { ...state, text: payload, isDisabled: true, message: '' };
      } else if (payload.trim().length < 10) {
        return {
          ...state,
          text: payload,
          isDisabled: true,
          message: 'Text must be at least 10 characters',
        };
      } else {
        return { ...state, text: payload, isDisabled: false, message: '' };
      }
    case 'reset':
      return { ...state, text: '', rating: 10, isDisabled: true };
    case 'set-values-to-edit':
      return { ...state, text: payload.text, rating: payload.rating, isDisabled: false };
    default:
      return state;
  }
};

const initialState = {
  text: '',
  rating: 10,
  isDisabled: true,
  message: '',
};

const Form = () => {
  const { createFeedback, feedbackToEdit, updateFeedback } = useFeedbacksContext();
  const [{ text, rating, isDisabled, message }, dispatch] = useReducer(reducer, initialState);
  const setRating = (e) => {
    dispatch({ type: 'set-rating', payload: Number(e.target.value) });
  };

  const setText = (e) => {
    dispatch({ type: 'set-text', payload: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      if (feedbackToEdit) {
        updateFeedback({ ...feedbackToEdit, text, rating });
      } else {
        createFeedback({ text, rating });
      }
    }
    dispatch({ type: 'reset' });
  };


  useEffect(() => {
    if (feedbackToEdit) {
      dispatch({ type: 'set-values-to-edit', payload: feedbackToEdit });
    }
  }, [feedbackToEdit]);

  return (
    <form  className='form' {...{ onSubmit }}>
      <div className='rating'>
        <h3>Choose you Rating</h3>
        <ul className='rating__list'>
          {[...Array(10).keys()].map((i) => (
            <li key={i + 1}>
              <input
                type='radio'
                id={`rating-${i + 1}`}
                name='rating'
                value={i + 1}
                onChange={setRating}
                checked={rating === i + 1}
              />
              <label htmlFor={`rating-${i + 1}`}>{i + 1}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className='input-group'>
        <textarea
          rows={4}
          value={text}
          onChange={setText}
          type='text'
          placeholder='Write your feedback'
        />
        <div>
          {message && <p className='message'>{message}</p>}
          <button disabled={isDisabled} type='submit'>
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
