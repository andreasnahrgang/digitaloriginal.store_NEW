'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      title: 'ThirdWeb Documentation',
      description: 'Learn about wallet integration and NFT management',
      url: 'https://portal.thirdweb.com/',
    },
    {
      title: 'IPFS Guide',
      description: 'Understanding decentralized storage for NFTs',
      url: 'https://docs.ipfs.tech/',
    },
    {
      title: 'NFT Best Practices',
      description: 'Guidelines for creating and collecting digital art',
      url: 'https://ethereum.org/en/nft/',
    },
    {
      title: 'Web3 Storage',
      description: 'Alternative decentralized storage solutions',
      url: 'https://web3.storage/',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p className="text-muted-foreground mb-8">
          Helpful guides and documentation for navigating the NFT marketplace
        </p>

        <div className="grid gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {resource.title}
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Resource →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
