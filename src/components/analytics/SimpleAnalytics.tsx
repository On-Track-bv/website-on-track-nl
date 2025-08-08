import { useEffect } from 'react';

interface SimpleAnalyticsProps {
    trackPageViews?: boolean;
    trackErrors?: boolean;
}

/**
 * Privacy-vriendelijke analytics zonder cookies
 * Gebruikt alleen basis browser informatie die niet privacy-gevoelig is
 */
export function SimpleAnalytics({ 
    trackPageViews = true,
    trackErrors = true 
}: SimpleAnalyticsProps) {
    
    useEffect(() => {
        if (!trackPageViews) return;
        
        // Basis page view tracking zonder cookies of persoonlijke data
        const trackPageView = () => {
            const data = {
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                referrer: document.referrer || 'direct',
                userAgent: navigator.userAgent,
                language: navigator.language,
                screenResolution: `${screen.width}x${screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`
            };
            
            // Log lokaal (kan later naar eigen server zonder cookies)
            console.log('📊 Page View (Privacy-friendly):', data);
            
            // Optioneel: verstuur naar eigen analytics endpoint
            // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) });
        };
        
        trackPageView();
        
    }, [trackPageViews]);
    
    useEffect(() => {
        if (!trackErrors) return;
        
        // Error tracking zonder persoonlijke data
        const handleError = (error: ErrorEvent) => {
            const errorData = {
                timestamp: new Date().toISOString(),
                message: error.message,
                filename: error.filename,
                line: error.lineno,
                column: error.colno,
                userAgent: navigator.userAgent
            };
            
            console.log('🚨 Error tracked (Privacy-friendly):', errorData);
            
            // Optioneel: verstuur naar eigen error tracking
            // fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorData) });
        };
        
        window.addEventListener('error', handleError);
        
        return () => {
            window.removeEventListener('error', handleError);
        };
        
    }, [trackErrors]);
    
    // Privacy-vriendelijke event tracking
    const trackEvent = (eventName: string, eventData?: object) => {
        const data = {
            timestamp: new Date().toISOString(),
            event: eventName,
            page: window.location.pathname,
            data: eventData || {}
        };
        
        console.log('📈 Event tracked (Privacy-friendly):', data);
        
        // Optioneel: verstuur naar eigen analytics endpoint
        // fetch('/api/events', { method: 'POST', body: JSON.stringify(data) });
    };
    
    // Make tracking functions available globally
    useEffect(() => {
        (window as Window & typeof globalThis & {
            trackEvent: typeof trackEvent;
            trackContactForm: () => void;
            trackFeatureInteraction: (featureName: string) => void;
        }).trackEvent = trackEvent;
        
        // Contact form tracking
        (window as Window & typeof globalThis & {
            trackContactForm: () => void;
        }).trackContactForm = () => {
            trackEvent('contact_form_view', { section: 'contact' });
        };
        
        // Feature interaction tracking
        (window as Window & typeof globalThis & {
            trackFeatureInteraction: (featureName: string) => void;
        }).trackFeatureInteraction = (featureName: string) => {
            trackEvent('feature_interaction', { feature: featureName });
        };
        
    }, []);
    
    return null;
}

export default SimpleAnalytics;
