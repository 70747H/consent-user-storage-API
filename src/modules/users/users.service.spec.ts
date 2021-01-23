import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { UserRepository } from './users.repository';

const mockUser = { id: '38f3974b-193b-44f7-97e7-605396ed0afa', email: '70747h@gmail.com' };

const mockUserRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
  softDelete: jest.fn(),
});

describe('UsersService', () => {
  let userService;
  let userRepository;

  beforeEach(async () => {
    // Initialize each time to run each test case independently
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository }, // UseFactory to be mocked over and over...
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('get users', () => {
    it('get all users from the repository', async () => {
      userRepository.findAndCount.mockResolvedValue([mockUser]);

      expect(userRepository.findAndCount).not.toHaveBeenCalled();
      const result = await userService.listAllUsers();
      expect(userRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });

    it('didn\'t match the searched keyword', async () => {
      userRepository.findAndCount.mockResolvedValue([]);

      expect(userRepository.findAndCount).not.toHaveBeenCalled();
      const result = await userService.listAllUsers({ search: 1 });
      expect(userRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getUserById', () => {
    it('calls userRepository.findOne() and successfully retrieve and return the user', async () => {
      userRepository.findOneOrFail.mockResolvedValue(mockUser);
      const result = await userService.findUser('38f3974b-193b-44f7-97e7-605396ed0afa');
      expect(result).toEqual(mockUser);
      expect(userRepository.findOneOrFail).toHaveBeenCalledWith({ relations: ['consents', 'consents.consent'], where: { id: '38f3974b-193b-44f7-97e7-605396ed0afa' } });
    });
  });

  describe('createUser', () => {
    it('creates a user and returns the created user', async () => {
      userRepository.save.mockReturnValue(mockUser);
      const result = await userService.createUser(mockUser);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('', async () => {
      userRepository.findOneOrFail.mockResolvedValue(mockUser);
      const mockDeleteResult = {affected: 1 };
      userRepository.softDelete.mockResolvedValue(mockDeleteResult);
      const result = await userService.removeUser(mockUser.id);
      expect(userRepository.findOneOrFail).toHaveBeenCalled();
      expect(userRepository.softDelete).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
