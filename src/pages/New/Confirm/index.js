import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '~/services/api';

const Confirm = (props) => {
  const provider = props.route.params.provider;
  const time = props.route.params.time;

  /**
   * Meu emulador esta retornando o horario com + 3 horas
   */
  const dataSelecionada = parseISO(time);
  dataSelecionada.setHours(dataSelecionada.getHours() - 3);

  const dateFormated = useMemo(
    () => formatRelative(dataSelecionada, new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      data: time,
    });
    props.navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatars/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormated}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

// Confirm.navigationOptions = {
//   title: 'Confirmar agendamento',
//   headerLeft: () => (
//     <TouchableOpacity>
//       <Icon name="chevron-left" size={20} color="#FFF" />
//     </TouchableOpacity>
//   ),
// };

export default Confirm;
