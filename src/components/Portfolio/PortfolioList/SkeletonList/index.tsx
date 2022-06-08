import React from 'react';

import PropTypes from 'prop-types';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const propTypes = {
  project: PropTypes.objectOf({
    thumbnailBackgroun: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const defaultProps = {};

// fixme | rework components to styled components
function ProjectSkeletonCardItem({ isHorizontal }) {
  // console.log('project', project.thumbnailBackground);

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 6 }}>
      <SkeletonPlaceholder>
        <View
          style={[
            {
              flexDirection: isHorizontal ? 'row' : 'column',
            },
          ]}>
          <View
            style={[
              isHorizontal
                ? {
                    height: 110,
                    width: 110,
                    marginLeft: 15,
                    marginTop: 15,
                  }
                : {
                    width: 210,
                    height: 155,
                  },
            ]}
          />

          <View style={{ padding: 15 }} isHorizontal={isHorizontal}>
            <View style={{ height: 14, width: 130, borderRadius: 4 }} />

            <View
              style={{ height: 10, width: 110, marginTop: 10, borderRadius: 4 }}
            />

            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderTopWidth: 1,
                  borderColor: '#f0f0f0',
                }}>
                <View
                  style={{
                    height: 21,
                    width: 21,
                    borderRadius: 21,
                    marginRight: 10,
                  }}
                />

                <View style={{ height: 12, width: 120, borderRadius: 4 }} />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderTopWidth: 1,
                  borderColor: '#f0f0f0',
                }}>
                <View
                  style={{
                    height: 21,
                    width: 21,
                    borderRadius: 21,
                    marginRight: 10,
                  }}
                />

                <View style={{ height: 12, width: 80, borderRadius: 4 }} />
              </View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}

ProjectSkeletonCardItem.defaultProps = defaultProps;
ProjectSkeletonCardItem.propTypes = propTypes;
export default ProjectSkeletonCardItem;
