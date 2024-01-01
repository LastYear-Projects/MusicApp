const UsersController = require('../controllers/users.controller');
const userService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../services/users.service');



describe('Users Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllUsers should get all users', async () => {
        const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
        userService.getAllUsers.mockResolvedValue(mockUsers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UsersController.getAllUsers(req, res);

        expect(userService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    test('getAllUsers should handle errors when getting all users', async () => {
        const errorMessage = 'Error fetching users';
        userService.getAllUsers.mockRejectedValue(new Error(errorMessage));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UsersController.getAllUsers(req, res);

        expect(userService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    // Repeat similar patterns for other controller methods...

    test('userLogin should log in a user with valid credentials', async () => {
        // Mock user data and service methods as needed
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UsersController.userLogin(req, res);

        // Add your assertions here
    });

    test('userLogin should handle errors during login', async () => {
        // Mock user service methods to simulate errors
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UsersController.userLogin(req, res);

        // Add your assertions here
    });
});

// Repeat similar patterns for other describe blocks...
