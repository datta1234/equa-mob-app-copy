import { BlurView } from '@react-native-community/blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 50px 25px;
`;

export const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const BlurContainer = styled(BlurView)`
  flex: 1;
`;
