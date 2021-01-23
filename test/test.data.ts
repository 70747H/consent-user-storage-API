export const usersGetResponse = {
  code: 200,
  isError: false,
  status: 'OK',
  message: 'success',
  data: [
    {
      consents: [],
      id: '14a1fe4d-047d-436c-b56e-a0e00fa4a898',
      email: 'b@c.com',
    },
    {
      consents: [],
      id: '38f3974b-193b-44f7-97e7-605396ed0af',
      email: 'd@e.com',
    },
  ],
  pageInfo: { pageCount: 1, currentPage: 1, nextPage: null, itemCount: 2 },
};

export const usersEmptyGetResponse = {
  code: 200,
  isError: false,
  status: 'OK',
  message: 'success',
  data: [],
  pageInfo: { pageCount: 0, currentPage: 1, nextPage: null, itemCount: 0 },
};

export const createUserObject = {
  email: 'a@b.com',
};

export const createEventObject = {
  user: {
    id: 'f3e9b037-3960-4f15-b5ed-58e4e372d0b3',
  },
  consents: [
    {
      id: 'email_notifications',
      enabled: false,
    },
    {
      id: 'sms_notifications',
      enabled: true,
    },
  ],
};
