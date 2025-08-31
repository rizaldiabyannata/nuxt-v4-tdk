export const GET_STATISTIC_SUCCESS = {
  success: true,
  data: {
    summary: {
      totalViews: 1000,
      uniqueViews: 800,
      portfolioViews: 600,
      blogViews: 400,
      portfolioUniqueViews: 500,
      blogUniqueViews: 300,
    },
    topContent: {
      portfolios: [
        {
          _id: '60f8e4b4c3e8a7b4c8a3b8d0',
          title: 'My First Portfolio',
          slug: 'my-first-portfolio',
          views: {
            total: 200,
            unique: 150,
          },
        },
        {
          _id: '60f8e4b4c3e8a7b4c8a3b8d1',
          title: 'My Second Portfolio',
          slug: 'my-second-portfolio',
          views: {
            total: 250,
            unique: 200,
          },
        },
      ],
      blogs: [
        {
          _id: '60f8e4b4c3e8a7b4c8a3b8c0',
          title: 'My First Blog Post',
          slug: 'my-first-blog-post',
          views: {
            total: 100,
            unique: 80,
          },
        },
        {
          _id: '60f8e4b4c3e8a7b4c8a3b8c1',
          title: 'My Second Blog Post',
          slug: 'my-second-blog-post',
          views: {
            total: 150,
            unique: 120,
          },
        },
      ],
    },
    dailyData: [
      {
        date: '2023-01-01',
        portfolioViews: 50,
        blogViews: 25,
        totalViews: 75,
      },
      {
        date: '2023-01-02',
        portfolioViews: 60,
        blogViews: 30,
        totalViews: 90,
      },
    ],
  },
};
