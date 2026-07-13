import React from 'react';
import { Navbar } from '@/components/organisms/shared/public/Navbar/Navbar';
import { Footer } from '@/components/organisms/shared/public/Footer/Footer';
import { HomeHeroSection } from '@/components/organisms/home/HomeHeroSection/HomeHeroSection';
import { HomeValuePropSection } from '@/components/organisms/home/HomeValuePropSection/HomeValuePropSection';
import { HomeOrderSchemeSection } from '@/components/organisms/home/HomeOrderSchemeSection/HomeOrderSchemeSection';
import { HomeFeaturedSection } from '@/components/organisms/home/HomeFeaturedSection/HomeFeaturedSection';
import { HomeHowItWorksSection } from '@/components/organisms/home/HomeHowItWorksSection/HomeHowItWorksSection';
import { HomeQualitySection } from '@/components/organisms/home/HomeQualitySection/HomeQualitySection';
import { HomeShowcaseSection } from '@/components/organisms/home/HomeShowcaseSection/HomeShowcaseSection';
import { HomeTestimonialSection } from '@/components/organisms/home/HomeTestimonialSection/HomeTestimonialSection';
import { HomeContactSection } from '@/components/organisms/home/HomeContactSection/HomeContactSection';
import styles from './HomeTemplate.module.css';

export function HomeTemplate() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <HomeHeroSection />
        <HomeValuePropSection />
        <HomeOrderSchemeSection />
        <HomeFeaturedSection />
        <HomeHowItWorksSection />
        <HomeQualitySection />
        <HomeShowcaseSection />
        <HomeTestimonialSection />
        <HomeContactSection />
      </main>
      <Footer />
    </div>
  );
}
