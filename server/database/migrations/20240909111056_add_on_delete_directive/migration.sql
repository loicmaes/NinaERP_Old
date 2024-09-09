-- DropForeignKey
ALTER TABLE "authSessions" DROP CONSTRAINT "authSessions_userUid_fkey";

-- DropForeignKey
ALTER TABLE "userInfo" DROP CONSTRAINT "userInfo_userUid_fkey";

-- AddForeignKey
ALTER TABLE "userInfo" ADD CONSTRAINT "userInfo_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
