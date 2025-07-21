import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Mongoose } from 'mongoose';
import { GEOJSONMapData } from 'src/@Model/mapData.model';

@Injectable()
export class MapService {
  constructor(@InjectConnection() private mongo: Connection) {}

  private geojsonMapsCollection = this.mongo.collection('geojson');
  private mongoose = new Mongoose();

  public async fetchGeoJSONMaps(): Promise<GEOJSONMapData | any> {
    const result = await this.geojsonMapsCollection.find().toArray();

    if (result) {
      return result;
    } else {
      return 'not found';
    }
  }
}
