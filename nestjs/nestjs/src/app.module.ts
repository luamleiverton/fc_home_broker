import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma/prisma.service';

@Module({
  imports: [PrismaModule, AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
