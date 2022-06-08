import React from 'react';

import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { getIn } from 'utils/ramda';

export const ListSeparator = styled.View`
  margin-bottom: 15px;
`;

export const StyledFlatList = styled.FlatList.attrs({
  keyExtractor: (v) => getIn('id')(v).toString(),
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 12, paddingBottom: 45 },
  ItemSeparatorComponent: ({ highlighted }) => <ListSeparator />,
})`
  align-self: stretch;
  height: 500;
  /* min-height: 250px; */
`;
