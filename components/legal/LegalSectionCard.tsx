import React from 'react';

export interface LegalSectionCardProps {
  number?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const LegalSectionCard: React.FC<LegalSectionCardProps> = ({
  number,
  title,
  children,
  className = '',
}) => {
  return (
    <section className={`bg-white p-6 sm:p-8 border border-[#ba935a]/25 shadow-sm space-y-4 ${className}`}>
      <h2 className="font-serif text-xl font-bold text-[#1a1816] flex items-center gap-2">
        {number && <span className="text-[#ba935a]">{number}.</span>}
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-[#4a453e]">
        {children}
      </div>
    </section>
  );
};
