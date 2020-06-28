import React from 'react';
import { View } from 'react-native';

import Background from '~/components/Background';

// import { Container } from './styles';

const Confirm = () => {
  return (
    <Background>
      <View />
    </Background>
  );
};

Confirm.navigationOptions = {
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
};

export default Confirm;
