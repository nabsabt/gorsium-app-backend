import { Inject, Injectable } from '@nestjs/common';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_BUCKET') private bucket: Bucket) {}

  public async fetchHomeImageURLs(prefix = ''): Promise<Array<string>> {
    const [files] = await this.bucket.getFiles({ prefix });
    /* const res = files.map(
      (file) =>
        `https://storage.googleapis.com/${this.bucket.name}/${file.name}`,
    ); */

    const res = files.map(
      (file) =>
        `https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`,
    );
    console.log(res.length);
    return res;
  }
}
