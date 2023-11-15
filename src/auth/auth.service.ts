import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto, LoginUserDto, RequestPasswordResetDto, ResetPasswordDto, UpdateUserDto, ChangePassword } from './dto';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private readonly microserviceBaseUrl = 'http://localhost:3002';

    constructor(private httpService: HttpService) {}

    register(createUserDto: CreateUserDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/register`, createUserDto)
               .pipe(map(response => response.data))
               .toPromise();
    }

    login(loginUserDto: LoginUserDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/login`, loginUserDto)
               .pipe(map(response => response.data))
               .toPromise();
    }

    logout(authHeader: string) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/logout`, {}, { headers: { Authorization: authHeader } })
               .pipe(map(response => response.data))
               .toPromise();
    }

    requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/request-password-reset`, requestPasswordResetDto)
               .pipe(map(response => response.data))
               .toPromise();
    }

    resetPassword(resetPasswordDto: ResetPasswordDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/reset-password`, resetPasswordDto)
               .pipe(map(response => response.data))
               .toPromise();
    }

    changePassword(changePasswordDto: ChangePassword) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/change-password`, changePasswordDto)
               .pipe(map(response => response.data))
               .toPromise();
    }

    getUser(userId: number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/users/${userId}`)
               .pipe(map(response => response.data))
               .toPromise();
    }

    deleteUser(userId: number) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/users/${userId}`)
               .pipe(map(response => response.data))
               .toPromise();
    }

    updateUser(updateUserDto: UpdateUserDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/users/update`, updateUserDto)
               .pipe(map(response => response.data))
               .toPromise();
    }
}
