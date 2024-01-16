const usersController = require('../../controllers/users');
const User = require('../../models/users');

jest.mock('../models/users'); // Mock the User model

describe('User Controller Unit Tests', () => {
  test('getAllUsers should return all users', async () => {
    const mockUsers = [{ username: 'user1' }, { username: 'user2' }];
    User.find.mockResolvedValue(mockUsers);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usersController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: '✅ success',
      results: mockUsers.length,
      data: {
        users: mockUsers,
      },
    });
  });

  // Similar tests for other functions
});
