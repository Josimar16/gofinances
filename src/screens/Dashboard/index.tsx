import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from "styled-components";
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCardProps, TransactionCard } from '../../components/TransactionCard';
import {
  Container,
  Header, HighlightCards, LogoutButton, Icon, Photo, Title,
  TransactionList, Transactions, User,
  UserGreeting, UserInfo, UserName, UserWrapper, LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

function getLastTransactionDate(
  collection: DataListProps[],
  type: "income" | "outcome"
) {
  const lastTransaction =
    new Date(Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())));

  return `
    ${lastTransaction.getDate()} de 
    ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}
  `;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransaction] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        if (item.type === 'income') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });
    setTransaction(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, "income");
    const lastTransactionExpensive = getLastTransactionDate(transactions, "outcome");
    const totalInterval = `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer>
        :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/49077388?s=400&u=ec9520ac11646eea256440b5db57ede4af4bf6be&v=4' }} />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>Josimar</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => { }}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entrada"
              type="income"
              amount={highlightData.entries.amount}
              last_transaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              title="Saída"
              type="outcome"
              amount={highlightData.expensive.amount}
              last_transaction={highlightData.expensive.lastTransaction}
            />
            <HighlightCard
              title="Total"
              type="summary"
              amount={highlightData.total.amount}
              last_transaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard key={item.id} data={item} />}
            />
          </Transactions>
        </>
      }
    </Container >
  );
}