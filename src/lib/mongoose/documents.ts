import type { Types } from "mongoose";

export interface IComment {
  id: string,
  text: string,
  attachments?: Types.DocumentArray<IAttachment>
}

export interface IAttachment {
  id: string,
  title: string,
  file: Buffer
}

export interface iCard {
  id: string,
  title: string
  description?: string
  tags?: Types.Array<string>
  comments?: Types.DocumentArray<IComment>
}

export interface ISwimlane {
  id: string,
  title: string,
  cards?: Types.DocumentArray<iCard>
}

export interface IBoard {
  id: string,
  title: string,
  swimlanes?: Types.DocumentArray<ISwimlane>
}

export interface IAuthor {
  id: string,
  first_name: string,
  last_name: string,
  cards: Types.DocumentArray<iCard>
  attachments: Types.DocumentArray<IAttachment>
  teams: Types.DocumentArray<ITeam>;
}

export interface ITeam {
  id: string,
  team_name: string,
  boards?: Types.DocumentArray<IBoard>
  authors?: Types.DocumentArray<IAuthor>
}
