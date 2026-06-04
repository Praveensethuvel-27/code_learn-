/**
 * Upsert 60 practice problems into MongoDB.
 * Run: node src/scripts/seed-practice-bank.js
 */
require("dotenv").config();
const { connectDb } = require("../config/db");
const { Problem } = require("../models/Problem");
const { PRACTICE_BANK } = require("./seed-practice-bank.data");

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing in .env");
  }

  await connectDb(process.env.MONGO_URI);

  let created = 0;
  let updated = 0;

  for (const doc of PRACTICE_BANK) {
    const existing = await Problem.findOne({ slug: doc.slug }).select("_id");
    await Problem.findOneAndUpdate({ slug: doc.slug }, { $set: doc }, { upsert: true });
    if (existing) updated += 1;
    else created += 1;
  }

  const total = await Problem.countDocuments({
    isPublished: true,
    problemType: "practice_problem",
  });

  console.log(`Practice bank seed done.`);
  console.log(`  Upserted: ${PRACTICE_BANK.length} problems (${created} new, ${updated} updated).`);
  console.log(`  Published practice problems in DB: ${total}`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
