'use client';
import styles from './my-subscriptions.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
import { CostSlider } from '@/components/CostSlider/CostSlider';
import { TotalCostSlider } from '@/components/TotalCostSlider/TotalCostSlider';
import '../../styles/globals.css';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';



export default function ClientComponent() {
  const supabase = createClientComponentClient();

  return(
    <>
    <h1>This is the my-subscriptions page</h1>
    </>
  )


}