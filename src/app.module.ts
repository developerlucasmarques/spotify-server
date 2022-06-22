import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerAdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ManagerAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
