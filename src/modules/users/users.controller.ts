import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {Like} from 'typeorm';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {PaginationPipe} from '../../pipes/pagination.pipe';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('users')
@UseInterceptors(TransformResponseInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiImplicitQuery({ name: 'page', required: false})
  @ApiImplicitQuery({ name: 'search', required: false})
  @ApiImplicitQuery({ name: 'sortBy', required: false})
  @ApiImplicitQuery({ name: 'sortValue', required: false})
  async findAll(
    @Query('page', PaginationPipe) pagination,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortValue') sortValue: string,
  ): Promise<{ rows: UserDto[], count: number, limit: number, currentPage: number }> {
    let query: any = {};

    let sortObj: any = {
      id: 'ASC',
    };

    if (sortBy && sortValue) {
      sortObj = {};
      sortObj[sortBy] = sortValue;
    }

    if (search) {
      query = [
        {email: Like(`%${search}%`)},
      ];
    }

    const [rows, count] = await this.usersService.listAllUsers(query, pagination.offset, pagination.limit, sortObj);
    return {
      rows: rows.map((user) => new UserDto(user)),
      count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const foundUser = await this.usersService.findUser(id);
    return new UserDto(foundUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.usersService.removeUser(id);
  }
}
