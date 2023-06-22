export const links = [
  {
    id: 1,
    text: 'Overview',
    url: '/M7Dashboard/overview',
  },
  {
    id: 2,
    text: 'Exception Pots',
    url: '/M7Dashboard/exceptionPots',
  },
];

const API_SERVER = 'http://nm-apps/mag7webapi/';
//const API_SERVER = 'http://localhost:64198/';

export const POTROOM_API_URL = `${API_SERVER}api/PotroomData/`;
export const CARBON_API_URL = `${API_SERVER}api/Carbon/`;
