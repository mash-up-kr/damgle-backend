import { ReactionType, StorySchema } from '@damgle/models';
import { staticEnv } from '@damgle/utils';
import mongoose from 'mongoose';

(async () => {
  const mongoUrl = staticEnv.mongodb_url.replace('{{password}}', staticEnv.mongodb_password);
  const mongoDbName = staticEnv.mongodb_database;

  await mongoose.connect(mongoUrl, { dbName: mongoDbName });

  const StoryModel = mongoose.model('story', StorySchema);

  const stories = await StoryModel.find();
  for (const story of stories) {
    let reactionOrder: ReactionType[] = [];
    if (story.reactions.length !== 0) {
      const reactionSet = new Set<ReactionType>(story.reactions.map(reaction => reaction.type));
      reactionOrder = Array.from(reactionSet);
    }

    story.reactionOrder = reactionOrder;
    await story.save();
  }
  await mongoose.disconnect();
})();
