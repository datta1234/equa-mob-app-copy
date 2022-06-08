/* eslint-disable import/order */
// CHART SVGs
import FOOD from 'assets/svgs/activities/FoodIcon';
import HOME from 'assets/svgs/activities/HomeIcon';
import PURCHASE from 'assets/svgs/activities/PurchaseIcon';
import TRAVEL from 'assets/svgs/activities/TravelIcon';

// Logos
export const LOGO_DARK = require('assets/images/logo/aq_logo_dark.png');
export const LOGO_DARK_TAP = require('assets/images/logo/aq_logo_dark_tap.png');
export const LOGO_LIGHT = require('assets/images/logo/aq_logo_light.png');
export const LOGO_LIGHT_TAP = require('assets/images/logo/aq_logo_light_tap.png');
export const POWERED_BY_LOGO_DARK = require('assets/images/logo/powered_by_dark.png');
export const POWERED_BY_LOGO_LIGHT = require('assets/images/logo/powered_by_light.png');

// Gauge
export const GAUGE_EMPTY = require('assets/images/gauge/gauge_empty.png');
export const GAUGE_LEVEL_1 = require('assets/images/gauge/gauge_level_1.png');
export const GAUGE_LEVEL_2 = require('assets/images/gauge/gauge_level_2.png');
export const GAUGE_LEVEL_3 = require('assets/images/gauge/gauge_level_3.png');
export const GAUGE_FULL = require('assets/images/gauge/gauge_full.png');

// Splash
//export const SPLASH = require('./images/splash/splash_screen.png')

// Background
export const TREES_BG = require('assets/images/background/trees.png');
export const TREES_SOLID_BG = require('assets/images/background/trees_solid.png');
export const FOREST = require('assets/images/background/forest.png');
//export const COMING_SOON_BG = require('./images/background/coming_soon_no-text.png')

// AUTH
export const LOGIN_BG = require('assets/images/signin/landing_trees.png');

// TAB_BAR SVGs
import ADD_ACTIVITY from 'assets/svgs/tabBar/AddActivityIcon';
import DASH from 'assets/svgs/tabBar/DashboardIcon';
import PROFILE from 'assets/svgs/tabBar/ProfileIcon';
import PROJECTS from 'assets/svgs/tabBar/ProjectsIcon';

// Menu SVGs
import CODE from 'assets/svgs/menu/Code';
import CONTACT from 'assets/svgs/menu/Contact';
import LOGOUT from 'assets/svgs/LogoutIcon';
import SETTINGS from 'assets/svgs/menu/Settings';

// General SVGs
import ADD from 'assets/svgs/AddIcon';
import ARROW from 'assets/svgs/ArrowIcon';
import BELL from 'assets/svgs/BellIcon';
import CHAT from 'assets/svgs/ChatIcon';
import CHEVRON_LEFT from 'assets/svgs/BackIcon';
import CHEVRON_RIGHT from 'assets/svgs/ChevronRightIcon';
import CLOSE from 'assets/svgs/CloseIcon';
import COG from 'assets/svgs/CogIcon';
import MENU from 'assets/svgs/MenuIcon';
import PENCIL from 'assets/svgs/PencilIcon';
import PEN from 'assets/svgs/PenIcon';
import TRASH from 'assets/svgs/TrashIcon';
import TICK from 'assets/svgs/TickIcon';

export const images = {
  backgrounds: {
    update: FOREST,
  },
  gauge: {
    GAUGE_EMPTY,
    GAUGE_LEVEL_1,
    GAUGE_LEVEL_2,
    GAUGE_LEVEL_3,
    GAUGE_FULL,
  },
  TREES_BG,
  TREES_SOLID_BG,
  LOGO_DARK,
  LOGO_DARK_TAP,
  LOGO_LIGHT,
  LOGO_LIGHT_TAP,
  LOGIN_BG,
  POWERED_BY_LOGO_LIGHT,
  POWERED_BY_LOGO_DARK,
};

export const svgs = {
  icons: {
    activityIcons: {
      HOME,
      FOOD,
      PURCHASE,
      TRAVEL,
    },
    tabBarIcons: {
      addActivity: ADD_ACTIVITY,
      dashboard: DASH,
      projects: PROJECTS,
    },
    add: ADD,
    arrow: ARROW,
    bell: BELL,
    back: CHEVRON_LEFT,
    chat: CHAT,
    cog: COG,
    contact: CONTACT,
    forward: CHEVRON_RIGHT,
    close: CLOSE,
    edit: PEN,
    menu: MENU,
    logout: LOGOUT,
    profile: PROFILE,
    settings: SETTINGS,
    code: CODE,
    trash: TRASH,
    tick: TICK,
    write: PENCIL,
  },
};

// default export object
