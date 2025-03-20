const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

// Core dependencies to update first
const coreDeps = [
    'next@latest',
    'react@latest',
    'react-dom@latest',
    'typescript@latest',
    '@types/react@latest',
    '@types/react-dom@latest',
    '@types/node@latest',
    'eslint@latest',
    'eslint-config-next@latest'
];

// UI and form dependencies
const uiDeps = [
    'lucide-react@latest',  // Moving lucide-react to UI deps
    '@radix-ui/react-dialog@latest',
    '@radix-ui/react-dropdown-menu@latest',
    '@radix-ui/react-label@latest',
    '@radix-ui/react-slot@latest',
    '@radix-ui/react-toast@latest',
    'class-variance-authority@latest',
    'clsx@latest',
    'tailwind-merge@latest',
    'tailwindcss-animate@latest',
    'react-hook-form@latest',
    '@hookform/resolvers@latest',
    'zod@latest'
];

// Auth and database dependencies
const authDeps = [
    'next-auth@latest',
    '@auth/prisma-adapter@latest',
    '@prisma/client@latest',
    'prisma@latest'
];

// Payment and email dependencies
const serviceDeps = [
    'stripe@latest',
    '@stripe/stripe-js@latest',
    'resend@latest'
];

// Utility dependencies
const utilDeps = [
    'bcryptjs@latest',
    'qrcode@latest',
    'speakeasy@latest'
];

// Dev dependencies
const devDeps = [
    'autoprefixer@latest',
    'postcss@latest',
    'tailwindcss@latest',
    '@types/bcryptjs@latest',
    '@types/qrcode@latest',
    '@types/speakeasy@latest'
];

async function installDependency(dep, options = {}) {
    const { force = false, legacy = false } = options;
    try {
        let command = `npm install ${dep}`;
        if (force) command += ' --force';
        if (legacy) command += ' --legacy-peer-deps';
        console.log(`Installing ${dep}...`);
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Failed to install ${dep}:`, error.message);
        return false;
    }
}

async function updateDependencies() {
    console.log('Starting dependency updates...');

    // First, clean install with legacy peer deps
    console.log('\nCleaning and performing initial install...');
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

    // Update core dependencies with legacy peer deps
    console.log('\nUpdating core dependencies...');
    for (const dep of coreDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Update UI dependencies with legacy peer deps
    console.log('\nUpdating UI dependencies...');
    for (const dep of uiDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Update auth dependencies
    console.log('\nUpdating auth dependencies...');
    for (const dep of authDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Update service dependencies
    console.log('\nUpdating service dependencies...');
    for (const dep of serviceDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Update utility dependencies
    console.log('\nUpdating utility dependencies...');
    for (const dep of utilDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Update dev dependencies
    console.log('\nUpdating dev dependencies...');
    for (const dep of devDeps) {
        await installDependency(dep, { legacy: true });
    }

    // Final clean install without legacy peer deps
    console.log('\nPerforming final clean install...');
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
    execSync('npm install', { stdio: 'inherit' });

    console.log('\nDependency updates completed!');
}

updateDependencies().catch(console.error); 