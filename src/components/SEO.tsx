import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const DOMAIN = 'https://www.littleaffairsariska.com';
const DEFAULT_IMAGE = 'https://i.postimg.cc/y829HSW-Z/Whats-App-Image-2024-02-26-at-10-25-54-243793df.jpg';

export function SEO({
  title,
  description,
  keywords = 'Sariska, Sariska National Park, Resort in Sariska, Eco-friendly resort, Rajasthan resorts, Little Affair Sariska, Wildlife safari, Tiger reserve, Stone Villas Sariska, Luxury Resort Sariska',
  path = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes('Little Affair') ? title : `${title} | Little Affair Sariska`;
  const canonicalUrl = `${DOMAIN}${path.startsWith('/') ? path : `/${path}`}`;

  useEffect(() => {
    // 1. Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMeta = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Helper function to update or create link tags
    const updateLink = (relVal: string, hrefVal: string) => {
      let element = document.querySelector(`link[rel="${relVal}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relVal);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefVal);
    };

    // Standard meta tags
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    updateMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');

    // Canonical link
    updateLink('canonical', canonicalUrl);

    // Open Graph meta tags
    updateMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Little Affair Sariska');
    updateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // Twitter card meta tags
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // JSON-LD Structured Data
    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
}
