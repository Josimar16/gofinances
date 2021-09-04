import React, { useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCardProps, TransactionCard } from '../../components/TransactionCard';
import {
  Container,
  Header, HighlightCards, Icon, Photo, Title,
  TransactionList, Transactions, User,
  UserGreeting, UserInfo, UserName, UserWrapper
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([{
    id: "1",
    title: "Desenvolvimento de site",
    type: "positive",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign"
    },
    date: "13/04/2020",
  }, {
    id: "2",
    title: "Hamburgueria Pizzy",
    type: "negative",
    amount: "R$ 59,00",
    category: {
      name: "Alimentação",
      icon: "coffee"
    },
    date: "13/04/2020",
  },
  {
    id: "3",
    title: "Aluguel do apartamento",
    type: "negative",
    amount: "R$ 1.500,00",
    category: {
      name: "Casa",
      icon: "shopping-bag"
    },
    date: "13/04/2020",
  },]);

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

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard key={item.id} data={item} />}
        />
      </Transactions>
    </Container >
  );
}