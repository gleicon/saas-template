const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runTests() {
    console.log('Starting upgrade tests...');

    try {
        // 1. Clean install dependencies
        console.log('\n1. Cleaning and installing dependencies...');
        execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });

        // Install dependencies with legacy peer deps
        console.log('Installing dependencies...');
        execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

        // 2. Generate Prisma client
        console.log('\n2. Generating Prisma client...');
        execSync('npx prisma generate', { stdio: 'inherit' });

        // 3. Run type checking
        console.log('\n3. Running type checking...');
        execSync('npm run type-check', { stdio: 'inherit' });

        // 4. Run linting
        console.log('\n4. Running linting...');
        execSync('npm run lint', { stdio: 'inherit' });

        // 5. Run tests
        console.log('\n5. Running tests...');
        execSync('npm test', { stdio: 'inherit' });

        // 6. Build the application
        console.log('\n6. Building the application...');
        execSync('npm run build', { stdio: 'inherit' });

        // 7. Start the application in production mode
        console.log('\n7. Starting the application...');
        const server = execSync('npm run start', { stdio: 'inherit' });

        // 8. Run security checks
        console.log('\n8. Running security checks...');
        execSync('npm audit', { stdio: 'inherit' });

        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('\nTest failed:', error.message);
        if (error.stdout) console.error('stdout:', error.stdout.toString());
        if (error.stderr) console.error('stderr:', error.stderr.toString());
        process.exit(1);
    }
}

runTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 