import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsLogsService } from './applications-logs.service';

describe('ApplicationsLogsService', () => {
  let service: ApplicationsLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsLogsService],
    }).compile();

    service = module.get<ApplicationsLogsService>(ApplicationsLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
