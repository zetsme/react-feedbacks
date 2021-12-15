import Form from './components/Form';
import List from './components/List';

const App = () => {
  return (
    <>
      <header className='header'>
        <h1>Leave your Feedback</h1>
      </header>
      <div className='container'>
        <Form />
        <List />
      </div>
    </>
  );
};

export default App;
