import { getConn } from "$lib/db";
import type { IAttachment, IAuthor, IBoard, iCard, IComment, ISwimlane, ITeam } from "./documents";
import { attachmentSchema, authorSchema, boardSchema, cardSchema, commentSchema, swimlaneSchema, teamSchema } from "./schemas";

export const conn = getConn()

conn.model<IAuthor>('Author', authorSchema);
conn.model<ITeam>('Team', teamSchema);
conn.model<IAttachment>('Attachment', attachmentSchema)
conn.model<IComment>('Comment', commentSchema);
conn.model<iCard>('Card', cardSchema);
conn.model<ISwimlane>('Swimlane', swimlaneSchema);
conn.model<IBoard>('Board', boardSchema);
