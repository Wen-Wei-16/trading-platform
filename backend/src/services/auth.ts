import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { generateToken, generateTwoFactorToken } from '../utils/jwt';
import { logger } from '../utils/logger';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string, name?: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('該郵箱已被註冊');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name
    });

    await this.userRepository.save(user);
    logger.info(`新用戶註冊: ${email}`);
    return user;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('密碼錯誤');
    }

    const token = generateToken(user);
    logger.info(`用戶登入: ${email}`);
    return { user, token };
  }

  async enableTwoFactor(userId: string): Promise<{ secret: string; token: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    // 生成隨機密鑰
    const secret = Math.random().toString(36).substring(2, 15);
    user.twoFactorSecret = secret;
    user.isTwoFactorEnabled = true;

    await this.userRepository.save(user);
    const token = generateTwoFactorToken(secret);

    logger.info(`用戶啟用雙因子認證: ${user.email}`);
    return { secret, token };
  }

  async disableTwoFactor(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    user.twoFactorSecret = null;
    user.isTwoFactorEnabled = false;

    await this.userRepository.save(user);
    logger.info(`用戶禁用雙因子認證: ${user.email}`);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('用戶不存在');
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new Error('原密碼錯誤');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    logger.info(`用戶修改密碼: ${user.email}`);
  }
} 