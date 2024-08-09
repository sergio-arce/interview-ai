'use client'

import { Faqs, Hero, Information, PlatformOverview, Testimonials } from '@/components/home'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box className="animate__animated animate__fadeIn">
      <Hero />
      <Information />
      <Faqs />
      <Testimonials />
      <PlatformOverview />
    </Box>
  )
}