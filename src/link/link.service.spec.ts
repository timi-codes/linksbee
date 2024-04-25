import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Analytics } from './analytics/analytics.schema';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getRepositoryToken(Link),
          useValue: {},
        },
        {
          provide: getModelToken(Analytics.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
