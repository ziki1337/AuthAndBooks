import { User } from '@prisma/client'; //Возникали ошибки из-за ненайденной модели User, решил инициализировать её отдельно (ошибка была в том, что я не перегенерировал клиент призмы :))))00)))0) )

interface CustomRequest extends Request {
  user?: User;
}