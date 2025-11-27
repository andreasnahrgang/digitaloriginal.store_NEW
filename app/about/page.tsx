'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We are dedicated to creating a minimalist, avant-garde platform that connects digital artists 
              with collectors worldwide. Our marketplace celebrates the intersection of art and technology, 
              providing a curated space for unique digital creations.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Curated collection of high-quality digital artworks</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Blockchain-verified authenticity and provenance</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Seamless integration with ThirdWeb wallet services</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>IPFS storage for decentralized asset management</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Support for gallery partners and white-label solutions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              We envision a future where digital art is accessible, verifiable, and celebrated. 
              Through our platform, we aim to empower artists and collectors alike, fostering a 
              vibrant community built on trust, transparency, and creative expression.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
