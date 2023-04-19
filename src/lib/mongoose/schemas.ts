import mongoose from 'mongoose';
import type { IAttachment, IAuthor, IBoard, iCard, IComment, ISwimlane, ITeam } from './documents';
const { Schema } = mongoose;

export const attachmentSchema = new mongoose.Schema<IAttachment>({
  title: String, // String is shorthand for {type: String}
  file: Buffer
});

attachmentSchema.set('toJSON', toJSON());

export const commentSchema = new mongoose.Schema<IComment>({
  text: String, // String is shorthand for {type: String}
  attachments: {
    type: [attachmentSchema],
    default: []
  },
});

commentSchema.set('toJSON', toJSON());

export const cardSchema = new mongoose.Schema<iCard>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  tags: { type: [String], required: false },
  comments: {
    type: [commentSchema],
    default: []
  }
});

cardSchema.set('toJSON', toJSON());

export const swimlaneSchema = new mongoose.Schema<ISwimlane>({
  title: { type: String, required: true },
  cards: {
    type: [cardSchema],
    default: []
  }
});

swimlaneSchema.set('toJSON', toJSON());

export const boardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  swimlanes: {
    type: [swimlaneSchema],
    default: []
  }
});

boardSchema.set('toJSON', toJSON());


export const authorSchema = new Schema<IAuthor>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  cards: {
    type: [cardSchema],
    default: []
  },
  attachments: {
    type: [attachmentSchema],
    default: []
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
});

authorSchema.set('toJSON', toJSON());

export const teamSchema = new Schema<ITeam>({
  team_name: String,
  boards: {
    type: [boardSchema],
    default: []
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    }
  ]
});

teamSchema.set('toJSON', toJSON());

function toJSON(): mongoose.ToObjectOptions | undefined {
  return {
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString()
      // ret.id = ret.id.toHexString();
      delete ret._id;
      delete ret.__v;
    }
  };
}

