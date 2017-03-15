import React from 'react';
import DefaultButton from '../components/DefaultButton';

const Main = () => (
  <div>
    <div className="jumbotron">
      <h1 className="hello">Hello, world!</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <p>
        <a className="btn btn-primary btn-lg" role="button">Learn more</a>
      </p>
    </div>
    <DefaultButton onClick={() => alert('hello')}>
      Yo!
    </DefaultButton>
  </div>
);

export default Main;
