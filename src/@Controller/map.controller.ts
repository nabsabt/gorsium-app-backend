import { Controller, Get, NotFoundException } from '@nestjs/common';
import { GEOJSONMapData } from 'src/@Model/mapData.model';
import { MapService } from 'src/@Service/map.service';

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('getGEOJSONLayers')
  public async getGEOJSONLayers(): Promise<Array<GEOJSONMapData>> {
    const maps: Array<GEOJSONMapData | string> =
      await this.mapService.fetchGeoJSONMaps();

    if (typeof maps === 'string') {
      throw new NotFoundException('GeoJSON térképek lekérése sikertelen!');
    } else {
      return maps as any;
    }
  }

  @Get('getLocationMarkers')
  public async getLocationMarkers(): Promise<JSON | object> {
    const location: Array<JSON | object | string> =
      await this.mapService.fetchLocationMarkers();

    if (typeof location === 'string') {
      throw new NotFoundException('Lokációpontok lekérése sikertelen!');
    } else {
      return location as any;
    }
  }
}
