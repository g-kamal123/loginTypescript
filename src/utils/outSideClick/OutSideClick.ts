import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible:boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const [t,setT] = useState(false)
    const ref:any = useRef(null);
    const handleClickOutside = (event:any) => {
        // console.log(event)
        if (ref.current && ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
        setT(!t)
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { ref, isComponentVisible,t };
}