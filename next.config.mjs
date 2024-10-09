const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    // TODO - Change this before it goes live
    assetPrefix: isProd ? ' http://projects.montanafreepress.org.s3-website-us-west-2.amazonaws.com/election-guide-2024' : undefined,
    // assetPrefix: isProd ? 'https://apps.montanafreepress.org/election-guide-2024' : undefined,
    // assetPrefix: isProd ? 'https://projects.montanafreepress.org/election-guide-2024' : undefined,
    basePath: '/election-guide-2024',
    trailingSlash: true,
    compiler: {
        emotion: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                // TODO - Change this before it goes live
                hostname: 'http://projects.montanafreepress.org.s3-website-us-west-2.amazonaws.com/',
                // hostname: 'apps.montanafreepress.org',
                // hostname: 'projects.montanafreepress.org',
                port: '',
                pathname: '/maps/legislative-districts/**',
            }
        ]
    },
};

export default nextConfig;
