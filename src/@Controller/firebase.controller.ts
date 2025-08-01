import { Controller, Get, NotFoundException } from '@nestjs/common';
import { GEOJSONMapData } from 'src/@Model/mapData.model';
import { FirebaseService } from 'src/@Service/firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Get('getHomeImageURLs')
  public async getHomeImageURLs(): Promise<Array<string>> {
    const imgUrls: Array<string> =
      await this.firebaseService.fetchHomeImageURLs();

    return imgUrls as any;
  }
}
