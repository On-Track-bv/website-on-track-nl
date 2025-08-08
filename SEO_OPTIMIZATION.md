# SEO Optimalisatie voor On-Track Website

Deze website is geoptimaliseerd voor zoekmachines met behoud van crawler bescherming.

## 🎯 SEO Features Geïmplementeerd

### 1. **Basis SEO Meta Tags**
```html
<title>On-Track - Building Connections | Professionele Verbindingen</title>
<meta name="description" content="On-Track helpt bij het bouwen van professionele verbindingen..." />
<meta name="keywords" content="On-Track, building connections, professionele netwerken..." />
```

### 2. **Open Graph (Social Media)**
- Facebook, LinkedIn sharing optimalisatie
- Twitter Card ondersteuning
- Dynamische social preview images

### 3. **Structured Data (Schema.org)**
- Organization markup
- LocalBusiness markup
- WebPage markup
- Contact information

### 4. **Technical SEO**
- ✅ Sitemap.xml (`/sitemap.xml`)
- ✅ Robots.txt geoptimaliseerd voor SEO
- ✅ Canonical URLs
- ✅ Semantic HTML (H1, H2, sections, headers)
- ✅ Mobile-friendly viewport
- ✅ Fast loading (Vite optimized)

### 5. **GEEN Analytics** (bewuste keuze)
- Geen tracking van bezoekers
- Geen cookies nodig
- Geen privacy complexity
- Basic website = basic setup

### 6. **Optionele Google Search Console** (alleen verificatie)
- Google Search Console verification (alleen meta tag indien gewenst)
- GEEN tracking of cookies

## 🍪 Privacy & Cookies

### Huidige configuratie: **HELEMAAL GEEN TRACKING**

✅ **Alleen SEO optimalisatie:**
- Meta tags voor Google vindbaarheid
- Sitemap voor zoekmachine indexering  
- Structured data voor betere resultaten
- Social media previews

❌ **GEEN data verzameling:**
- Geen analytics (ook niet privacy-vriendelijk)
- Geen cookies
- Geen tracking
- Geen third-party services

**Filosofie**: Een basic website hoeft niet alles te meten. Soms is simpel beter.

### Google Search Console (alleen verificatie):
Als je Google Search Console wilt gebruiken (aanbevolen voor SEO):
1. Ga naar [Google Search Console](https://search.google.com/search-console)
2. Voeg je website toe
3. Kies "HTML tag" verificatie methode
4. Kopieer de verification code
5. Activeer in `App.tsx`:

```tsx
<Analytics 
  googleSearchConsoleId="your-verification-code"
/>
```

**Let op**: Dit is ALLEEN een meta tag voor verificatie, geen tracking!

## 🔧 Configuratie

### Basic Setup (aanbevolen voor eenvoudige websites):
Huidige setup gebruikt **alleen SEO** - geen analytics, geen cookies:

```tsx
// Alleen SEO voor Google vindbaarheid
<SEO 
  title="On-Track - Building Connections | Professionele Verbindingen"
  description="On-Track helpt bij het bouwen van professionele verbindingen..."
  keywords="On-Track, building connections, professionele netwerken..."
  canonical="https://on-track.nl/"
/>

// GEEN analytics componenten
// GEEN cookies
// GEEN complexity
```

Voordelen:
- ✅ Geen privacy gedoe
- ✅ GDPR/AVG compliant
- ✅ Simpel en onderhoudbaar
- ✅ Snel en lichtgewicht

### Google Analytics (optioneel - vereist cookies):
Alleen als je écht Google Analytics wilt (niet aanbevolen):

1. Implementeer eerst een cookie banner
2. Voeg privacy policy toe  
3. Update `App.tsx`:

```tsx
<Analytics 
  googleAnalyticsId="G-YOUR-TRACKING-ID"
  googleSearchConsoleId="your-verification-code"
/>
```

⚠️ **Let op**: Dit vereist uitgebreide privacy implementatie!

### Google Search Console:
1. Ga naar [Google Search Console](https://search.google.com/search-console)
2. Voeg je website toe
3. Kies "HTML tag" verificatie methode
4. Kopieer de verification code
5. Update in `App.tsx`

### Sitemap onderhouden:
Update `/public/sitemap.xml` wanneer je nieuwe pagina's toevoegt:

```xml
<url>
    <loc>https://on-track.nl/nieuwe-pagina</loc>
    <lastmod>2025-08-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

## 📊 Monitoring (Simpel)

### Voor een basic website heb je genoeg aan:
- **Google Search Console** - Hoe goed vind Google je website (optioneel)
- **Browser developer tools** - Laadsnelheid controleren (F12 → Network tab)
- **Google PageSpeed Insights** - Performance score checken

### GEEN analytics tools nodig:
- ~~Google Analytics~~ - Te complex voor basic website
- ~~Plausible/Fathom~~ - Ook nog steeds overkill
- ~~Server logs analyseren~~ - Niet nodig

**Realiteit check**: Als je een basic website hebt, hoef je niet alles te meten. Focus op de content en gebruikservaring in plaats van cijfers.

## 🚀 Volgende Stappen voor Betere SEO

### Content Optimalisatie:
1. **Blog sectie toevoegen** - Regelmatige content updates
2. **FAQ pagina** - Beantwoord veelgestelde vragen
3. **Case studies** - Toon succesvolle projecten
4. **Testimonials** - Klantreviews en feedback

### Technische Verbeteringen:
1. **Image optimization** - WebP formaat, alt tags
2. **Internal linking** - Betere site structuur
3. **Schema markup uitbreiden** - Review schema, FAQ schema
4. **Multilingual support** - Engels/Nederlands

### Local SEO (indien van toepassing):
1. **Google Business Profile** - Claim en optimaliseer
2. **Local directories** - Zorg voor consistente NAP info
3. **Local keywords** - Target specifieke locaties

## 📱 Social Media Integration

Voeg je social media accounts toe aan `business-schema.json`:

```json
"sameAs": [
  "https://www.linkedin.com/company/on-track-bv",
  "https://twitter.com/ontrackbv",
  "https://www.facebook.com/ontrackbv"
]
```

## ✅ SEO Checklist (Ultra Basic)

- [x] Title tags geoptimaliseerd
- [x] Meta descriptions toegevoegd  
- [x] H1/H2 structuur correct
- [x] Sitemap.xml aanwezig
- [x] Robots.txt SEO-vriendelijk
- [x] Open Graph tags (social media previews)
- [x] Structured data (Google begrijpt je website)
- [x] Mobile responsive
- [x] Fast loading (Vite geoptimaliseerd)
- [x] **GEEN analytics complexity** 🎉
- [x] **GEEN cookies** 🎉
- [x] **GEEN privacy gedoe** 🎉
- [x] **Ultra simpel en onderhoudbaar** 🎉
- [ ] Google Search Console verificatie (optioneel)
- [ ] Content uitbreiden (als je wilt)

## 🔍 Testing & Validatie

Test je SEO implementatie:

```bash
# Test sitemap
curl https://on-track.nl/sitemap.xml

# Test robots.txt  
curl https://on-track.nl/robots.txt

# Test structured data
# Gebruik: https://search.google.com/test/rich-results

# Test Open Graph
# Gebruik: https://developers.facebook.com/tools/debug/

# Test mobile-friendliness
# Gebruik: https://search.google.com/test/mobile-friendly
```
