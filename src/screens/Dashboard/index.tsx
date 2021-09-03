import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../global/styles/theme';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/49077388?s=400&u=ec9520ac11646eea256440b5db57ede4af4bf6be&v=4' }} />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Josimar</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entrada"
          type="income"
          amount="R$ 17.400,00"
          last_transaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          title="Saída"
          type="outcome"
          amount="R$ 1.259,00"
          last_transaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          title="Total"
          type="summary"
          amount="R$ 16.141,00"
          last_transaction="01 à 16 de abril"
        />
      </HighlightCards>
    </Container >
  );
}