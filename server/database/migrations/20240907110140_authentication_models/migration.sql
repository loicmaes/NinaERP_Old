-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "userInfo" (
    "id" SERIAL NOT NULL,
    "userUid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authSessions" (
    "authToken" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authSessions_pkey" PRIMARY KEY ("authToken","userUid")
);

-- CreateIndex
CREATE UNIQUE INDEX "userInfo_userUid_key" ON "userInfo"("userUid");

-- AddForeignKey
ALTER TABLE "userInfo" ADD CONSTRAINT "userInfo_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authSessions" ADD CONSTRAINT "authSessions_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
