'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { OwnerAvatarCard } from './OwnerAvatarCard';

export const StorySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section
      backgroundImage="/backgrounds/bg-2.webp"
      overlayColor="bg-[#faf7f2]/80"
      className="border-t border-[#ba935a]/20"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="flex-1 space-y-8 text-center lg:text-start">
          <SectionHeader
            title={t('story.title')}
            subtitle={t('story.subtitle')}
            align="left"
            className="items-center lg:items-start"
          />

          <div className="space-y-6 text-[#6e675e] text-base sm:text-lg leading-relaxed font-medium">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
            <p className="font-accent text-3xl sm:text-4xl text-[#ba935a] pt-6 font-normal">
              {t('story.quote')}
            </p>
          </div>

          <div className="pt-4">
            <Button
              href="/menu"
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('story.discoverMenu')}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] mx-auto mt-8 lg:mt-0">

          <OwnerAvatarCard
            src="/home/mr-loris.jpg"
            alt="Mr. Loris"
            positionClass="top-0 right-0 shadow-2xl"
            zIndexClass="z-10 hover:z-30"
          />

          <OwnerAvatarCard
            src="/home/mrs-veronica.jpg"
            alt="Mrs. Veronica"
            positionClass="bottom-0 left-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            zIndexClass="z-20 hover:z-30"
          />
        </div>
      </div>
    </Section>
  );
};
