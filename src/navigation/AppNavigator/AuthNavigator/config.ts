import colors from 'constants/colors';

export default {
  DARK_LAYOUT: {
    headerStyle: {
      backgroundColor: colors.DARK_ACCENT,
      // height: 80, // fixme react header
      // alignItems: 'flex-end',
      borderWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitleContainerStyle: { paddingVertical: 10 },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  CARBON_CREDIT: {
    headerStyle: {
      backgroundColor: colors.DARK_ACCENT,
      height: 80, // fixme react header
      // alignItems: 'flex-end',
      borderWidth: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTitleContainerStyle: { paddingVertical: 10 },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};
