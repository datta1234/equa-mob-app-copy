import remoteConfig from '@react-native-firebase/remote-config';

// fetch and activate values
export async function fetchAndActivate() {
  const fetchedRemotely = await remoteConfig().fetchAndActivate();
  if (fetchedRemotely) {
    console.log('RemoteConfigs retrieved and activated.');
  } else {
    console.log('No RemoteConfigs fetched');
  }
}

const remoteConfigUtils = {
  async getUnderMaintenance() {
    return fetchAndActivate().then(() => {
      const underMaintenance = remoteConfig().getValue('under_maintenance');
      return underMaintenance?.asBoolean();
    });
  },
  async getMinimumVersion() {
    return fetchAndActivate().then(() => {
      const underMaintenance = remoteConfig().getValue('minimum_version');
      return underMaintenance?.asString();
    });
  },
};

export default remoteConfigUtils;
