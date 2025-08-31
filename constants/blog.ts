export const GET_BLOGS_SUCCESS = {
  data: [
    {
      _id: '60f8e4b4c3e8a7b4c8a3b8c0',
      title: 'My First Blog Post',
      slug: 'my-first-blog-post',
      content: '<p>This is my first blog post. I hope you like it!</p>',
      coverImage: '/img/dummy/image1.png',
      summary: 'This is a summary of my first blog post.',
      author: 'John Doe',
      isArchived: false,
      views: {
        total: 100,
        unique: 80,
      },
      viewHistory: [
        {
          date: new Date('2023-01-01'),
          count: 50,
        },
        {
          date: new Date('2023-01-02'),
          count: 50,
        },
      ],
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      _id: '60f8e4b4c3e8a7b4c8a3b8c1',
      title: 'My Second Blog Post',
      slug: 'my-second-blog-post',
      content: '<p>This is my second blog post. I hope you like it!</p>',
      coverImage: '/img/dummy/image2.png',
      summary: 'This is a summary of my second blog post.',
      author: 'John Doe',
      isArchived: false,
      views: {
        total: 150,
        unique: 120,
      },
      viewHistory: [
        {
          date: new Date('2023-01-03'),
          count: 75,
        },
        {
          date: new Date('2023-01-04'),
          count: 75,
        },
      ],
      createdAt: new Date('2023-01-03'),
      updatedAt: new Date('2023-01-03'),
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 2,
    limit: 10,
  },
};

export const GET_BLOGS_ARCHIVES_SUCCESS = [
  {
    year: 2023,
    months: [
      {
        month: 1,
        count: 2,
      },
    ],
  },
];

export const GET_BLOG_SLUG_SUCCESS_NOT_AUTH = {
  message: 'Blog post retrieved successfully',
  data: {
    slug: 'my-first-blog-post',
    title: 'My First Blog Post',
    content: '<p>This is my first blog post. I hope you like it!</p>',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-01-01'),
  },
};

export const GET_BLOG_SLUG_SUCCESS_AUTH = {
  message: 'Blog post retrieved successfully',
  data: {
    _id: '60f8e4b4c3e8a7b4c8a3b8c0',
    title: 'My First Blog Post',
    slug: 'my-first-blog-post',
    content: '<p>This is my first blog post. I hope you like it!</p>',
    coverImage: '/img/dummy/image1.png',
    summary: 'This is a summary of my first blog post.',
    author: 'John Doe',
    isArchived: false,
    views: {
      total: 100,
      unique: 80,
    },
    viewHistory: [
      {
        date: new Date('2023-01-01'),
        count: 50,
      },
      {
        date: new Date('2023-01-02'),
        count: 50,
      },
    ],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
};

export const CREATE_BLOG_SUCCESS = {
  message: 'Blog post created successfully',
  data: {
    slug: 'new-blog-post',
    title: 'New Blog Post',
    content: '<p>This is a new blog post.</p>',
    coverImage: '/img/dummy/image3.png',
    createdAt: new Date('2023-01-05'),
  },
};

export const UPDATE_BLOG_SUCCESS = {
  message: 'Blog post updated successfully',
  data: {
    slug: 'my-first-blog-post',
    title: 'My First Blog Post (Updated)',
    content: '<p>This is my first blog post, but updated. I hope you like it!</p>',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-01-01'),
    isArchived: false,
  },
};

export const DELETE_BLOG_SUCCESS = {
  message: 'Blog post deleted successfully',
};

export const ARCHIVE_BLOG_SUCCESS = {
  message: 'Blog post archived successfully',
  data: {
    slug: 'my-first-blog-post',
    title: 'My First Blog Post',
    content: '<p>This is my first blog post. I hope you like it!</p>',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-01-01'),
    isArchived: true,
  },
};

export const UNARCHIVE_BLOG_SUCCESS = {
  message: 'Blog post unarchived successfully',
  data: {
    slug: 'my-first-blog-post',
    title: 'My First Blog Post',
    content: '<p>This is my first blog post. I hope you like it!</p>',
    coverImage: '/img/dummy/image1.png',
    createdAt: new Date('2023-01-01'),
    isArchived: false,
  },
};
