import React from 'react';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { Solution } from './components/Solution';
import { Comparison } from './components/Comparison';
import { Bundle } from './components/Bundle';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { OrderForm } from './components/OrderForm';

export default function Page() {
  return (
    <>
      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3417&uid=4a2b2107-ba63-494f-b762-41120bde0c94&lp=3453" style={{width:'1px',height:'1px',display:'none'}} alt="" />
      <Hero />
      <Problem />
      <HowItWorks />
      <Solution />
      <Comparison />
      <Bundle />
      <Reviews />
      <FAQ />
      <OrderForm />
    </>
  );
}