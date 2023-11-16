import { IsString, IsNumber, IsOptional } from 'class-validator';
export class AddMemberDto {
    @IsNumber()
     teamId: number;
  
    @IsNumber()
     userId: number;
  
}
  
export class UpdateMemberDto {
    @IsNumber()
     userId: number;
  
    @IsNumber()
     teamId: number;
  
    @IsNumber()
     roleId: number;
}
  
export class CreateRoleDto {
  
    createdByUserId: number;
  
    @IsString()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    team_id: number;
}
  
  
export class UpdateRoleDto {
      @IsString()
      @IsOptional()
       name?: string;
    
      @IsString()
      @IsOptional()
      description?: string;
}
  
  
export class DeleteRoleDto {
    @IsString()
     idRole: number;
  
    @IsString()
     idTeam: number;
}

export class CreateTeamDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsNumber()
    createdByUserId: number;
  
    creationDate: Date;
  }
  
  export class UpdateTeamDto {
  
    @IsNumber()
     idUser: number;
  
    @IsNumber()
     idTeam: number;
  
    @IsString()
     name: string;
  
    @IsOptional()
    @IsString()
     description?: string;
  }
  
  export class DeleteTeamDto {
    @IsNumber()
     idTeam: number;
  
    @IsNumber()
     idUser: number;
  }

  export class DeleteMemberDto{
    @IsNumber()
     idTeam: number;
  
    @IsNumber()
     idUserProperity: number;
  
    @IsNumber()
     idUser: number;
  }