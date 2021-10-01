import bcrypt from 'bcrypt';
import { HttpError } from '../../lib/http-error';
import { LoginResDto } from './dto/login-res.dto';
import { RegisterDto } from './dto/register.dto';
import { IUser, UserModel } from './user.model';

async function login(req, data: IUser): Promise<LoginResDto> {
    // fetch user
    const user = await UserModel.findOne({ email: data.email });

    // check user and the password
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new HttpError(400, 'Invalid email or password');
    }

    req.session.user = {
        id: user._id,
    };
    return {
        id: user._id,
    };
}

async function checkExists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({
        email,
    });

    return !!user;
}

async function register(data: RegisterDto): Promise<LoginResDto> {
    // make sure email is unique
    const existingAppUser = await checkExists(data.email);
    // throw error if user already exists
    if (existingAppUser) {
        throw new HttpError(400, 'Email already exists', 'EmailExists');
    }

    // encrypt password
    const encryptedPW = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
        email: data.email,
        password: encryptedPW,
    });

    return {
        id: user._id,
    };
}

export default {
    login,
    register,
};
