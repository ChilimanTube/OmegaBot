import dynamic from 'next/dynamic';
import Head from 'next/head';

const ParallaxComponent = dynamic(() => import('../../components/parallaxComponent'), { ssr: false });

const ParallaxPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Parallax Page</title>
            </Head>
            <ParallaxComponent />
        </div>
    );
};

export default ParallaxPage;