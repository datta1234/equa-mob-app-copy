import airbnb from 'assets/syncApps/airbnb.png';
import aldi from 'assets/syncApps/aldi.png';
import britishAirWays from 'assets/syncApps/british.png';
import BritishGas from 'assets/syncApps/BritishGas.png';
import Bulb from 'assets/syncApps/Bulb.png';
import EON from 'assets/syncApps/E.ON.png';
import EDF from 'assets/syncApps/EDF.png';
import emiratesImg from 'assets/syncApps/emirates.png';
import JustEat from 'assets/syncApps/JustEat.png';
import Lidl from 'assets/syncApps/Lidl.png';
import LondonBuses from 'assets/syncApps/LondonBuses.png';
import LondonUnderground from 'assets/syncApps/LondonUnderground.png';
import myfitnesspalImg from 'assets/syncApps/myfitnesspal.png';
import paypalImg from 'assets/syncApps/paypal.png';
import ShellEnergy from 'assets/syncApps/ShellEnergy.png';
import skyscanner from 'assets/syncApps/skyscanner.png';
import SSE from 'assets/syncApps/SSE.png';
import Tesco from 'assets/syncApps/Tesco.png';
import tfl from 'assets/syncApps/tfl.png';
import TfLGo from 'assets/syncApps/TfLGo.png';
import uber from 'assets/syncApps/travel/publicTransportation/uber.png';
import uberEatsImg from 'assets/syncApps/uberEats.png';
import Zomato from 'assets/syncApps/Zomato.png';

export const SYNC_APPS = {
  travel: [
    {
      ket: 'p2',
      title: 'Air Travel',
      data: [
        {
          key: 0,
          name: 'British Airways',
          img: britishAirWays,
        },
        {
          key: 1,
          name: 'Emirates Airline',
          img: emiratesImg,
        },
        {
          key: 2,
          name: 'Skyscanner',
          img: skyscanner,
        },
        {
          key: 3,
          name: 'Uber Eats',
          img: uberEatsImg,
          isActive: true,
        },
      ],
    },
    {
      ket: 'p3',
      title: 'Public Transportation',
      data: [
        {
          key: 1,
          name: 'TfL Oyster and contactless',
          img: tfl,
        },
        {
          key: 2,
          name: 'TfL Go',
          img: TfLGo,
        },
        {
          key: 3,
          name: 'London Buses',
          img: LondonBuses,
        },
        {
          key: 3,
          name: 'London Underground',
          img: LondonUnderground,
        },
      ],
    },
    {
      ket: 'p4',
      title: 'Taxi',
      data: [
        {
          key: 1,
          name: 'Uber',
          img: uber,
        },
      ],
    },
    {
      ket: 'p5',
      title: 'Accommodations',
      data: [
        {
          key: 1,
          name: 'Airbnb',
          img: airbnb,
        },
      ],
    },
  ],
  food: [
    {
      ket: 'p2',
      title: 'Grocery Stores',
      data: [
        {
          key: 0,
          name: 'ALDI',
          img: aldi,
        },
        {
          key: 1,
          name: 'Lidl',
          img: Lidl,
        },
        {
          key: 2,
          name: 'Tesco',
          img: Tesco,
        },
      ],
    },
    {
      ket: 'p3',
      title: 'Food Delivery Services',
      data: [
        {
          key: 1,
          name: 'Just Eat',
          img: JustEat,
        },
        {
          key: 2,
          name: 'Uber Eats',
          img: uberEatsImg,
        },
        {
          key: 3,
          name: 'Zomato',
          img: Zomato,
        },
      ],
    },
  ],
  home: [
    {
      ket: 'p2',
      title: 'Gas',
      data: [
        {
          key: 0,
          name: 'British Gas',
          img: BritishGas,
        },
        {
          key: 1,
          name: 'Shell Energy',
          img: ShellEnergy,
        },
      ],
    },
    {
      ket: 'p3',
      title: 'Electricity',
      data: [
        {
          key: 1,
          name: 'Bulb',
          img: Bulb,
        },
        {
          key: 2,
          name: 'E.ON',
          img: EON,
        },
        {
          key: 3,
          name: 'EDF',
          img: EDF,
        },
        {
          key: 4,
          name: 'SSE',
          img: SSE,
        },
      ],
    },
  ],
  purchase: [
    {
      ket: 'p2',
      title: 'Payment systems',
      data: [
        {
          key: 0,
          name: 'PayPal',
          img: paypalImg,
        },
      ],
    },
  ],
};

export const travel = [
  {
    ket: 'p2',
    title: 'Air Travel',
    data: [
      {
        key: 0,
        name: 'PayPal',
        img: paypalImg,
      },
      {
        key: 1,
        name: 'Emirates Airline',
        img: emiratesImg,
      },
      {
        key: 2,
        name: 'MyFitnesSpa',
        img: myfitnesspalImg,
      },
      {
        key: 3,
        name: 'Uber Eats',
        img: uberEatsImg,
        isActive: true,
      },
    ],
  },
  {
    ket: 'p3',
    title: 'More Travel',
    data: [
      {
        key: 0,
        name: 'PayPal',
        img: paypalImg,
        isActive: true,
      },
      {
        key: 1,
        name: 'Emirates Airline',
        img: emiratesImg,
      },
      {
        key: 2,
        name: 'MyFitnesSpa',
        img: myfitnesspalImg,
      },
      {
        key: 3,
        name: 'Uber Eats',
        img: uberEatsImg,
      },
    ],
  },
];
