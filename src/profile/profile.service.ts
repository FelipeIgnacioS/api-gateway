import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { updateProfileDto } from './dto';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  private readonly microserviceBaseUrl = 'http://localhost:3002'; 

  constructor(private httpService: HttpService) {}

  getProfile(userId: number) {
    return this.httpService.get(`${this.microserviceBaseUrl}/profiles/${userId}`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  updateProfile(userId: number, updateProfileDto: updateProfileDto) {
    return this.httpService.put(`${this.microserviceBaseUrl}/profiles/${userId}`, updateProfileDto)
               .pipe(map(response => response.data))
               .toPromise();
  }
}
