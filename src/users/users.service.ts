import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '../../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(id: User['id']): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findMany({});
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // you could add logic here, e.g. hash password before saving
    return this.usersRepository.create(data);
  }

  async updateUser(
    id: User['id'],
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    await this.getUserById(id);
    return this.usersRepository.update({ where: { id }, data });
  }

  async deleteUser(id: User['id']): Promise<User> {
    await this.getUserById(id); // check exists first
    return this.usersRepository.delete({ id });
  }
}
