import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { FeedbackProvider } from './feedbacks-context';

ReactDOM.render(
  <FeedbackProvider>
    <App />
  </FeedbackProvider>,
  document.getElementById('root')
);
