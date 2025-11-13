Client

npm i react-router-dom

Server

npm install express nodemon cors morgan dotenv jsonwebtoken bcryptjs

dotenv
PORT=XXXX
JWT_SECRET=XXXX
DATABASE_URL=XXXX

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
