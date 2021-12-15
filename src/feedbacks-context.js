import { createContext, useContext, useEffect, useState } from 'react';

const FeedbacksContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackToEdit, setFeedbackToEdit] = useState(null);

  const getAllFeedbacks = async () => {
    const res = await fetch('/feedbacks?_sort=id&_order=desc');
    const data = await res.json();
    setFeedbacks(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const createFeedback = async (feedback) => {
    const res = await fetch('/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
    const data = await res.json();
    setFeedbacks((prev) => [data, ...prev]);
  };

  const deleteFeedback = async (id) => {
    await fetch(`/feedbacks/${id}`, { method: 'DELETE' });
    setFeedbacks((prev) => prev.filter((i) => i.id !== id));
  };

  const updateFeedback = async (feedback) => {
    const res = await fetch(`/feedbacks/${feedback.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
    const data = await res.json();
    setFeedbacks((prev) => prev.map((i) => (i.id === feedback.id ? { ...i, ...data } : i)));
    setFeedbackToEdit(null);
  };
  const editFeedback = (feedback) => setFeedbackToEdit(feedback);

  return (
    <FeedbacksContext.Provider
      value={{
        feedbacks,
        loading,
        createFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
        feedbackToEdit,
      }}
    >
      {children}
    </FeedbacksContext.Provider>
  );
};

export const useFeedbacksContext = () => useContext(FeedbacksContext);
