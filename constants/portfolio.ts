export const GET_PORTFOLIOS_SUCCESS = {
  data: [
    {
      _id: '60f8e4b4c3e8a7b4c8a3b8d0',
      title: 'My First Portfolio',
      description: '<p>This is my first portfolio. I hope you like it!</p>',
      shortDescription: 'This is a summary of my first portfolio.',
      coverImage: '/img/dummy/image1.png',
      link: 'https://example.com',
      slug: 'my-first-portfolio',
      isArchived: false,
      views: {
        total: 200,
        unique: 150,
      },
      viewHistory: [
        {
          date: new Date('2023-02-01'),
          count: 100,
        },
        {
          date: new Date('2023-02-02'),
          count: 100,
        },
      ],
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01'),
    },
    {
      _id: '60f8e4b4c3e8a7b4c8a3b8d1',
      title: 'My Second Portfolio',
      description: '<p>This is my second portfolio. I hope you like it!</p>',
      shortDescription: 'This is a summary of my second portfolio.',
      coverImage: '/img/dummy/image2.png',
      link: 'https://example.com',
      slug: 'my-second-portfolio',
      isArchived: false,
      views: {
        total: 250,
        unique: 200,
      },
      viewHistory: [
        {
          date: new Date('2023-02-03'),
          count: 125,
        },
        {
          date: new Date('2023-02-04'),
          count: 125,
        },
      ],
      createdAt: new Date('2023-02-03'),
      updatedAt: new Date('2023-02-03'),
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 2,
    limit: 10,
  },
};

export const GET_PORTFOLIOS_ARCHIVES_SUCCESS = [
  {
    year: 2023,
    months: [
      {
        month: 2,
        count: 2,
      },
    ],
  },
];

export const GET_PORTFOLIO_SLUG_SUCCESS_NOT_AUTH = {
  message: 'Portfolio retrieved successfully',
  data: {
    slug: 'my-first-portfolio',
    title: 'My First Portfolio',
    description: '<p>This is my first portfolio. I hope you like it!</p>',
    shortDescription: 'This is a summary of my first portfolio.',
    link: 'https://example.com',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-02-01'),
  },
};

export const GET_PORTFOLIO_SLUG_SUCCESS_AUTH = {
  message: 'Portfolio retrieved successfully',
  data: {
    _id: '60f8e4b4c3e8a7b4c8a3b8d0',
    title: 'My First Portfolio',
    description: '<p>This is my first portfolio. I hope you like it!</p>',
    shortDescription: 'This is a summary of my first portfolio.',
    coverImage: '/img/dummy/image1.png',
    link: 'https://example.com',
    slug: 'my-first-portfolio',
    isArchived: false,
    views: {
      total: 200,
      unique: 150,
    },
    viewHistory: [
      {
        date: new Date('2023-02-01'),
        count: 100,
      },
      {
        date: new Date('2023-02-02'),
        count: 100,
      },
    ],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
  },
};

export const CREATE_PORTFOLIO_SUCCESS = {
  message: 'Portfolio created successfully',
  data: {
    slug: 'new-portfolio',
    title: 'New Portfolio',
    description: '<p>This is a new portfolio.</p>',
    shortDescription: 'This is a summary of the new portfolio.',
    link: 'https://example.com',
    coverImage: '/img/dummy/image3.png',
    createdAt: new Date('2023-02-05'),
  },
};

export const UPDATE_PORTFOLIO_SUCCESS = {
  message: 'Portfolio updated successfully',
  data: {
    slug: 'my-first-portfolio',
    title: 'My First Portfolio (Updated)',
    description: '<p>This is my first portfolio, but updated. I hope you like it!</p>',
    shortDescription: 'This is a summary of my first portfolio (updated).',
    link: 'https://example.com',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-02-01'),
    isArchived: false,
  },
};

export const DELETE_PORTFOLIO_SUCCESS = {
  message: 'Portfolio deleted successfully',
};

export const ARCHIVE_PORTFOLIO_SUCCESS = {
  message: 'Portfolio archived successfully',
  data: {
    slug: 'my-first-portfolio',
    title: 'My First Portfolio',
    description: '<p>This is my first portfolio. I hope you like it!</p>',
    shortDescription: 'This is a summary of my first portfolio.',
    link: 'https://example.com',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-02-01'),
    isArchived: true,
  },
};

export const UNARCHIVE_PORTFOLIO_SUCCESS = {
  message: 'Portfolio unarchived successfully',
  data: {
    slug: 'my-first-portfolio',
    title: 'My First Portfolio',
    description: '<p>This is my first portfolio. I hope you like it!</p>',
    shortDescription: 'This is a summary of my first portfolio.',
    link: 'https://example.com',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-02-01'),
    isArchived: false,
  },
};
