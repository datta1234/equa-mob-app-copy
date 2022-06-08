import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Typography } from 'components';
import colors from 'constants/colors';

const propTypes = {};

const defaultProps = {};

function ProjectCardTitle({ isSelected, isEditable }) {
  const renderAction = () => {
    if (isEditable) {
      return (
        <TouchableOpacity
          style={[styles.actionContainer, styles.editableActionsContainer]}>
          <Typography type="text" style={styles.actionText}>
            edit
          </Typography>
        </TouchableOpacity>
      );
    }

    if (isSelected) {
      return (
        <TouchableOpacity
          style={[styles.actionContainer, styles.selectedActionContainer]}>
          <Icon name="check" type="feather" size={16} color={colors.WHITE} />
          <Typography
            type="text"
            style={[styles.actionText, styles.selectedActionText]}>
            Added
          </Typography>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.actionContainer}>
        <Icon name="plus" type="material-community" size={16} />
        <Typography type="text" style={styles.actionText}>
          Add all
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Typography type="h3">ProjectCardTitle</Typography>
      {renderAction()}
    </View>
  );
}

ProjectCardTitle.defaultProps = defaultProps;
ProjectCardTitle.propTypes = propTypes;
export default ProjectCardTitle;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginLeft: 3,
    fontWeight: '600',
  },
  selectedActionContainer: {
    backgroundColor: colors.DARK_ACCENT,
  },
  selectedActionText: {
    color: colors.WHITE,
  },
  actionContainer: {
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editableActionsContainer: {
    backgroundColor: null,
  },
});
