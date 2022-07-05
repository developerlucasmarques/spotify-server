import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
