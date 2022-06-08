import iphoneBazelsImg from 'assets/onboarding/iphone_bazels.png';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const IphoneBazelsImg = styled.Image.attrs({
  source: iphoneBazelsImg,
  resizeMode: 'contain',
  // flex: 1,
})`
  /* flex: 1; */
  /* width: 100%;
  height: 100%; */
  /* background-color: red; */
  /* width: auto; */
  /* height: 400px; */
`;
