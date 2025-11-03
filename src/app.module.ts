import { Module } from '@nestjs/common';
import { A2aModule } from './a2a/a2a.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available everywhere
    }),
    A2aModule, // Import the module that handles the Telex communication
  ],
})
export class AppModule {}