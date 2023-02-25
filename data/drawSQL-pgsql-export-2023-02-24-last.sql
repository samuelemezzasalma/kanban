CREATE TABLE "card"(
    "id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "author" BIGINT NOT NULL,
    "swimlane" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL
);
ALTER TABLE
    "card" ADD PRIMARY KEY("id");
CREATE TABLE "attachment"(
    "id" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "comment" BIGINT NOT NULL
);
ALTER TABLE
    "attachment" ADD PRIMARY KEY("id");
CREATE TABLE "comment"(
    "id" BIGINT NOT NULL,
    "author" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "text" TEXT NOT NULL
);
ALTER TABLE
    "comment" ADD PRIMARY KEY("id");
CREATE TABLE "author"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);
ALTER TABLE
    "author" ADD PRIMARY KEY("id");
CREATE TABLE "swimlane"(
    "id" BIGINT NOT NULL,
    "board" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "swimlane" ADD PRIMARY KEY("id");
CREATE TABLE "board"(
    "id" BIGINT NOT NULL,
    "team" BIGINT NOT NULL,
    "title" TEXT NOT NULL
);
ALTER TABLE
    "board" ADD PRIMARY KEY("id");
CREATE TABLE "team"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "team" ADD PRIMARY KEY("id");
CREATE TABLE "author_team"(
    "id" BIGINT NOT NULL,
    "author" BIGINT NOT NULL,
    "team" BIGINT NOT NULL
);
ALTER TABLE
    "author_team" ADD PRIMARY KEY("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_card_foreign" FOREIGN KEY("card") REFERENCES "card"("id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_card_foreign" FOREIGN KEY("card") REFERENCES "card"("id");
ALTER TABLE
    "card" ADD CONSTRAINT "card_author_foreign" FOREIGN KEY("author") REFERENCES "author"("id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_comment_foreign" FOREIGN KEY("comment") REFERENCES "comment"("id");
ALTER TABLE
    "author_team" ADD CONSTRAINT "author_team_author_foreign" FOREIGN KEY("author") REFERENCES "author"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_author_foreign" FOREIGN KEY("author") REFERENCES "author"("id");
ALTER TABLE
    "card" ADD CONSTRAINT "card_swimlane_foreign" FOREIGN KEY("swimlane") REFERENCES "swimlane"("id");
ALTER TABLE
    "swimlane" ADD CONSTRAINT "swimlane_board_foreign" FOREIGN KEY("board") REFERENCES "board"("id");
ALTER TABLE
    "author_team" ADD CONSTRAINT "author_team_team_foreign" FOREIGN KEY("team") REFERENCES "team"("id");
ALTER TABLE
    "board" ADD CONSTRAINT "board_team_foreign" FOREIGN KEY("team") REFERENCES "team"("id");