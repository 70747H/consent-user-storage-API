import { Test } from '@nestjs/testing';
import { ConsentsService } from './consents.service';
import { ConsentRepository } from './consent.repository';

const mockConsent = { id: '38f3974b-193b-44f7-97e7-605396ed0afa', name: 'email_notifications' };

const mockConsentRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
  softDelete: jest.fn(),
});

describe('ConsentsService', () => {
  let consentService;
  let consentRepository;

  beforeEach(async () => {
    // Initialize each time to run each test case independently
    const module = await Test.createTestingModule({
      providers: [
        ConsentsService,
        { provide: ConsentRepository, useFactory: mockConsentRepository }, // UseFactory to be mocked over and over...
      ],
    }).compile();

    consentService = module.get<ConsentsService>(ConsentsService);
    consentRepository = module.get<ConsentRepository>(ConsentRepository);
  });

  describe('get consents', () => {
    it('get all consents from the repository', async () => {
      consentRepository.findAndCount.mockReturnValue([mockConsent]);

      expect(consentRepository.findAndCount).not.toHaveBeenCalled();
      const result = await consentService.listAllConsent({}, 1, 2, {});
      expect(consentRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([mockConsent]);
    });

    it('didn\'t match the searched keyword', async () => {
      consentRepository.findAndCount.mockResolvedValue([]);

      expect(consentRepository.findAndCount).not.toHaveBeenCalled();
      const result = await consentService.listAllConsent();
      expect(consentRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getConsentById', () => {
    it('calls consentRepository.findOne() and successfully retrieve and return the user', async () => {
      consentRepository.findOneOrFail.mockResolvedValue(mockConsent);
      const result = await consentService.findConsent('38f3974b-193b-44f7-97e7-605396ed0afa');
      expect(result).toEqual(mockConsent);
      expect(consentRepository.findOneOrFail).toHaveBeenCalled();
    });
  });

  describe('createConsent', () => {
    it('creates a consent and returns the created consent', async () => {
      consentRepository.save.mockReturnValue(mockConsent);
      const result = await consentService.createConsent(mockConsent);
      expect(consentRepository.save).toHaveBeenCalledWith(mockConsent);
      expect(result).toEqual(mockConsent);
    });
  });

  describe('deleteConsent', () => {
    it('', async () => {
      consentRepository.findOneOrFail.mockResolvedValue(mockConsent);
      const mockDeleteResult = {affected: 1 };
      consentRepository.softDelete.mockResolvedValue(mockDeleteResult);
      const result = await consentService.removeConsent(mockConsent.id);
      expect(consentRepository.findOneOrFail).toHaveBeenCalled();
      expect(consentRepository.softDelete).toHaveBeenCalledWith({ id: mockConsent.id });
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
