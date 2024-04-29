import { Test, TestingModule } from '@nestjs/testing';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Analytics } from './analytics/analytics.schema';
import { JwtService } from '@nestjs/jwt';

describe('LinkResolver', () => {
  let resolver: LinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkResolver,
        LinkService,
        {
          provide: getRepositoryToken(Link),
          useValue: {},
        },
        {
          provide: getModelToken(Analytics.name),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<LinkResolver>(LinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
