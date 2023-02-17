import { HttpException } from '@core/exceptions';
import { IPagination } from '@core/interfaces';
import IUser from './users.interface';
import UserSchema from './users.model';


class UserService {
    public userSchema = UserSchema;

    public async getUserById(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(404, `User is not exists`);
        }
        return user;
    }

    public async getAll(): Promise<IUser[]> {
        const users = await this.userSchema.find().exec();
        return users;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagination<IUser>> {
        const pageSize = Number(process.env.PAGE_SIZE || 10);

        let query = {};
        if (keyword) {
            query = {
                $or: [{ email: keyword }, { first_name: keyword }, { last_name: keyword }],
            };
        }

        const users = await this.userSchema
            .find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.userSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page: page,
            pageSize: pageSize,
            items: users,
        } as IPagination<IUser>;
    }

    public async deleteUser(userId: string): Promise<IUser> {
        const deletedUser = await this.userSchema.findByIdAndDelete(userId).exec();
        if (!deletedUser) throw new HttpException(409, 'Your id is invalid');
        return deletedUser;
    }

    public async deleteUsers(userIds: string[]): Promise<number | undefined> {
        const result = await this.userSchema.deleteMany({ _id: [...userIds] }).exec();
        if (!result.acknowledged) throw new HttpException(409, 'Your id is invalid');
        return result.deletedCount;
    }

}
export default UserService;