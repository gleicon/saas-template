#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

const TEMPLATE_DIR = path.join(__dirname);
const IGNORED_FILES = [
    'node_modules',
    '.git',
    '.next',
    'setup.js',
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.env.local',
    '.env.example',
];

const PAYMENT_PROVIDERS = {
    stripe: {
        name: 'Stripe',
        description: 'Global payment processing (US, EU, and many other countries)',
        envVars: [
            'STRIPE_SECRET_KEY',
            'STRIPE_WEBHOOK_SECRET',
            'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
        ]
    },
    razorpay: {
        name: 'Razorpay',
        description: 'Popular in India and Southeast Asia',
        envVars: [
            'RAZORPAY_KEY_ID',
            'RAZORPAY_KEY_SECRET',
            'RAZORPAY_WEBHOOK_SECRET'
        ]
    },
    paypal: {
        name: 'PayPal',
        description: 'Global payment processing with PayPal',
        envVars: [
            'PAYPAL_CLIENT_ID',
            'PAYPAL_CLIENT_SECRET',
            'PAYPAL_WEBHOOK_ID'
        ]
    }
};

const INTEGRATIONS = {
    email: {
        name: 'Email Service',
        description: 'Send emails (verification, notifications, etc.)',
        providers: {
            resend: {
                name: 'Resend',
                description: 'Modern email API with great deliverability',
                envVars: ['RESEND_API_KEY']
            },
            sendgrid: {
                name: 'SendGrid',
                description: 'Popular email service with extensive features',
                envVars: ['SENDGRID_API_KEY']
            },
            smtp: {
                name: 'SMTP',
                description: 'Use your own SMTP server',
                envVars: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD']
            }
        }
    },
    storage: {
        name: 'File Storage',
        description: 'Store files and media',
        providers: {
            s3: {
                name: 'AWS S3',
                description: 'Amazon S3 for file storage',
                envVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_BUCKET_NAME']
            },
            cloudinary: {
                name: 'Cloudinary',
                description: 'Cloud-based image and video management',
                envVars: ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
            }
        }
    },
    analytics: {
        name: 'Analytics',
        description: 'Track user behavior and metrics',
        providers: {
            google: {
                name: 'Google Analytics',
                description: 'Google Analytics 4 integration',
                envVars: ['NEXT_PUBLIC_GA_MEASUREMENT_ID']
            },
            plausible: {
                name: 'Plausible Analytics',
                description: 'Privacy-focused analytics',
                envVars: ['NEXT_PUBLIC_PLAUSIBLE_DOMAIN']
            }
        }
    }
};

async function setup() {
    try {
        // Get project details from user
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your project name?',
                default: 'my-saas-app',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Project description:',
                default: 'A modern SaaS application built with Next.js',
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author name:',
                default: 'Your Name',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Author email:',
                default: 'your.email@example.com',
            },
            {
                type: 'input',
                name: 'domain',
                message: 'Your domain (e.g., app.example.com):',
                default: 'localhost:3000',
            },
            {
                type: 'list',
                name: 'paymentProvider',
                message: 'Select payment provider:',
                choices: Object.entries(PAYMENT_PROVIDERS).map(([key, provider]) => ({
                    name: `${provider.name} - ${provider.description}`,
                    value: key
                })),
                default: 'stripe'
            },
            {
                type: 'checkbox',
                name: 'integrations',
                message: 'Select integrations to enable:',
                choices: Object.entries(INTEGRATIONS).map(([key, integration]) => ({
                    name: `${integration.name} - ${integration.description}`,
                    value: key
                }))
            }
        ]);

        const { projectName, description, author, email, domain, paymentProvider, integrations } = answers;

        // Get provider-specific details
        const providerAnswers = await getProviderDetails(answers);

        // Create new project directory
        const projectDir = path.join(process.cwd(), projectName);
        if (fs.existsSync(projectDir)) {
            console.error(`Directory ${projectName} already exists`);
            process.exit(1);
        }
        fs.mkdirSync(projectDir);

        // Copy template files
        copyTemplateFiles(TEMPLATE_DIR, projectDir);

        // Update package.json
        updatePackageJson(projectDir, {
            name: projectName,
            description,
            author: `${author} <${email}>`,
            paymentProvider,
            integrations
        });

        // Update environment variables
        updateEnvFile(projectDir, domain, paymentProvider, integrations, providerAnswers);

        // Update metadata in layout.tsx
        updateLayoutFile(projectDir, projectName, description);

        // Install dependencies
        console.log('\nInstalling dependencies...');
        installDependencies(projectDir, paymentProvider, integrations);

        // Initialize git repository
        console.log('\nInitializing git repository...');
        execSync('git init', { cwd: projectDir, stdio: 'inherit' });

        // Create initial commit
        execSync('git add .', { cwd: projectDir, stdio: 'inherit' });
        execSync('git commit -m "Initial commit"', { cwd: projectDir, stdio: 'inherit' });

        console.log('\n✨ Project setup complete!');
        console.log('\nNext steps:');
        console.log(`1. cd ${projectName}`);
        console.log('2. cp .env.example .env.local');
        console.log('3. Update your environment variables in .env.local');
        console.log('4. npm run dev');
    } catch (error) {
        console.error('Error setting up project:', error);
        process.exit(1);
    }
}

async function getProviderDetails(answers) {
    const { paymentProvider, integrations } = answers;
    const providerAnswers = {};

    // Get payment provider details
    if (paymentProvider) {
        const provider = PAYMENT_PROVIDERS[paymentProvider];
        const paymentAnswers = await inquirer.prompt(
            provider.envVars.map(varName => ({
                type: 'input',
                name: varName,
                message: `Enter your ${provider.name} ${varName}:`,
                default: `your_${varName.toLowerCase()}`
            }))
        );
        Object.assign(providerAnswers, paymentAnswers);
    }

    // Get integration provider details
    if (integrations && integrations.length > 0) {
        for (const integration of integrations) {
            const integrationConfig = INTEGRATIONS[integration];
            const providerChoices = Object.entries(integrationConfig.providers).map(([key, provider]) => ({
                name: `${provider.name} - ${provider.description}`,
                value: key
            }));

            const { provider } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'provider',
                    message: `Select ${integrationConfig.name} provider:`,
                    choices: providerChoices
                }
            ]);

            const selectedProvider = integrationConfig.providers[provider];
            const providerAnswers = await inquirer.prompt(
                selectedProvider.envVars.map(varName => ({
                    type: 'input',
                    name: varName,
                    message: `Enter your ${selectedProvider.name} ${varName}:`,
                    default: `your_${varName.toLowerCase()}`
                }))
            );

            Object.assign(providerAnswers, providerAnswers);
        }
    }

    return providerAnswers;
}

function installDependencies(projectDir, paymentProvider, integrations) {
    const dependencies = [];
    const devDependencies = [];

    // Add payment provider dependencies
    switch (paymentProvider) {
        case 'stripe':
            dependencies.push('stripe', '@stripe/stripe-js');
            break;
        case 'razorpay':
            dependencies.push('razorpay');
            break;
        case 'paypal':
            dependencies.push('@paypal/react-paypal-js');
            break;
    }

    // Add integration dependencies
    if (integrations) {
        integrations.forEach(integration => {
            const integrationConfig = INTEGRATIONS[integration];
            switch (integration) {
                case 'email':
                    if (integrationConfig.providers.resend) {
                        dependencies.push('resend');
                    } else if (integrationConfig.providers.sendgrid) {
                        dependencies.push('@sendgrid/mail');
                    }
                    break;
                case 'storage':
                    if (integrationConfig.providers.s3) {
                        dependencies.push('@aws-sdk/client-s3');
                    } else if (integrationConfig.providers.cloudinary) {
                        dependencies.push('cloudinary');
                    }
                    break;
                case 'analytics':
                    if (integrationConfig.providers.google) {
                        dependencies.push('@next/third-parties');
                    }
                    break;
            }
        });
    }

    // Install dependencies
    if (dependencies.length > 0) {
        execSync(`npm install ${dependencies.join(' ')}`, { cwd: projectDir, stdio: 'inherit' });
    }
    if (devDependencies.length > 0) {
        execSync(`npm install -D ${devDependencies.join(' ')}`, { cwd: projectDir, stdio: 'inherit' });
    }
}

function updateEnvFile(projectDir, domain, paymentProvider, integrations, providerAnswers) {
    const envExamplePath = path.join(projectDir, '.env.example');
    let envContent = fs.readFileSync(envExamplePath, 'utf8');

    // Update NEXTAUTH_URL
    envContent = envContent.replace(
        /NEXTAUTH_URL=.*/,
        `NEXTAUTH_URL=http://${domain}`
    );

    // Update payment provider variables
    if (paymentProvider) {
        const provider = PAYMENT_PROVIDERS[paymentProvider];
        provider.envVars.forEach(varName => {
            envContent = envContent.replace(
                new RegExp(`${varName}=.*`),
                `${varName}=${providerAnswers[varName]}`
            );
        });
    }

    // Update integration variables
    if (integrations) {
        integrations.forEach(integration => {
            const integrationConfig = INTEGRATIONS[integration];
            Object.entries(integrationConfig.providers).forEach(([key, provider]) => {
                provider.envVars.forEach(varName => {
                    if (providerAnswers[varName]) {
                        envContent = envContent.replace(
                            new RegExp(`${varName}=.*`),
                            `${varName}=${providerAnswers[varName]}`
                        );
                    }
                });
            });
        });
    }

    fs.writeFileSync(envExamplePath, envContent);
}

function copyTemplateFiles(src, dest) {
    const files = fs.readdirSync(src);

    files.forEach(file => {
        if (IGNORED_FILES.includes(file)) return;

        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath);
            copyTemplateFiles(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

function updatePackageJson(projectDir, { name, description, author, paymentProvider, integrations }) {
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = name;
    packageJson.description = description;
    packageJson.author = author;
    packageJson.paymentProvider = paymentProvider;
    packageJson.integrations = integrations;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function updateLayoutFile(projectDir, projectName, description) {
    const layoutPath = path.join(projectDir, 'src/app/layout.tsx');
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');

    // Update metadata
    layoutContent = layoutContent.replace(
        /title: 'SaaS Template'/,
        `title: '${projectName}'`
    );
    layoutContent = layoutContent.replace(
        /description: 'A modern SaaS template'/,
        `description: '${description}'`
    );

    fs.writeFileSync(layoutPath, layoutContent);
}

setup(); 