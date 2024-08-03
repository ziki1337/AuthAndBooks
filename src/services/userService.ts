import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

interface UserRegistrationData {
  username: string;
  password: string;
  email: string;
}

interface UserLoginData {
  username: string;
  password: string;
}

export const registerUser = async ({ username, password, email }: UserRegistrationData) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });
  // Здесь вы можете отправить письмо с подтверждением
  return user;
};

export const loginUser = async ({ username, password }: UserLoginData) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  return user;
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const changeUserRole = async (id: number, role: number) => {
  return await prisma.user.update({
    where: { id },
    data: { role },
  });
};