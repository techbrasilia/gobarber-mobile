import React, { useState, useEffect } from 'react';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = (props) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = props.route.params.provider;

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          data: date.getTime(),
        },
      });

      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    props.navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

// SelectDateTime.navigationOptions = {
//   title: 'Selecionar Data e Horário',
//   headerLeft: () => (
//     <TouchableOpacity>
//       <Icon name="chevron-left" size={20} color="#FFF" />
//     </TouchableOpacity>
//   ),
// };

export default SelectDateTime;
