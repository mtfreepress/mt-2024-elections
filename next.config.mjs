const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    assetPrefix: isProd ? 'https://apps.montanafreepress.org/draft-election-guide-2024' : undefined,
    basePath: '/draft-election-guide-2024',
    trailingSlash: true,
    compiler: {
        emotion: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apps.montanafreepress.org',
                port: '',
                pathname: '/maps/legislative-districts/**',
            }
        ]
    },
    // rewrites() {
    //     return [
    //         {
    //             source: '/hd-lookup',
    //             destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/62/query',
    //         },
    //         {
    //             source: '/congressional-lookup',
    //             destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/34/query'
    //         }
    //     ];
    // }
};

export default nextConfig;
