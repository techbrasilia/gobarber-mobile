import React from 'react';
import { useSelector } from 'react-redux';

// import { Container } from './styles';

import Rotas from './routes';

const App = () => {
  const signed = useSelector((state) => state.auth.signed);

  return <Rotas isSignedIn={signed} />;
};

export default App;
