import { Test } from '@nestjs/testing';
import { UserConsentsService } from './user-consents.service';
import { UserConsentRepository } from './user-consents.repository';

const mockConsent = { id: '38f3974b-193b-44f7-97e7-605396ed0afa', enabled: true, consent_id: '35760c00-59d9-11eb-bd3d-34afd20ed0e9', userId: '38f3974b-193b-44f7-97e7-605396ed0afa' };

const mockConsentRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
  softDelete: jest.fn(),
});

describe('UserConsentsService', () => {
  let userConsentsService;
  let userConsentRepository;

  beforeEach(async () => {
    // Initialize each time to run each test case independently
    const module = await Test.createTestingModule({
      providers: [
        UserConsentsService,
        { provide: UserConsentRepository, useFactory: mockConsentRepository }, // UseFactory to be mocked over and over...
      ],
    }).compile();

    userConsentsService = module.get<UserConsentsService>(UserConsentsService);
    userConsentRepository = module.get<UserConsentRepository>(UserConsentRepository);
  });

  describe('get user consents', () => {
    it('get all user consents from the repository', async () => {
      userConsentRepository.findAndCount.mockReturnValue([mockConsent]);

      expect(userConsentRepository.findAndCount).not.toHaveBeenCalled();
      const result = await userConsentsService.listAllUserConsents({}, 1, 2, {});
      expect(userConsentRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([mockConsent]);
    });

    it('didn\'t match the searched keyword', async () => {
      userConsentRepository.findAndCount.mockResolvedValue([]);

      expect(userConsentRepository.findAndCount).not.toHaveBeenCalled();
      const result = await userConsentsService.listAllUserConsents();
      expect(userConsentRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getUserConsentById', () => {
    it('calls consentRepository.findOne() and successfully retrieve and return the user', async () => {
      userConsentRepository.findOneOrFail.mockResolvedValue(mockConsent);
      const result = await userConsentsService.findUserConsent('38f3974b-193b-44f7-97e7-605396ed0afa');
      expect(userConsentRepository.findOneOrFail).toHaveBeenCalled();
    });
  });

  describe('createUserConsent', () => {
    it('creates a consent and returns the created consent', async () => {
      userConsentRepository.save.mockReturnValue(mockConsent);
      const result = await userConsentsService.createUserConsent(mockConsent);
      expect(userConsentRepository.save).toHaveBeenCalledWith(mockConsent);
      expect(result).toEqual(mockConsent);
    });
  });

  describe('deleteUserConsent', () => {
    it('', async () => {
      userConsentRepository.findOneOrFail.mockResolvedValue(mockConsent);
      const mockDeleteResult = {affected: 1 };
      userConsentRepository.softDelete.mockResolvedValue(mockDeleteResult);
      const result = await userConsentsService.removeUserConsent(mockConsent.id);
      expect(userConsentRepository.findOneOrFail).toHaveBeenCalled();
      expect(userConsentRepository.softDelete).toHaveBeenCalledWith({ id: mockConsent.id });
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
