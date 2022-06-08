import { rgba } from 'polished';
import styled from 'styled-components/native';

export const ContentContainer = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 10px;
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  /* margin-top: -30px; */
`;

export const HeaderContentContainer = styled.View`
  padding-vertical: 10px;
  align-items: center;
`;
export const CompleteProfileContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.dark};
  border-radius: 30px;
  /* align-items: center; */
`;

export const HeaderContainer = styled.View`
  margin-top: 5px;
`;

export const OffsetProgressWrapper = styled.View.attrs({})`
  padding-bottom: 30px;
  padding-top: 10px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const ActivitiesWrapper = styled.View.attrs({
  // shadowColor: '#000',
  // shadowOffset: {
  //   width: 0,
  //   height: -1,
  // },
  // shadowOpacity: 0.2,
  // shadowRadius: 4.41,
  // elevation: 2,
})`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.primary};
  padding-vertical: 15px;
  padding-bottom: 40px;
  margin-top: -30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const ConnectWithGroupsWrapper = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4.41,

  elevation: 2,
})`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  margin-top: 20px;
  padding-vertical: 20px;
`;
