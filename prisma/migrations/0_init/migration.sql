-- CreateTable
CREATE TABLE "Attachment" (
    "id" BIGSERIAL NOT NULL,
    "card" BIGINT NOT NULL,
    "comment" BIGINT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorTeam" (
    "id" BIGSERIAL NOT NULL,
    "author" BIGINT NOT NULL,
    "team" BIGINT NOT NULL,

    CONSTRAINT "AuthorTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" BIGSERIAL NOT NULL,
    "team" BIGINT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" BIGINT NOT NULL,
    "swimlane" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" BIGSERIAL NOT NULL,
    "author" BIGINT NOT NULL,
    "card" BIGINT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swimlane" (
    "id" BIGSERIAL NOT NULL,
    "board" BIGINT NOT NULL,
    "positioning" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Swimlane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_card_fkey" FOREIGN KEY ("card") REFERENCES "Card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_comment_fkey" FOREIGN KEY ("comment") REFERENCES "Comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AuthorTeam" ADD CONSTRAINT "AuthorTeam_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AuthorTeam" ADD CONSTRAINT "AuthorTeam_team_fkey" FOREIGN KEY ("team") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_team_fkey" FOREIGN KEY ("team") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_swimlane_fkey" FOREIGN KEY ("swimlane") REFERENCES "Swimlane"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_fkey" FOREIGN KEY ("author") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_card_fkey" FOREIGN KEY ("card") REFERENCES "Card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Swimlane" ADD CONSTRAINT "Swimlane_board_fkey" FOREIGN KEY ("board") REFERENCES "Board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

