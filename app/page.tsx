'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { nftApi } from '@/db/api';
import type { NFTWithArtist } from '@/types/types';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [featuredNFTs, setFeaturedNFTs] = useState<NFTWithArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedNFTs = async () => {
      setLoading(true);
      const nfts = await nftApi.getFeaturedNFTs(6);
      setFeaturedNFTs(nfts);
      setLoading(false);
    };

    loadFeaturedNFTs();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <img
              src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7uiwbqz6q8lc/conv-7uja2c23lczk/20251127/file-7ujeylhhucjk.png"
              alt="Digital Original"
              className="h-16 mx-auto mb-8"
            />
            <h1 className="text-5xl xl:text-6xl font-bold mb-6">
              Discover Unique Digital Art
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore, collect, and trade extraordinary NFTs from talented artists around the world
            </p>
            <Link href="/marketplace">
              <Button size="lg" className="group">
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredNFTs.map((nft) => (
                    <CarouselItem key={nft.id} className="md:basis-1/2 lg:basis-1/3">
                      <Link href={`/marketplace`}>
                        <div className="p-2">
                          <div className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer">
                            <div className="aspect-square relative">
                              <img
                                src={nft.image_url}
                                alt={nft.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1">{nft.title}</h3>
                              {nft.artist && (
                                <p className="text-sm text-muted-foreground">by {nft.artist.name}</p>
                              )}
                              {nft.price !== null && (
                                <p className="text-primary font-bold mt-2">{nft.price} ETH</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Collection</h3>
              <p className="text-muted-foreground">
                Handpicked digital artworks from talented creators worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Ownership</h3>
              <p className="text-muted-foreground">
                Blockchain-verified authenticity and provenance for every NFT
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Trading</h3>
              <p className="text-muted-foreground">
                Buy and sell NFTs seamlessly with integrated wallet support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
