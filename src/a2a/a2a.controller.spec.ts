import { Test, TestingModule } from '@nestjs/testing';
import { A2aController } from './a2a.controller';

describe('A2aController', () => {
  let controller: A2aController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [A2aController],
    }).compile();

    controller = module.get<A2aController>(A2aController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
