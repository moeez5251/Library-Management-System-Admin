'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientWrapper({ children }) {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    useEffect(() => {
        router.prefetch('/');

        return () => {

        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('userID');
        // Optional: Redirect if no token and on a protected route
        if (!token && window.location.pathname.startsWith('/admin')) {
            router.push('/');
        }

        setIsReady(true); // wait until client-side mounted
    }, []);

    if (!isReady) return null; // or a loading spinner

    return <>{children}</>;
}
