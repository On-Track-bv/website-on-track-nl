import { useEffect } from 'react';

interface AnalyticsProps {
    googleSearchConsoleId?: string;
}

/**
 * Minimale Google integratie - ALLEEN Search Console verificatie
 * GEEN tracking, GEEN cookies, GEEN Google Analytics
 */
export function Analytics({ 
    googleSearchConsoleId 
}: AnalyticsProps) {
    
    useEffect(() => {
        // ALLEEN Google Search Console verification meta tag
        // Dit is gewoon een meta tag, geen tracking of cookies
        if (googleSearchConsoleId) {
            const meta = document.createElement('meta');
            meta.name = 'google-site-verification';
            meta.content = googleSearchConsoleId;
            document.head.appendChild(meta);
        }
        
    }, [googleSearchConsoleId]);
    
    return null;
}

export default Analytics;
