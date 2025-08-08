import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
}

export function SEO({
    title = "On-Track - Building Connections",
    description = "On-Track helpt bij het bouwen van professionele verbindingen en netwerken.",
    keywords = "On-Track, building connections, professionele netwerken, zakelijke verbindingen",
    canonical = "https://on-track.nl/",
    ogImage = "https://on-track.nl/assets/on-track.png"
}: SEOProps) {
    
    useEffect(() => {
        // Update document title
        document.title = title;
        
        // Update or create meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);
        
        // Update Open Graph tags
        updateMetaTag('og:title', title, 'property');
        updateMetaTag('og:description', description, 'property');
        updateMetaTag('og:image', ogImage, 'property');
        updateMetaTag('og:url', canonical, 'property');
        
        // Update Twitter Card tags
        updateMetaTag('twitter:title', title, 'name');
        updateMetaTag('twitter:description', description, 'name');
        updateMetaTag('twitter:image', ogImage, 'name');
        
        // Update canonical link
        updateCanonicalLink(canonical);
        
        // Add structured data for better Google understanding
        updateStructuredData({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonical,
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://on-track.nl/#website"
            },
            "about": {
                "@type": "Organization",
                "name": "On-Track BV"
            }
        });
        
    }, [title, description, keywords, canonical, ogImage]);
    
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
        let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attribute, name);
            document.head.appendChild(element);
        }
        
        element.content = content;
    };
    
    const updateCanonicalLink = (href: string) => {
        let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        
        if (!element) {
            element = document.createElement('link');
            element.rel = 'canonical';
            document.head.appendChild(element);
        }
        
        element.href = href;
    };
    
    const updateStructuredData = (data: object) => {
        // Remove existing structured data
        const existing = document.querySelector('script[type="application/ld+json"]#page-data');
        if (existing) {
            existing.remove();
        }
        
        // Add new structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-data';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    };
    
    return null; // This component doesn't render anything
}

export default SEO;
