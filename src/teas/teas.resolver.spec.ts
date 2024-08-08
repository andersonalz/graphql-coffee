import { Test, TestingModule } from '@nestjs/testing';
import { TeasResolverResolver } from './teas.resolver';

describe('TeasResolverResolver', () => {
  let resolver: TeasResolverResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeasResolverResolver],
    }).compile();

    resolver = module.get<TeasResolverResolver>(TeasResolverResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
