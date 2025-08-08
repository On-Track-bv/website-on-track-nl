import { useEffect } from 'react';

// Lijst van bekende agressieve scrapers (niet legitieme zoekmachines)
const AGGRESSIVE_CRAWLERS = [
    'semrushbot',
    'ahrefsbot',
    'mj12bot',
    'dotbot',
    'seznambot',
    'scrapy',
    'python-requests',
    'wget',
    'curl',
    'httrack',
    'winhttp',
    'go-http-client',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'telegrambot',
];

// Type declarations for window properties
declare global {
    interface Window {
        chrome?: unknown;
        callPhantom?: unknown;
        _phantom?: unknown;
        Buffer?: unknown;
        emit?: unknown;
        spawn?: unknown;
    }
}

interface CrawlerProtectionProps {
    children: React.ReactNode;
    onCrawlerDetected?: () => void;
    redirectUrl?: string;
    level?: 'mild' | 'moderate' | 'strict';
}

export function CrawlerProtection({ 
    children, 
    onCrawlerDetected,
    redirectUrl = 'https://example.com',
    level = 'moderate'
}: CrawlerProtectionProps) {
    
    useEffect(() => {
        const detectCrawler = async () => {
            // Alleen detecteren op 'moderate' of 'strict' level
            if (level === 'mild') return;
            
            // Check user agent tegen agressieve scrapers (niet legitieme zoekmachines)
            const userAgent = navigator.userAgent.toLowerCase();
            const isAggressiveCrawler = AGGRESSIVE_CRAWLERS.some((bot: string) => 
                userAgent.includes(bot)
            );
            
            if (isAggressiveCrawler) {
                console.warn('Agressieve crawler gedetecteerd via User-Agent:', navigator.userAgent);
                handleCrawlerDetection();
                return;
            }
            
            // Check voor duidelijke automatisatie tools (alleen bij strict)
            if (level === 'strict') {
                const isHeadless = await checkHeadless();
                if (isHeadless) {
                    console.warn('Headless browser gedetecteerd');
                    handleCrawlerDetection();
                    return;
                }
                
                const isAutomated = checkAutomation();
                if (isAutomated) {
                    console.warn('Automatisatie tool gedetecteerd');
                    handleCrawlerDetection();
                    return;
                }
            }
        };
        
        const handleCrawlerDetection = () => {
            if (onCrawlerDetected) {
                onCrawlerDetected();
            } else {
                // Mildere default actie: log en toon waarschuwing
                console.log('Ongewenste crawler activiteit gedetecteerd');
                // Geen automatische redirect voor betere UX
            }
        };
        
        const checkHeadless = async (): Promise<boolean> => {
            // Check verschillende headless browser indicators
            
            // Chrome headless detection
            if (navigator.webdriver) return true;
            
            // Check voor ontbrekende properties die normaal aanwezig zijn
            if (!window.chrome && navigator.userAgent.includes('Chrome')) return true;
            
            // Check voor inconsistenties in navigator properties
            if (navigator.languages && navigator.languages.length === 0) return true;
            
            // Check voor ontbrekende plugins
            if (navigator.plugins.length === 0) return true;
            
            return false;
        };
        
        const checkAutomation = (): boolean => {
            // Check voor Selenium
            if (window.document.documentElement.getAttribute('webdriver')) return true;
            if (window.navigator.webdriver) return true;
            
            // Check voor PhantomJS
            if (window.callPhantom || window._phantom) return true;
            
            // Check voor andere automation tools
            if (window.Buffer) return true;
            if (window.emit) return true;
            if (window.spawn) return true;
            
            return false;
        };
        
        // Voer detectie uit na korte delay
        const timeoutId = setTimeout(detectCrawler, 100);
        
        return () => clearTimeout(timeoutId);
    }, [onCrawlerDetected, redirectUrl, level]);
    
    // Alleen basic bescherming bij moderate level (geen agressieve key blocking)
    useEffect(() => {
        if (level === 'mild') return;
        
        const handleKeyDown = (e: KeyboardEvent) => {
            // Alleen bij strict level: blokkeer developer tools
            if (level === 'strict') {
                // Blokkeer F12 (Developer Tools)
                if (e.key === 'F12') {
                    e.preventDefault();
                    return false;
                }
                
                // Blokkeer Ctrl+Shift+I (Developer Tools)
                if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                    e.preventDefault();
                    return false;
                }
                
                // Blokkeer Ctrl+U (View Source)
                if (e.ctrlKey && e.key === 'u') {
                    e.preventDefault();
                    return false;
                }
            }
        };
        
        const handleContextMenu = (e: MouseEvent) => {
            // Alleen bij strict level: blokkeer right-click
            if (level === 'strict') {
                e.preventDefault();
                return false;
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        if (level === 'strict') {
            document.addEventListener('contextmenu', handleContextMenu);
        }
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [level]);
    
    return <>{children}</>;
}

export default CrawlerProtection;
