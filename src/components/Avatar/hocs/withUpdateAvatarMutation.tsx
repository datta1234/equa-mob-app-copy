import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import { ifElse, mergeDeepLeft, objOf, pick, pipe, tap, when } from 'ramda';
import * as ImagePicker from 'react-native-image-picker';

import { renameKeys, getIn } from 'utils/ramda';

const MUTATION_NAME = 'changeAvatar';

const CHANGE_AVATAR = gql`
  mutation ChangeAvatar($file: Upload!) {
    ${MUTATION_NAME}(input: { file: $file }) {
      me {
        id
        thumbnailAvatar(revision: "x120")
      }
    }
  }
`;

const IMAGEPICKER_OPTIONS = {
  mediaType: 'photo',
  title: 'Select Image',
  quality: 0.8,
  maxWidth: 100 * 3,
  maxHeight: 100 * 3,
  customButtons: [
    { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default (WrappedComponent) => {
  return (props) => {
    const [isLoading, setLoading] = useState(false);
    const turnOnLoading = () => setLoading(true);
    const turnOffLoading = () => setLoading(false);

    const [me, setMe] = useState({});

    const [changeAvatar, changeAvatarOptions] = useMutation(CHANGE_AVATAR, {
      notifyOnNetworkStatusChange: true,

      onCompleted: pipe(
        tap(turnOffLoading),
        getIn([MUTATION_NAME, 'me']),
        setMe
      ),
      onError: tap(turnOffLoading),
    });

    const uploaderCallback = pipe(
      pick(['uri', 'fileName', 'type']),
      renameKeys({ fileName: 'name' }),
      (rawFile) => new ReactNativeFile(rawFile),
      objOf('file'),
      objOf('variables'),
      changeAvatar
    );

    return (
      <WrappedComponent
        {...props}
        onAvatarChange={() => {
          turnOnLoading();
          ImagePicker.launchImageLibrary(
            IMAGEPICKER_OPTIONS,
            pipe(ifElse(getIn('uri'), uploaderCallback, turnOffLoading))
          );
        }}
        isLoading={isLoading || changeAvatarOptions.loading}
        me={mergeDeepLeft(me, props.me)}
      />
    );
  };
};
