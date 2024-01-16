const User = require('../../models/users');
const { getAllUsers } = require('../../controllers/users');

describe('getAllUsers', () => {
  it('should return all users', async () => {
    const users = [{ name: 'John' }, { name: 'Jane' }];
    User.find = jest.fn().mockResolvedValue(users);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllUsers(req, res, next);

    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: '✅ success',
      results: users.length,
      data: {
        users: users,
      },
    });
  });
});
