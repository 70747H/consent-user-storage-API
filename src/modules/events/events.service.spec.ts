import { Test } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventRepository } from './event.repository';

const mockEvent = {
  id: '38f3974b-193b-44f7-97e7-605396ed0afa',
  consents: [{ id: 'email_notifications', enabled: false }, { id: 'sms_notifications', enabled: true }],
  userId: '38f3974b-193b-44f7-97e7-605396ed0afa',
};

const createEventDto = {
  user: {
    id: 'f3e9b037-3960-4f15-b5ed-58e4e372d0b3',
  },
  consents: [
    {
      id: 'email_notifications',
      enabled: false,
    },
    {
      id: 'sms_notifications',
      enabled: true,
    },
  ],
};

const mockConsentRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
});

describe('EventsService', () => {
  let eventsService;
  let eventRepository;

  beforeEach(async () => {
    // Initialize each time to run each test case independently
    const module = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventRepository, useFactory: mockConsentRepository }, // UseFactory to be mocked over and over...
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    eventRepository = module.get<EventRepository>(EventRepository);
  });

  describe('get events', () => {
    it('get all events from the repository', async () => {
      eventRepository.findAndCount.mockReturnValue([mockEvent]);

      expect(eventRepository.findAndCount).not.toHaveBeenCalled();
      const result = await eventsService.listAllEvents({}, 1, 2, {});
      expect(eventRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([mockEvent]);
    });

    it('didn\'t match the searched keyword', async () => {
      eventRepository.findAndCount.mockResolvedValue([]);

      expect(eventRepository.findAndCount).not.toHaveBeenCalled();
      const result = await eventsService.listAllEvents();
      expect(eventRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getEventById', () => {
    it('calls eventRepository.findOne() and successfully retrieve and return the user', async () => {
      eventRepository.findOneOrFail.mockResolvedValue(mockEvent);
      const result = await eventsService.findEvent('38f3974b-193b-44f7-97e7-605396ed0afa');
      expect(result).toEqual(mockEvent);
      expect(eventRepository.findOneOrFail).toHaveBeenCalled();
    });
  });

  describe('createEvent', () => {
    it('creates a event and returns the created event', async () => {
      eventRepository.save.mockReturnValue(mockEvent);
      const result = await eventsService.createEvent(createEventDto);
      expect(result).toEqual(mockEvent);
    });
  });
});
