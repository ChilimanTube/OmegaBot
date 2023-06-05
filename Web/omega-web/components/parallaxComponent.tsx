import { animated, useSpring } from 'react-spring';
import { useState, useEffect } from 'react';

const calc = (o: number) => `translateY(${o * 0.2}px)`;

const ParallaxComponent: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
        springscrollY: 0
    }));

    springsetScrollY({ springscrollY: offsetY });

    return (
        <div className="relative h-screen">
            <animated.div className="bg-blue-400 h-full absolute w-full" style={{ transform: springscrollY.to(calc) }}/>
            <div className="relative h-full w-full">
                <div className="w-full h-1/2 bg-green-400 flex items-center justify-center">
                    <h1 className="text-4xl font-bold">Welcome to OMEGA</h1>
                </div>
                <div className="w-full h-1/2 bg-yellow-400 flex items-center justify-center">
                    <h1 className="text-4xl font-bold">Your all-in-one Discord bot solution</h1>
                </div>
            </div>
        </div>
    );
};

export default ParallaxComponent;