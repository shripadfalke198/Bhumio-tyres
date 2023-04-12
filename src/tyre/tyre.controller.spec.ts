import { Test, TestingModule } from '@nestjs/testing';
import { TyreController } from './tyre.controller';

describe('TyreController', () => {
  let controller: TyreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TyreController],
    }).compile();

    controller = module.get<TyreController>(TyreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
