Client

Server

dotenv
PORT=XXXX

npm install prisma
npx prisma init
npm install @prisma/client

// Doc ใช้ในการสร้างและอัพเดตฐานข้อมูล
npx prisma migrate dev --name huydigital

// update Scheme
npx prisma db push   // no log
npx prisma migrate dev --create-only
npx prisma migrate dev --name ecom

อัพเดต Prisma schema
npx prisma migrate dev
