
/* CREATE and PRIMARY KEY */

CREATE TABLE "Author"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL
);

CREATE TABLE "Team"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL
);

CREATE TABLE "AuthorTeam"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "author" BIGINT NOT NULL,
    "team" BIGINT NOT NULL,
    FOREIGN KEY("author") REFERENCES "Author"("id"),
    FOREIGN KEY("team") REFERENCES "Team"("id")
);

CREATE TABLE "Board"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "team" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    FOREIGN KEY("team") REFERENCES "Team"("id")
);

CREATE TABLE "Swimlane"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "board" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    FOREIGN KEY("board") REFERENCES "Board"("id")
);

CREATE TABLE "Card"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "author" BIGINT NOT NULL,
    "swimlane" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,
    FOREIGN KEY("author") REFERENCES "Author"("id"),
    FOREIGN KEY("swimlane") REFERENCES "Swimlane"("id")
);

CREATE TABLE "Comment"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "author" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "text" TEXT NOT NULL,
    FOREIGN KEY("card") REFERENCES "Card"("id"),
    FOREIGN KEY("author") REFERENCES "Author"("id")
);

CREATE TABLE "Attachment"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "card" BIGINT NOT NULL,
    "comment" BIGINT NOT NULL,
    FOREIGN KEY("card") REFERENCES "Card"("id"),
    FOREIGN KEY("comment") REFERENCES "Comment"("id")
);








/* INSERT */

/* INSERT INTO team (name) VALUES ('my team');

INSERT INTO kanban_user (name, surname) VALUES ('sam', 'halfcorpse');

INSERT INTO kanban_user_team (id, kanban_user, team) VALUES (1, 1);

INSERT INTO board (id, team, title) VALUES (1, 1, 'My Kanban');

INSERT INTO swimlane (id, board, positioning, title) VALUES (1, 1, 1, 'my Lane'); 
    
INSERT INTO card (id,title,description,kanban_user,swimlane,positioning) VALUES (1, 'Card title', 'desc',1,1,1); */