import { StorySchema } from '@damgle/models';
import { staticEnv } from '@damgle/utils';
import mongoose from 'mongoose';

(async () => {
  const mongoUrl = staticEnv.mongodb_url.replace('{{password}}', staticEnv.mongodb_password);
  const mongoDbName = staticEnv.mongodb_database;

  await mongoose.connect(mongoUrl, { dbName: mongoDbName });

  const StoryModel = mongoose.model('story', StorySchema);
  await StoryModel.updateMany({}, { $set: { address1: '', address2: '' } }).exec();

  await mongoose.disconnect();
})();
