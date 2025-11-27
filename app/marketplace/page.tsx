'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { NFTCard } from '@/components/nft/NFTCard';
import { nftApi } from '@/db/api';
import type { NFTWithArtist } from '@/types/types';
import { Search } from 'lucide-react';

export default function Marketplace() {
  const [nfts, setNfts] = useState<NFTWithArtist[]>([]);
  const [filteredNFTs, setFilteredNFTs] = useState<NFTWithArtist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFTs = async () => {
      setLoading(true);
      const data = await nftApi.getAllNFTs();
      setNfts(data);
      setFilteredNFTs(data);
      setLoading(false);
    };

    loadNFTs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNFTs(nfts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = nfts.filter(
        (nft) =>
          nft.title.toLowerCase().includes(query) ||
          nft.description?.toLowerCase().includes(query) ||
          nft.artist?.name.toLowerCase().includes(query)
      );
      setFilteredNFTs(filtered);
    }
  }, [searchQuery, nfts]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">NFT Marketplace</h1>
          <p className="text-muted-foreground mb-6">
            Browse and discover unique digital artworks from talented creators
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search NFTs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : filteredNFTs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No NFTs found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
