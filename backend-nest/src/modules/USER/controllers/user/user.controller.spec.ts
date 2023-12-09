import { Test, TestingModule } from '@nestjs/testing';
import { UserTsController } from './user.controller';

describe('UserTsController', () => {
  let controller: UserTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTsController],
    }).compile();

    controller = module.get<UserTsController>(UserTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
