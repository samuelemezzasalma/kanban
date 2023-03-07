CREATE TABLE "Author"(
    "author_id" BIGSERIAL PRIMARY KEY NOT NULL,
    data jsonb
);

CREATE TABLE "Team"(
    "team_id" BIGSERIAL PRIMARY KEY NOT NULL,
     data jsonb
);

CREATE TABLE "AuthorTeam"(
    -- "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "author" BIGINT NOT NULL,
    "team" BIGINT NOT NULL,
    FOREIGN KEY("author") REFERENCES "Author"("author_id"),
    FOREIGN KEY("team") REFERENCES "Team"("team_id"),
    PRIMARY KEY ("author", "team")
);

CREATE TABLE "Board"(
    "board_id" BIGSERIAL PRIMARY KEY NOT NULL,
    "team" BIGINT NOT NULL,
    data jsonb
    FOREIGN KEY("team") REFERENCES "Team"("team_id")
);

CREATE TABLE "Swimlane"(
    "swimlane_id" BIGSERIAL PRIMARY KEY NOT NULL,
    "board" BIGINT NOT NULL,
    data jsonb
    FOREIGN KEY("board") REFERENCES "Board"("board_id")
);

CREATE TABLE "Card"(
    "card_id" BIGSERIAL PRIMARY KEY NOT NULL,
    data jsonb
    "author" BIGINT NOT NULL,
    "swimlane" BIGINT NOT NULL,
    FOREIGN KEY("author") REFERENCES "Author"("author_id"),
    FOREIGN KEY("swimlane") REFERENCES "Swimlane"("swimlane_id")
);

CREATE TABLE "Comment"(
    "comment_id" BIGSERIAL PRIMARY KEY NOT NULL,
    "author" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    data jsonb
    FOREIGN KEY("card") REFERENCES "Card"("card_id"),
    FOREIGN KEY("author") REFERENCES "Author"("author_id")
);

CREATE TABLE "Attachment"(
    "attachment_id" BIGSERIAL PRIMARY KEY NOT NULL,
    data jsonb
    "card" BIGINT NOT NULL,
    "comment" BIGINT NOT NULL,
    FOREIGN KEY("card") REFERENCES "Card"("card_id"),
    FOREIGN KEY("comment") REFERENCES "Comment"("comment_id")
);

/* INSERT */

/* INSERT INTO "Team"  (team_name) VALUES ('my team');

INSERT INTO	"Author" (first_name, last_name) VALUES ('sam', 'halfcorpse');

INSERT INTO "AuthorTeam"  (author, team) VALUES (1, 1);

INSERT INTO "Board"  (team, title) VALUES (1, 'My Kanban');

INSERT INTO "Swimlane"  (board, positioning, title) VALUES (1, 0, 'my Lane');

INSERT INTO "Card"  (title, card_description, author, swimlane, positioning) VALUES ('Card title', 'desc', 1, 1, 0); */