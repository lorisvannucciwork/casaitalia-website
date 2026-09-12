'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Globe, 
  Share2, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Phone,
  Mail,
  MapPin,
  Compass
} from 'lucide-react';
import { SocialCardData, CustomLinkItem } from '@/app/api/nfc/route';
import { sanitizeText, sanitizeUrl } from '@/lib/security';

// Vector Brand Icons
export const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const TwitterXIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.78 1.25-.06 2.4-1 2.6-2.24.11-.53.11-1.07.11-1.61V.02h.01z" />
  </svg>
);

export const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const TelegramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export const SnapchatIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c-3.8 0-6.1 2.8-6.1 5.9 0 .9.3 2.1.8 2.9.1.2.2.4.1.6-.2.4-.9.9-1.4 1.1-.5.2-.7.6-.6.9.2.5.9.8 1.8.8.4 0 .8.1 1.1.3.3.2.5.6.3 1.1-.3.8-.9 1.5-1.9 1.9-.4.2-.6.5-.5.8.2.6 1.4.9 2.5.7.5-.1 1.1 0 1.5.3.8.6 1.5 1.5 2.4 1.5.9 0 1.6-.9 2.4-1.5.4-.3 1-.4 1.5-.3 1.1.2 2.3-.1 2.5-.7.1-.3-.1-.6-.5-.8-1-.4-1.6-1.1-1.9-1.9-.2-.5 0-.9.3-1.1.3-.2.7-.3 1.1-.3.9 0 1.6-.3 1.8-.8.1-.3-.1-.7-.6-.9-.5-.2-1.2-.7-1.4-1.1-.1-.2 0-.4.1-.6.5-.8.8-2 .8-2.9C18.1 4.8 15.8 2 12 2z" />
  </svg>
);

export const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const TripAdvisorIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 5.385c2.32 0 4.205 1.884 4.205 4.205 0 2.32-1.885 4.205-4.205 4.205s-4.205-1.885-4.205-4.205c0-2.321 1.885-4.205 4.205-4.205zm-6.72 1.472a5.89 5.89 0 0 0-2.38 4.673c0 3.257 2.64 5.897 5.897 5.897 1.848 0 3.498-.853 4.57-2.187.355.334.743.626 1.16.868-.696 1.053-1.892 1.745-3.25 1.745-2.164 0-3.92-1.756-3.92-3.92 0-.256.026-.505.074-.746-.226-.062-.46-.098-.703-.098-1.5 0-2.716 1.216-2.716 2.716 0 .524.15 1.013.409 1.428C2.593 15.65 1.5 13.754 1.5 11.53c0-3.35 1.572-6.335 4.015-8.253a.856.856 0 0 1-.234 3.58zm13.438 0a.856.856 0 0 1-.233-3.58c2.443 1.918 4.014 4.903 4.014 8.253 0 2.224-1.093 4.12-2.948 5.712.259-.415.41-.904.41-1.428 0-1.5-1.216-2.716-2.717-2.716-.242 0-.476.036-.702.098.048.241.074.49.074.746 0 2.164-1.756 3.92-3.92 3.92-1.358 0-2.554-.692-3.25-1.745.417-.242.805-.534 1.16-.868 1.072 1.334 2.722 2.187 4.57 2.187 3.257 0 5.897-2.64 5.897-5.897a5.89 5.89 0 0 0-2.38-4.673zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.203 11.026a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872zm6.406 0a3.436 3.436 0 1 1 0-6.872 3.436 3.436 0 0 1 0 6.872z" />
  </svg>
);

const cleanHandle = (val: string, platformDomainRegex?: RegExp) => {
  if (!val) return '';
  let cleaned = sanitizeText(val);
  if (platformDomainRegex) {
    cleaned = cleaned.replace(platformDomainRegex, '');
  }
  return cleaned.replace(/^@+/, '').replace(/[^a-zA-Z0-9._-]/g, '').trim();
};

const getPlatformDetails = (item: CustomLinkItem) => {
  const type = item.type || 'website';
  const cleanTitle = sanitizeText(item.title);
  
  if (type === 'phone') {
    const rawPhone = item.url.replace(/[^0-9+]/g, '');
    const formattedUrl = `tel:${rawPhone}`;
    return {
      title: cleanTitle || 'Phone Call',
      url: formattedUrl,
      bg: 'bg-[#2d6a4f]',
      icon: <Phone className="w-4 h-4" />
    };
  }
  if (type === 'whatsapp') {
    const rawDigits = item.url.replace(/[^0-9]/g, '');
    const formattedUrl = `https://wa.me/${rawDigits}`;
    return {
      title: cleanTitle || 'WhatsApp Message',
      url: formattedUrl,
      bg: 'bg-[#25d366]',
      icon: <WhatsAppIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'instagram') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?instagram\.com\//i);
    const formattedUrl = `https://instagram.com/${handle}`;
    return {
      title: cleanTitle || `@${handle || 'instagram'}`,
      url: formattedUrl,
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      icon: <InstagramIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'tiktok') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?tiktok\.com\/@?/i);
    const formattedUrl = `https://tiktok.com/@${handle}`;
    return {
      title: cleanTitle || `@${handle || 'tiktok'}`,
      url: formattedUrl,
      bg: 'bg-black border border-white/20',
      icon: <TikTokIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'facebook') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?facebook\.com\//i);
    const formattedUrl = `https://facebook.com/${handle}`;
    return {
      title: cleanTitle || (handle ? `Facebook / ${handle}` : 'Facebook'),
      url: formattedUrl,
      bg: 'bg-[#1877f2]',
      icon: <FacebookIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'linkedin') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i);
    const formattedUrl = `https://linkedin.com/in/${handle}`;
    return {
      title: cleanTitle || (handle ? `LinkedIn / ${handle}` : 'LinkedIn'),
      url: formattedUrl,
      bg: 'bg-[#0077b5]',
      icon: <LinkedInIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'twitter') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?(x|twitter)\.com\//i);
    const formattedUrl = `https://x.com/${handle}`;
    return {
      title: cleanTitle || `@${handle || 'twitter'}`,
      url: formattedUrl,
      bg: 'bg-black border border-white/20',
      icon: <TwitterXIcon className="w-3.5 h-3.5 text-white" />
    };
  }
  if (type === 'email') {
    const rawEmail = sanitizeText(item.url).replace(/^mailto:/i, '').trim();
    const formattedUrl = `mailto:${rawEmail}`;
    return {
      title: cleanTitle || 'Send Email',
      url: formattedUrl,
      bg: 'bg-amber-600',
      icon: <Mail className="w-4 h-4 text-white" />
    };
  }
  if (type === 'telegram') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?t\.me\//i);
    const formattedUrl = `https://t.me/${handle}`;
    return {
      title: cleanTitle || `@${handle || 'telegram'}`,
      url: formattedUrl,
      bg: 'bg-[#229ed9]',
      icon: <TelegramIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'youtube') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?youtube\.com\//i);
    const formattedUrl = `https://youtube.com/${handle.startsWith('@') ? handle : '@' + handle}`;
    return {
      title: cleanTitle || 'YouTube Channel',
      url: formattedUrl,
      bg: 'bg-[#ff0000]',
      icon: <YouTubeIcon className="w-4 h-4 text-white" />
    };
  }
  if (type === 'snapchat') {
    const handle = cleanHandle(item.url, /^https?:\/\/(www\.)?snapchat\.com\/add\//i);
    const formattedUrl = `https://snapchat.com/add/${handle}`;
    return {
      title: cleanTitle || `@${handle || 'snapchat'}`,
      url: formattedUrl,
      bg: 'bg-[#fffc00] text-black',
      icon: <SnapchatIcon className="w-4 h-4 text-black" />
    };
  }

  // website / other default (strict sanitizeUrl)
  const safeUrl = sanitizeUrl(item.url);
  return {
    title: cleanTitle || 'Website Link',
    url: safeUrl || '#',
    bg: 'bg-[#ba935a]',
    icon: <Globe className="w-4 h-4" />
  };
};

export default function MedalCardPage() {
  const params = useParams();
  const tagId = typeof params?.tagId === 'string' ? params.tagId : '';

  const [cardData, setCardData] = useState<SocialCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCard() {
      try {
        const res = await fetch(`/api/nfc/${tagId}`);
        const data = await res.json();
        if (data.success && data.tag?.socialCard) {
          setCardData(data.tag.socialCard);
        } else {
          setCardData({
            guestName: 'Casa Italia Guest',
            headline: 'Medal Card Member',
            bio: 'Distinguished guest of Casa Italia Ristorante & Enoteca Autentica in Porto Ghalib.',
            instagram: 'casaitalia.portghalib',
            tiktok: 'casaitalia.eg',
            facebook: 'casaitaliarestaurant'
          });
        }
      } catch (err) {
        console.error('Failed to load card:', err);
        setCardData({
          guestName: 'Casa Italia Guest',
          headline: 'Medal Card Member',
          bio: 'Distinguished guest of Casa Italia Ristorante & Enoteca Autentica in Porto Ghalib.'
        });
      } finally {
        setLoading(false);
      }
    }

    if (tagId) {
      loadCard();
    }
  }, [tagId]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardData?.guestName ? `${cardData.guestName} | Casa Italia Medal Card` : 'Casa Italia Medal Card',
          text: `Connect with ${cardData?.guestName || 'Casa Italia Guest'}`,
          url: url,
        });
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadVCard = () => {
    if (!cardData) return;
    const name = cardData.guestName || 'Casa Italia Guest';
    const title = cardData.headline || 'Medal Card Member';
    const note = cardData.bio || 'Casa Italia Guest';
    const phone = cardData.phone || cardData.whatsapp || '';

    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${title}
NOTE:${note}`;

    if (phone) {
      vCard += `\nTEL;TYPE=CELL:${phone}`;
    }

    if (cardData.instagram) {
      const ig = cleanHandle(cardData.instagram, /^https?:\/\/(www\.)?instagram\.com\//i);
      vCard += `\nX-SOCIALPROFILE;type=instagram:https://instagram.com/${ig}`;
    }

    if (cardData.tiktok) {
      const tt = cleanHandle(cardData.tiktok, /^https?:\/\/(www\.)?tiktok\.com\/@?/i);
      vCard += `\nX-SOCIALPROFILE;type=tiktok:https://tiktok.com/@${tt}`;
    }

    if (cardData.facebook) {
      const fb = cleanHandle(cardData.facebook, /^https?:\/\/(www\.)?facebook\.com\//i);
      vCard += `\nX-SOCIALPROFILE;type=facebook:https://facebook.com/${fb}`;
    }

    if (cardData.linkedin) {
      const li = cleanHandle(cardData.linkedin, /^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i);
      vCard += `\nX-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/${li}`;
    }

    if (cardData.twitter) {
      const tw = cleanHandle(cardData.twitter, /^https?:\/\/(www\.)?(x|twitter)\.com\//i);
      vCard += `\nX-SOCIALPROFILE;type=twitter:https://x.com/${tw}`;
    }

    vCard += `\nURL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1816] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-[#ba935a] border-t-transparent animate-spin mb-4"></div>
        <span className="text-[#ba935a] font-serif text-sm uppercase tracking-widest">
          Loading Casa Italia Medal Card...
        </span>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="min-h-screen bg-[#1a1816] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-[#ba935a] font-serif text-2xl mb-2">Medal Card Inactive</h2>
        <p className="text-[#a89f91] text-xs max-w-sm mb-6">
          This physical gift card is currently not configured or inactive.
        </p>
        <a
          href="https://casaitaliarestaurants.com"
          className="px-6 py-2.5 bg-[#ba935a] text-[#1a1816] font-bold text-xs uppercase tracking-wider hover:bg-[#a37f48] transition-colors"
        >
          Visit Casa Italia
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#ba935a] selection:text-[#1a1816]">
      
      {/* Luxury Background Glow Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-[#ba935a]/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-[#ba935a]/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
        
        {/* TOP BRAND HEADER */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <div className="relative h-16 w-52 drop-shadow-md">
            <Image
              src="/logo/logo-01.svg"
              alt="Casa Italia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#ba935a]"></div>
            <span className="text-[10px] font-bold text-[#ba935a] uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#ba935a]" />
              Official Medal Card
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#ba935a]"></div>
          </div>
        </div>

        {/* LUXURY GUEST PROFILE CARD */}
        <div className="w-full bg-[#1e1b18] border border-[#ba935a]/40 shadow-2xl p-6 sm:p-8 relative backdrop-blur-md overflow-hidden mb-6">
          
          {/* Card Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ba935a]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ba935a]"></div>

          <div className="flex flex-col items-center text-center">
            {/* Luxury VIP Medal Monogram Crest */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#ba935a] via-[#e5cf9f] to-[#ba935a] shadow-lg">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#26221d] to-[#141210] flex items-center justify-center border border-[#ba935a]/40 shadow-inner">
                  <span className="font-serif font-black text-2xl text-[#ba935a] tracking-widest drop-shadow-sm">
                    {(cardData.guestName || 'VIP')
                      .split(' ')
                      .filter(Boolean)
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Name & Headline */}
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#faf7f2] tracking-wide mb-1">
              {cardData.guestName || 'Casa Italia Guest'}
            </h1>
            <p className="text-xs font-semibold text-[#ba935a] tracking-widest uppercase mb-3">
              {cardData.headline || 'Distinguished Member'}
            </p>

            {/* Bio Quote */}
            {cardData.bio && (
              <p className="text-xs text-[#a89f91] italic leading-relaxed max-w-xs mb-6 px-2">
                &ldquo;{cardData.bio}&rdquo;
              </p>
            )}

            {/* Action Buttons: Save Contact & Share */}
            <div className="grid grid-cols-2 gap-3 w-full pt-2">
              <button
                onClick={handleDownloadVCard}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#ba935a] hover:bg-[#a37f48] text-[#1a1816] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#262320] hover:bg-[#332f2b] text-[#faf7f2] border border-[#ba935a]/40 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#ba935a]" />}
                <span>{copied ? 'Copied!' : 'Share Card'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* GUEST SOCIAL & DIRECT CONNECT BUTTONS */}
        <div className="w-full space-y-2.5 mb-8">
          <div className="flex items-center gap-2 px-1 mb-1">
            <span className="text-[11px] font-bold text-[#ba935a] uppercase tracking-wider">
              Direct Contact & Socials
            </span>
            <div className="h-[1px] flex-1 bg-[#ba935a]/20"></div>
          </div>

          {/* Phone Call */}
          {cardData.phone && (
            <a
              href={`tel:${cardData.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  Call Phone ({cardData.phone})
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* WhatsApp */}
          {cardData.whatsapp && (
            <a
              href={`https://wa.me/${cardData.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  WhatsApp Message
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* Instagram */}
          {cardData.instagram && (
            <a
              href={`https://instagram.com/${cleanHandle(cardData.instagram, /^https?:\/\/(www\.)?instagram\.com\//i)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white text-xs font-bold">
                  <InstagramIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  Instagram (@{cleanHandle(cardData.instagram, /^https?:\/\/(www\.)?instagram\.com\//i)})
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* TikTok */}
          {cardData.tiktok && (
            <a
              href={`https://tiktok.com/@${cleanHandle(cardData.tiktok, /^https?:\/\/(www\.)?tiktok\.com\/@?/i)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-white text-xs font-bold">
                  <TikTokIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  TikTok (@{cleanHandle(cardData.tiktok, /^https?:\/\/(www\.)?tiktok\.com\/@?/i)})
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* Facebook */}
          {cardData.facebook && (
            <a
              href={`https://facebook.com/${cleanHandle(cardData.facebook, /^https?:\/\/(www\.)?facebook\.com\//i)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center text-white text-xs font-bold">
                  <FacebookIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  Facebook
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* LinkedIn */}
          {cardData.linkedin && (
            <a
              href={`https://linkedin.com/in/${cleanHandle(cardData.linkedin, /^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white text-xs font-bold">
                  <LinkedInIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  LinkedIn
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* Twitter / X */}
          {cardData.twitter && (
            <a
              href={`https://x.com/${cleanHandle(cardData.twitter, /^https?:\/\/(www\.)?(x|twitter)\.com\//i)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-white text-xs font-bold">
                  <TwitterXIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors">
                  X (Twitter) (@{cleanHandle(cardData.twitter, /^https?:\/\/(www\.)?(x|twitter)\.com\//i)})
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
            </a>
          )}

          {/* Dynamic Custom Links List */}
          {cardData.customLinks && cardData.customLinks.length > 0 && (
            cardData.customLinks.map((link) => {
              const details = getPlatformDetails(link);
              return (
                <a
                  key={link.id}
                  href={details.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#1e1b18] hover:bg-[#282420] border border-[#ba935a]/30 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${details.bg} flex items-center justify-center text-white text-xs font-bold`}>
                      {details.icon}
                    </div>
                    <span className="text-xs font-bold text-[#faf7f2] group-hover:text-[#ba935a] transition-colors truncate max-w-[240px]">
                      {details.title}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8c8479] group-hover:text-[#ba935a]" />
                </a>
              );
            })
          )}
        </div>

        {/* ALWAYS-PRESENT CASA ITALIA RESTAURANT SECTION */}
        <div className="w-full bg-[#181614] border-t-2 border-b-2 border-[#ba935a]/50 p-6 relative flex flex-col items-center text-center shadow-xl">
          
          <span className="text-[10px] font-bold text-[#ba935a] uppercase tracking-[0.2em] mb-1">
            Compliments Of
          </span>
          <h3 className="font-serif font-bold text-lg text-[#faf7f2] tracking-wider mb-2">
            Casa Italia Ristorante & Enoteca
          </h3>
          <p className="text-[11px] text-[#a89f91] max-w-xs leading-relaxed mb-5">
            Authentic Italian Dining & Fine Wine Pairings in the heart of Porto Ghalib Marina.
          </p>

          {/* Restaurant Official Socials */}
          <div className="flex items-center justify-center gap-3 mb-6 w-full">
            <a
              href="https://www.instagram.com/casaitalia.portghalib/"
              target="_blank"
              rel="noopener noreferrer"
              title="Casa Italia Instagram"
              className="w-10 h-10 bg-[#262320] border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-[#1a1816] transition-colors shadow-sm"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.tiktok.com/@casaitalia.eg"
              target="_blank"
              rel="noopener noreferrer"
              title="Casa Italia TikTok"
              className="w-10 h-10 bg-[#262320] border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-[#1a1816] transition-colors shadow-sm"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.facebook.com/casaitaliarestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              title="Casa Italia Facebook"
              className="w-10 h-10 bg-[#262320] border border-[#ba935a]/40 flex items-center justify-center text-[#ba935a] hover:bg-[#ba935a] hover:text-[#1a1816] transition-colors shadow-sm"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.tripadvisor.com/Search?q=Casa+Italia+Porto+Ghalib"
              target="_blank"
              rel="noopener noreferrer"
              title="Casa Italia TripAdvisor"
              className="w-10 h-10 bg-[#262320] border border-[#ba935a]/40 flex items-center justify-center text-[#00aa6c] hover:bg-[#00aa6c] hover:text-white transition-colors shadow-sm"
            >
              <TripAdvisorIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Link to Medal & Social Hub */}
          <div className="mb-5">
            <a
              href="/medal"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#ba935a]/40 text-[11px] font-bold text-[#ba935a] hover:bg-[#ba935a] hover:text-[#141210] transition-colors uppercase tracking-wider"
            >
              <Sparkles className="w-3 h-3 text-[#ba935a]" />
              <span>Explore Official Medal &amp; Social Hub</span>
            </a>
          </div>

          {/* Restaurant Location & Google Maps */}
          <div className="flex flex-col items-center gap-2 pt-2 border-t border-[#ba935a]/20 w-full">
            <a
              href="https://maps.app.goo.gl/HNufX8h9iE7dDJbR9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ba935a]/15 hover:bg-[#ba935a]/25 border border-[#ba935a]/40 text-xs font-bold text-[#ba935a] hover:text-[#faf7f2] uppercase tracking-wider transition-all"
            >
              <MapPin className="w-4 h-4 text-[#ba935a]" />
              <span>Marina, Porto Ghalib (Open in Maps)</span>
            </a>

            <a
              href="https://casaitaliarestaurants.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#a89f91] hover:text-[#ba935a] transition-colors mt-2"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Digital Menu & Reservations</span>
            </a>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-8 text-center text-[10px] text-[#6e675e] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Casa Italia. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
