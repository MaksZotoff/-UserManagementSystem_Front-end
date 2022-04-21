import React, {  } from 'react';
import MainCardUI from '../components/card/main-cardUI';

import '../stylesheets/cardUI.css';
import '../stylesheets/App.css';

const Home = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-4'>
          <MainCardUI link='/project' title='Проекты' />
        </div>

        <div className='col-md-4'>
          <MainCardUI link='/user' title='Сотрудники' />
        </div>

        <div className='col-md-4'>
          <MainCardUI link='/order' title='Задачи' />
        </div>
      </div>
    </div>
  );
};

export default Home
/*
const Home = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getPublicContent().then(
      (responce)=>{
        setContent(responce.data);
      },
      (error) => {
        const content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        setContent(content);
      }
    );
  }, []);

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h4>{content}</h4>
      </header>
    </div>
  );
};
*/

