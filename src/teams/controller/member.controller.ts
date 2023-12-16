import { Body, Controller, Post, Get, Headers, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { MemberService } from '../service/member.service';
import { AddMemberDto, UpdateMemberDto, DeleteMemberDto } from '../dto/member';

@Controller('members')
export class MemberController {
    constructor(private memberService: MemberService) {}

    @UseGuards(JwtAuthGuard)
    @Post('add-member')
    async addMember(@Request() req, @Body() addMemberDto: AddMemberDto) {
        const userId = req.user.userId;
        addMemberDto.userId = userId;
        return this.memberService.addMember(addMemberDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-members-team/:id')
    async getMembersTeam(@Request() req) {
        const id = req.params.id;
        return this.memberService.getMembersTeam(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-member')
    async updateMember(@Request() req, @Body() updateMemberDto: UpdateMemberDto) {
        const userId = req.user.userId;
        updateMemberDto.userId = userId;
        return this.memberService.updateMember(updateMemberDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-member')
    async deleteMember(@Request() req, @Body() deleteMemberDto: DeleteMemberDto) {
        const userId = req.user.userId;
        deleteMemberDto.idUser = userId;
        return this.memberService.deleteMember(deleteMemberDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-teams-user')
    async getTeamsUser(@Request() req) {
        const id = req.user.userId;
        return this.memberService.getTeamsUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('leave-team')
    async leaveTeam(@Request() req, @Body() deleteMemberDto: DeleteMemberDto) {
        const userId = req.user.userId;
        deleteMemberDto.idUser = userId;
        return this.memberService.leaveTeam(deleteMemberDto);
    }
}