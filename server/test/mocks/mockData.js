const userDetails = {
  admin: {
    id: 1,
    firstname: 'Admin',
    lastname: 'admin',
    othername: 'admin',
    email: 'admin@gmail.com',
    passportUrl: 'admin',
    isAdmin: true,
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
    name: 'Seyi Ibezim',
    username: 'ibezim',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },
  emptyField: {
    name: '',
    username: 'okoro',
    password: '',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },

  spacedField: {
    name: '     ',
    username: 'seyi',
    password: 'seyiii',
    role: 'attendant',
    email: 'seyi@gmail.com',
  },
  wrongPassword: {
    username: 'ogechi',
    password: 'juljnjbx',
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
