export const LOGIN_SUCCESS = {
  message: 'Login successful',
  accessToken: 'some-jwt-token',
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
};

export const REFRESH_TOKEN_SUCCESS = {
  accessToken: 'some-new-jwt-token',
};

export const LOGOUT_SUCCESS = {
  message: 'Logout successful',
};

export const USER_PROFILE_SUCCESS = {
  user: {
    username: 'johndoe',
    email: 'john.doe@example.com',
  },
};

export const USER_UPDATE_SUCCESS = {
  message: 'User updated successfully',
  user: {
    email: 'john.doe.new@example.com',
    name: 'John Doe Updated',
  },
};

export const REQUEST_PASSWORD_RESET_SUCCESS = {
  message: 'Password reset email sent',
};

export const RESET_PASSWORD_SUCCESS = {
  message: 'Password has been reset successfully',
};
