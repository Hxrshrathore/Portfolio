import { config } from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';

// Load environment variables from .env.local
config({ path: '.env.local' });

/**
 * Custom database push script
 * Usage: npx tsx scripts/db-push.ts [DATABASE_URL]
 */
async function main() {
  const argUrl = process.argv[2];
  let databaseUrl = argUrl || process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL is not set in .env.local or passed as an argument.');
    console.log('Usage: npm run db:push <target_database_url>');
    process.exit(1);
  }

  // "via split and all" logic:
  // We parse the URL to show the user exactly where they are pushing to.
  // This also allows for any custom manipulation if needed in the future.
  try {
    const url = new URL(databaseUrl);
    const host = url.host;
    const database = url.pathname.slice(1);
    
    console.log('-------------------------------------------');
    console.log('🚀 DATABASE SCHEMA PUSH');
    console.log('-------------------------------------------');
    console.log(`📍 Host:     ${host}`);
    console.log(`🗄️ Database: ${database}`);
    console.log(`🔗 Protocol: ${url.protocol}`);
    
    // Ensure sslmode=require if it's a neon/postgres database missing it
    if (url.protocol === 'postgres:' || url.protocol === 'postgresql:') {
      if (!url.searchParams.has('sslmode')) {
        url.searchParams.set('sslmode', 'require');
        databaseUrl = url.toString();
        console.log('💡 Added sslmode=require for secure connection.');
      }
    }

    console.log('\n⏳ Running drizzle-kit push...');
    
    // Pass the target database URL to drizzle-kit via environment variable
    // This overrides the one in drizzle.config.ts if it uses process.env.DATABASE_URL
    execSync('npx drizzle-kit push', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl
      }
    });

    console.log('\n✅ Database schema push completed successfully!');
  } catch (error) {
    console.error('\n❌ Failed to push schema:');
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
