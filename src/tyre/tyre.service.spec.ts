import { Test, TestingModule } from '@nestjs/testing';
import { TyreService } from './tyre.service';

describe('TyreService', () => {
  let service: TyreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TyreService],
    }).compile();

    service = module.get<TyreService>(TyreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
