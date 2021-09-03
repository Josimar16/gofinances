import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction
} from './styles';

interface HighlightCardProps {
  title: string;
  amount: string;
  last_transaction: string;
  type: 'income' | 'outcome' | 'summary'
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  summary: 'dollar-sign'
}

export function HighlightCard({
  title,
  type,
  amount,
  last_transaction
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>
      <Footer>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {last_transaction}
        </LastTransaction>
      </Footer>
    </Container>
  );
}