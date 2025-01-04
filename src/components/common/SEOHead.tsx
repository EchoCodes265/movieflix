import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  image = 'https://movieflix-demo.com/og-image.jpg',
  type = 'website' 
}: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | MovieFlix`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:type', type);
  }, [title, description, image, type]);

  return null;
}

function updateMetaTag(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}