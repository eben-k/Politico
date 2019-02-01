const userDetails = {
  admin: {
    id: 1,
    firstname: 'Admin',
    lastname: 'admin',
    phoneNumber: 45678990,
    email: 'admin@gmail.com',
    passportUrl: 'admin',
    isAdmin: true,
    password: 'sxdfkgrlt',
  },
  user1: {
    id: 1,
    firstname: 'Adam',
    lastname: 'Smith',
    othername: 'admin',
    email: 'admin@gmail.com',
    passportUrl: 'admin',
    isAdmin: false,
  },
  user2: {
    id: 2,
    firstname: 'Adane',
    lastname: 'Law',
    othername: 'admin',
    email: 'adane@gmail.com',
    passportUrl: 'admin',
    isAdmin: false,
  },
  newUser: {
    id: 5,
    firstname: 'Adane',
    lastname: 'Law',
    email: 'adane@gmail.com',
    phoneNumber: 23445567,
    passportUrl: 'admin',
    isAdmin: false,
    password: 'sddfghjr',
  },
  emptyUserField: {
    firstname: '',
    lastname: 'Law',
    phoneNumber: '',
    email: 'adane@gmail.com',
    passportUrl: 'admin',
    isAdmin: false,
  },

  spacedUserField: {
    firstname: '    ',
    // lastname: 'Law',
    // phoneNumber: 23445567,
    // email: 'adane@gmail.com',
    // passportUrl: 'admin',
    // isAdmin: false,
  },
  wrongPassword: {
    firstname: 'Adane',
    lastname: 'Law',
    phoneNumber: 23445567,
    email: 'adane@gmail.com',
    passportUrl: 'admin',
    isAdmin: false,
    password: 'xhdjfjfk',
  },
};

const partyDetails = {
  party1: {
    partyId: 1,
    name: 'Conservative Party',
    hqAddress: '40 Hanson Street, Las Palmas',
    logoUrl: 'xxxx.com',
    email: 'pp@gmail.com',
    phone: '23480000089',
  },
  party2: {
    partyId: 2,
    name: 'Liberty Party',
    hqAddress: '40 Hanson Street, Las Palmas',
    logoUrl: 'xxxx.com',
    email: 'lp@gmail.com',
    phone: '23480000089',
  },
  emptyField: {
    name: '',
    // hqAddress: '40 Hanson Street, Las Palmas',
    // logoUrl: 'xxxx.com',
    // email: 'pp@gmail.com',
    // phone: '23480000089',
  },
  spacedField: {
    name: '    ',
    // hqAddress: '40 Hanson Street, Las Palmas',
    // logoUrl: 'xxxx.com',
    // email: 'pp@gmail.com',
    // phone: '23480000089',
  },
  newParty: {
    id: 7,
    name: 'FreedomParty',
    hqAddress: '40 Hanson Street, Las Palmas',
    logoUrl: 'xxxx.com',
    email: 'pp@gmail.com',
    phone: '23480000089',
  },
  updateParty: {
    name: 'FreeParty',
    hqAddress: '40 Hanson Street, Las Palmas',
    logoUrl: 'xxxx.com',
    email: 'pp@gmail.com',
    phone: '23480000089',
  },

};

const officeDetails = {
  nullField: {
    type: '',
    name: 'President',
  },
  spaceField: {
    type: '   ',
    name: 'President',
  },
  newOffice: {
    officeId: 3,
    type: 'Federal',
    name: 'President',
  },
  office: {
    officeId: 1,
    type: 'Federal',
    name: 'President',
  },
  office2: {
    officeId: 2,
    type: 'State',
    name: 'Governor',
  },
};

export { userDetails, partyDetails, officeDetails };
