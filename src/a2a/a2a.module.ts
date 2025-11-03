import { Module } from '@nestjs/common';
import { A2aController } from './a2a.controller';
import { A2aService } from './a2a.service';
import { MastraModule } from '../mastra/mastra.module';

@Module({
  imports: [MastraModule], // Import the Mastra module to make MastraService available
  controllers: [A2aController],
  providers: [A2aService],
})
export class A2aModule {}