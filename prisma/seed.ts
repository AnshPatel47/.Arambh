import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log(" Starting database seeding...");

  const adminEmail = "admin@arambh.com";
  const rawPassword = "AdminPassword123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
    },
    create: {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(" Admin user seeded successfully!");
  console.log(`Email:    ${adminUser.email}`);
  console.log(`Password: ${rawPassword}`);
  console.log(`Role:     ${adminUser.role}`);

}

main()
  .catch((e) => {
    console.error(" Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });