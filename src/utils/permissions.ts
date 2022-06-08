import { getBoolData, setBoolData, removeValue } from './storage';

const ANALYTICS_ALLOWED_KEY = '@analyticsAllowed';
const CRASH_STATS_ALLOWED_KEY = '@crashStatsAllowed';

const PermissionsService = () => {
  // ***** Analytics ***** //
  const setAnalyticsAllowed = (bool) =>
    setBoolData(ANALYTICS_ALLOWED_KEY, bool);
  const getAnalyticsAllowed = () => getBoolData(ANALYTICS_ALLOWED_KEY);
  const removeAnalyticsAllowed = () => removeValue(ANALYTICS_ALLOWED_KEY);

  // ***** CrashStatistics ***** //
  const setCrashStatsAllowed = (bool) =>
    setBoolData(CRASH_STATS_ALLOWED_KEY, bool);
  const getCrashStatsAllowed = () => getBoolData(CRASH_STATS_ALLOWED_KEY);
  const removeCrashStatsAllowed = () => removeValue(CRASH_STATS_ALLOWED_KEY);

  const removeAllPermissions = async () => {
    await removeCrashStatsAllowed();
    await removeAnalyticsAllowed();
  };

  return {
    setAnalyticsAllowed,
    getAnalyticsAllowed,
    removeAnalyticsAllowed,
    setCrashStatsAllowed,
    getCrashStatsAllowed,
    removeCrashStatsAllowed,
    removeAllPermissions,
  };
};

export default PermissionsService();
