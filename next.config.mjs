/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        emotion: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apps.montanafreepress.org',
                port: '',
                pathname: '/maps/legislative-districts/**',
            }
        ]
    },
    rewrites() {
        return [
            {
                source: '/hd-lookup',
                destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/62/query',
            },
            {
                source: '/congressional-lookup',
                destination: 'https://gisservicemt.gov/arcgis/rest/services/MSDI_Framework/Boundaries/MapServer/34/query'
            }
        ];
    }
};

export default nextConfig;
