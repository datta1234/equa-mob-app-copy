import React from 'react';

import PropTypes from 'prop-types';

import Item from './Item';
import DefaultActionIcon from './Item/DefaultActionIcon';
import SkeletonItem from './SkeletonItem';
import { Container, ItemWrapper } from './styles';
import Title from './Title';

const propTypes = {
  isHorizontal: PropTypes.bool,
};

const defaultProps = {
  isHorizontal: false,
};

function ProjectCards({ children, isHorizontal }) {
  const numberofChilds = React.Children.count(children);
  const renderChild = (_child, idx) => (
    <ItemWrapper
      isLast={idx + 1 == numberofChilds}
      isFirst={idx == 0}
      isHorizontal={isHorizontal}>
      {React.cloneElement(_child)}
    </ItemWrapper>
  );

  return (
    <Container isHorizontal={isHorizontal}>
      {React.Children.map(children, renderChild)}
    </Container>
  );

  // return (
  //   <View style={styles.container}>
  //     <ScrollView
  //       showsHorizontalScrollIndicator={false}
  //       horizontal
  //       contentContainerStyle={styles.cardsCollection}>
  //       {React.Children.map(children, (_child) => (
  //         <View style={styles.childWrapper}>{_child}</View>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );
}

ProjectCards.defaultProps = defaultProps;
ProjectCards.propTypes = propTypes;
ProjectCards.Item = Item;
ProjectCards.SkeletonItem = SkeletonItem;
ProjectCards.Title = Title;
export { DefaultActionIcon };
export default ProjectCards;

// styles
// const styles = StyleSheet.create({
//   container: {},
//   cardsCollection: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginLeft: 20,
//     paddingRight: 25,
//   },
//   childWrapper: {
//     paddingRight: 15,
//   },
// });
