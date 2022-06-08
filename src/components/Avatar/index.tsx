import React, { useState } from 'react';

import R, {
  apply,
  equals,
  evolve,
  head,
  join,
  map,
  pick,
  pipe,
  mergeRight,
  tap,
  unapply,
  values,
  when,
  mergeLeft,
  pickAll,
} from 'ramda';
// import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { LoaderOverlay } from 'components/LoadingOverlay';
import withFadeIn from 'hocs/withFadeIn';
import { useWhyDidYouUpdate } from 'hooks';
import { isDefined, getIn } from 'utils/ramda';

import { withQuery, withUpdateAvatarMutation } from './hocs';
import {
  AvatarContainer,
  AvatarImage,
  Container,
  Wrapper,
  IconWrapper,
  Initials,
} from './styles';

const propTypes = {};

const defaultProps = {};

const Placeholder = withFadeIn(({ children, size, color }) => (
  <Container color={color} size={size}>
    <Initials size={size}>{children}</Initials>
  </Container>
));

const AvatarBase = withFadeIn(({ uri, size }) => {
  const [isLoading, setLoading] = useState(false);
  const turnOnLoading = () => setLoading(true);
  const turnOffLoading = () => setLoading(false);

  return (
    <View>
      <AvatarImage
        size={size}
        onLoadStart={turnOnLoading}
        onLoadEnd={turnOffLoading}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {isLoading && <LoaderOverlay />}
    </View>
  );
});

const AvatarPreview = withQuery((props) => {
  const { me, isLoading } = props;

  // useWhyDidYouUpdate('Avatar', props);

  const defProps = R.map(R.defaultTo('')); // defaults props to '' if null or undefined

  const initials = pipe(
    mergeRight({
      firstName: '',
      lastName: '',
    }),
    pick(['firstName', 'lastName']),
    defProps,
    values,
    map(head), // grabs the first letter of each element in the array
    join('')
  )(me);

  const renderContent = () => {
    if (isDefined(me.thumbnailAvatar)) {
      return <AvatarBase size={props.size} uri={me.thumbnailAvatar} />;
    }

    return (
      <Placeholder color={props.color} size={props.size}>
        {initials}
      </Placeholder>
    );
  };

  return (
    <>
      {renderContent()}
      {isLoading && <LoaderOverlay />}
    </>
  );
});

const Icon = (props) => {
  const { onPress, size = 33, color } = props;

  return (
    <AvatarContainer>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
        <IconWrapper size={size + 2}>
          <AvatarPreview color={color} size={size} />
        </IconWrapper>
      </TouchableOpacity>
    </AvatarContainer>
  );
};

const Avatar = pipe(withUpdateAvatarMutation)((props) => {
  const { onAvatarChange, color, size = '100', style } = props;

  return (
    <AvatarContainer style={style}>
      {/* <TouchableOpacity style={{ flex: 1 }} onPress={onAvatarChange}> */}
      <Wrapper>
        <AvatarPreview color={color} size={size} />
      </Wrapper>
      {/* </TouchableOpacity> */}
    </AvatarContainer>
  );
});
Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;

export { Icon };
Avatar.Icon = Icon;
export default Avatar;

// (component) =>
//   React.memo(
//     component,
//     pipe(
//       unapply(map(pick(['isLoading', 'me']))),
//       map(evolve({ me: pick(['thumbnailAvatar']) })),
//       // tap(() => console.log('-------- START ------------')),
//       // tap(apply(console.log)),
//       apply(equals)
//       // tap(console.log),
//       // tap(() => console.log('-------- END ------------'))
//     )
//     // pipe(unapply(map(pick(['a', 'c.b']))), apply(console.log))
//   ),
// React.memo,
