import { Test, TestingModule } from '@nestjs/testing';
import { A2aService } from './a2a.service';

describe('A2aService', () => {
  let service: A2aService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [A2aService],
    }).compile();

    service = module.get<A2aService>(A2aService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
