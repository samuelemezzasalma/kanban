CREATE TABLE "Board"(
    "id" BIGINT NOT NULL,
    "team" BIGINT NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "Board" ADD PRIMARY KEY("id");
CREATE TABLE "Attachment"(
    "id" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "comment" BIGINT NOT NULL
);
ALTER TABLE
    "Attachment" ADD PRIMARY KEY("id");
CREATE TABLE "Team"(
    "id" BIGINT NOT NULL,
    "team_name" TEXT NOT NULL
);
ALTER TABLE
    "Team" ADD PRIMARY KEY("id");
CREATE TABLE "AuthorTeam"(
    "author" BIGINT NOT NULL,
    "team" BIGINT NOT NULL
);
ALTER TABLE
    "AuthorTeam" ADD PRIMARY KEY("author");
ALTER TABLE
    "AuthorTeam" ADD PRIMARY KEY("team");
CREATE TABLE "Swimlane"(
    "id" BIGINT NOT NULL,
    "board" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "Swimlane" ADD PRIMARY KEY("id");
CREATE TABLE "Author"(
    "id" BIGINT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);
ALTER TABLE
    "Author" ADD PRIMARY KEY("id");
CREATE TABLE "Card"(
    "id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "card_description" TEXT NULL,
    "author" BIGINT NOT NULL,
    "swimlane" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL
);
ALTER TABLE
    "Card" ADD PRIMARY KEY("id");
CREATE TABLE "Comment"(
    "id" BIGINT NOT NULL,
    "author" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "text" TEXT NOT NULL
);
ALTER TABLE
    "Comment" ADD PRIMARY KEY("id");
ALTER TABLE
    "Board" ADD CONSTRAINT "board_team_foreign" FOREIGN KEY("team") REFERENCES "Team"("id");
ALTER TABLE
    "Swimlane" ADD CONSTRAINT "swimlane_board_foreign" FOREIGN KEY("board") REFERENCES "Board"("id");
ALTER TABLE
    "Card" ADD CONSTRAINT "card_author_foreign" FOREIGN KEY("author") REFERENCES "Author"("id");
ALTER TABLE
    "Comment" ADD CONSTRAINT "comment_card_foreign" FOREIGN KEY("card") REFERENCES "Card"("id");
ALTER TABLE
    "Card" ADD CONSTRAINT "card_swimlane_foreign" FOREIGN KEY("swimlane") REFERENCES "Swimlane"("id");
ALTER TABLE
    "AuthorTeam" ADD CONSTRAINT "authorteam_author_foreign" FOREIGN KEY("author") REFERENCES "Author"("id");
ALTER TABLE
    "Comment" ADD CONSTRAINT "comment_author_foreign" FOREIGN KEY("author") REFERENCES "Author"("id");
ALTER TABLE
    "Attachment" ADD CONSTRAINT "attachment_comment_foreign" FOREIGN KEY("comment") REFERENCES "Comment"("id");
ALTER TABLE
    "Attachment" ADD CONSTRAINT "attachment_card_foreign" FOREIGN KEY("card") REFERENCES "Card"("id");
ALTER TABLE
    "AuthorTeam" ADD CONSTRAINT "authorteam_team_foreign" FOREIGN KEY("team") REFERENCES "Team"("id");