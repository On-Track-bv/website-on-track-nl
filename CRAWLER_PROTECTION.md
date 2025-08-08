# Crawler Bescherming voor On-Track Website

Deze website heeft **gemiddelde** crawler bescherming geïmplementeerd - effectief tegen agressieve scrapers maar vriendelijk voor legitieme zoekmachines en gebruikers.

## Huidige Configuratie: **MODERATE LEVEL**

### ✅ **Wat wordt toegestaan:**
- Google, Bing, Yahoo zoekmachines
- Normale gebruikers met alle browsers
- Developer tools en right-click
- Indexering door zoekmachines

### ❌ **Wat wordt geblokkeerd:**
- Agressieve scrapers (SemrushBot, AhrefsBot, etc.)
- Python-requests, wget, curl scripts
- Headless browsers zonder legitieme reden
- Excessieve hotlinking

## Geïmplementeerde Beschermingslagen

### 1. **robots.txt** (`/public/robots.txt`)
- ✅ Staat legitieme zoekmachines toe (Google, Bing, Yahoo)
- ❌ Blokkeert agressieve scrapers (Semrush, Ahrefs, etc.)
- ⏱️ Crawl-delay van 1 seconde voor respectvolle crawling
- 🔒 Beschermt /admin/, /api/, /private/ folders

### 2. **HTML Meta Tags** (`/index.html`)
- ✅ `index, follow` - Zoekmachines mogen indexeren
- ❌ `noarchive` - Voorkomt caching van pagina's
- ❌ `nosnippet` - Voorkomt snippets in zoekresultaten

### 3. **React Crawler Protection Component** (Moderate Level)
Detecteert alleen:
- ❌ **Agressieve scrapers**: Python-requests, wget, curl, etc.
- ❌ **Commercial bots**: SemrushBot, AhrefsBot, MJ12bot
- ✅ **Toegestaan**: Normale browsers, developer tools, right-click

### 4. **Server-level bescherming** (`.htaccess`)
- ❌ Blokkeert alleen agressieve scraper user-agents
- ✅ Toegang voor Google, Bing referrers bij afbeeldingen
- 🔒 Beschermt gevoelige bestanden (.env, .log)
- 🛡️ Basis security headers

### 5. **Development/Preview Headers** (`vite.config.ts`)
- Matige X-Robots-Tag headers (noarchive, nosnippet)
- SAMEORIGIN frame protection (niet DENY)

## Beschermingsniveaus

### 🟢 **Mild** (mild level)
```tsx
<CrawlerProtection level="mild">
```
- Alleen robots.txt filtering
- Geen JavaScript detectie
- Geen keyboard/mouse blokkering

### 🟡 **Moderate** (huidige configuratie)
```tsx
<CrawlerProtection level="moderate">
```
- ✅ Agressieve scrapers geblokkeerd
- ✅ Zoekmachines toegestaan
- ✅ Developer tools beschikbaar
- ✅ Right-click werkt normaal

### 🔴 **Strict** (maximale bescherming)
```tsx
<CrawlerProtection level="strict">
```
- Alle bots geblokkeerd
- Headless browser detectie
- F12/Ctrl+U geblokkeerd
- Right-click uitgeschakeld

## Voordelen van Moderate Level

✅ **SEO-vriendelijk**: Google en Bing kunnen je site indexeren  
✅ **Gebruikersvriendelijk**: Normale browserfunctionaliteit behouden  
✅ **Developer-vriendelijk**: F12 en developer tools werken  
✅ **Effectieve bescherming**: Agressieve scrapers worden gestopt  
✅ **Evenwichtig**: Goede balans tussen bescherming en toegankelijkheid  

## Testen van je bescherming

```bash
# Test legitieme crawler (zou moeten werken)
curl -H "User-Agent: Googlebot/2.1" https://jouw-website.com

# Test agressieve scraper (zou geblokkeerd moeten worden)
curl -H "User-Agent: SemrushBot/7~bl" https://jouw-website.com

# Check robots.txt
curl https://jouw-website.com/robots.txt

# Check headers
curl -I https://jouw-website.com
```

## Aanpassingen maken

### Voor meer bescherming → Strict:
```tsx
<CrawlerProtection level="strict" />
```

### Voor minder bescherming → Mild:
```tsx
<CrawlerProtection level="mild" />
```

### Custom detectie handler:
```tsx
<CrawlerProtection 
  level="moderate"
  onCrawlerDetected={() => {
    // Log naar analytics
    gtag('event', 'crawler_blocked');
    console.log('Scraper gedetecteerd');
  }}
/>
```
