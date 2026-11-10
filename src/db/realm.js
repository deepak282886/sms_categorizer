import Realm from 'realm';
import { MessageSchema, CategorySchema } from './schemas';

export const getRealm = async () => {
  return await Realm.open({
    schema: [MessageSchema, CategorySchema],
    schemaVersion: 1
  });
};