import { Module } from '@nestjs/common';
import { MastraService } from './mastra.service';

@Module({
  providers: [MastraService],
  exports: [MastraService], // IMPORTANT: Export the service so A2aModule can use it
})
export class MastraModule {}