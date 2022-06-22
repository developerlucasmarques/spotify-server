import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: 'Spotify Server is running! 🚀🔊🎵🎧',
      docs: baseUrl + '/api',
    };
  }
  
}
