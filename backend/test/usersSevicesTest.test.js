// const userService = require('../src/services/users.service');
// const User = require('../src/models/UserScheme');
//
// jest.mock('../src/models/UserScheme');
//
// describe('Users Service', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//
//     describe('getAllUsers', () => {
//         test('should get all users', async () => {
//             // Mocking the behavior of the User model
//             const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
//             User.find.mockResolvedValue(mockUsers);
//
//             const result = await userService.getAllUsers();
//
//             expect(User.find).toHaveBeenCalled();
//             expect(result).toEqual(mockUsers);
//         });
//
//         // Add more test cases for different scenarios...
//     });
//
//     describe('getUserById', () => {
//         test('should get user by ID', async () => {
//             // Mocking the behavior of the User model
//             const mockUser = { id: 1, name: 'User 1' };
//             User.findById.mockResolvedValue(mockUser);
//
//             const result = await userService.getUserById(1);
//
//             expect(User.findById).toHaveBeenCalledWith(1);
//             expect(result).toEqual(mockUser);
//         });
//
//         // Add more test cases for different scenarios...
//     });
//
//     // Repeat similar patterns for other service methods...
//
//     describe('createUser', () => {
//         test('should create a new user', async () => {
//             // Mocking the behavior of the User model and dependencies
//             const mockUser = { name: 'Test User', email: 'test@example.com', password: 'password123' };
//             User.findOne.mockResolvedValue(null);
//             User.prototype.save.mockResolvedValue(mockUser);
//
//             const result = await userService.createUser(mockUser);
//
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
//             expect(User.prototype.save).toHaveBeenCalled();
//             expect(result).toEqual(mockUser);
//         });
//
//         // Add more test cases for different scenarios...
//     });
//
//     describe('createGoogleUser', () => {
//         test('should create a new Google user', async () => {
//             // Mocking the behavior of the User model and dependencies
//             const mockGoogleUser = { name: 'Google User', email: 'google@example.com', profile_image: 'image.jpg' };
//             User.findOne.mockResolvedValue(null);
//             User.prototype.save.mockResolvedValue(mockGoogleUser);
//
//             const result = await userService.createGoogleUser(mockGoogleUser);
//
//             expect(User.findOne).toHaveBeenCalledWith({ email: 'google@example.com' });
//             expect(User.prototype.save).toHaveBeenCalled();
//             expect(result).toEqual(mockGoogleUser);
//         });
//
//         // Add more test cases for different scenarios...
//     });
//
//     // Add tests for other service methods...
// });
