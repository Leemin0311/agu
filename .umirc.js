// ref: https://umijs.org/config/
import path from 'path';

export default {
    treeShaking: true,
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
                dynamicImport: { webpackChunkName: true },
                title: 'agu',
                dll: true,
                locale: {
                    enable: true,
                    default: 'en-US',
                },
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
            },
        ],
    ],
    alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@assets': path.resolve(__dirname, 'src/assets'),
    },
};
