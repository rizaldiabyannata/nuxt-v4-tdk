export const GET_CONTENT_TRACKING_SUCCESS = {
  data: {
    highlightedPortfolios: [
      {
        _id: '60f8e4b4c3e8a7b4c8a3b8d0',
        title: 'My First Portfolio',
        slug: 'my-first-portfolio',
        coverImage: '/img/sample/sample-4.jpeg',
        shortDescription: 'This is a summary of my first portfolio.',
        link: 'https://example.com',
      },
    ],
    featuredBlogs: [
      {
        _id: '60f8e4b4c3e8a7b4c8a3b8c0',
        title: 'My First Blog Post',
        slug: 'my-first-blog-post',
        summary: 'This is a summary of my first blog post.',
        coverImage: '/img/sample/sample-1.jpeg',
        createdAt: new Date('2023-01-01'),
      },
    ],
    lastUpdated: new Date('2023-03-01'),
  },
};

export const RESET_CONTENT_TRACKING_SUCCESS = {
  message: 'Content tracking reset successfully',
  data: {
    featuredBlogs: [],
    highlightedPortfolios: [],
    lastUpdated: new Date('2023-03-01'),
  },
};

export const ADD_FEATURED_BLOG_SUCCESS = {
  success: true,
  message: 'Featured blog added successfully',
  data: {
    featuredBlogs: ['60f8e4b4c3e8a7b4c8a3b8c0'],
    highlightedPortfolios: ['60f8e4b4c3e8a7b4c8a3b8d0'],
    lastUpdated: new Date('2023-03-01'),
  },
};

export const DELETE_FEATURED_BLOG_SUCCESS = {
  message: 'Featured blog deleted successfully',
  data: {
    featuredBlogs: [],
    highlightedPortfolios: ['60f8e4b4c3e8a7b4c8a3b8d0'],
    lastUpdated: new Date('2023-03-01'),
  },
};

export const ADD_HIGHLIGHTED_PORTFOLIO_SUCCESS = {
  message: 'Highlighted portfolio added successfully',
  data: {
    featuredBlogs: ['60f8e4b4c3e8a7b4c8a3b8c0'],
    highlightedPortfolios: ['60f8e4b4c3e8a7b4c8a3b8d0'],
    lastUpdated: new Date('2023-03-01'),
  },
};

export const DELETE_HIGHLIGHTED_PORTFOLIO_SUCCESS = {
  success: true,
  message: 'Highlighted portfolio deleted successfully',
  data: {
    featuredBlogs: ['60f8e4b4c3e8a7b4c8a3b8c0'],
    highlightedPortfolios: [],
    lastUpdated: new Date('2023-03-01'),
  },
};
