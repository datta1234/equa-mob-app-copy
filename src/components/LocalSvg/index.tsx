import React, { useState, useEffect } from 'react';

import { andThen, identity, pipe, tap } from 'ramda';
import { ActivityIndicator } from 'react-native';
import loadLocalResource from 'react-native-local-resource';
import { SvgCss } from 'react-native-svg';

export default ({
  onStartLoading = identity,
  onEndLoading = identity,
  asset,
  ...rest
}) => {
  const [xml, setXml] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const turnOnLoading = () => setLoading(true);
  const turnOffLoading = () => setLoading(false);

  useEffect(() => {
    pipe(
      tap(onStartLoading),
      tap(turnOnLoading),
      loadLocalResource,
      andThen(setXml),
      andThen(turnOffLoading),
      andThen(onEndLoading)
    )(asset);
  }, [asset]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <SvgCss xml={xml} {...rest} />;
};
