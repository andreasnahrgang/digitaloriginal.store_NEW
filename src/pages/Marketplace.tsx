import { useEffect, useState } from 'react';
import { NFTCard } from '@/components/nft/NFTCard';
import { nftApi } from '@/db/api';
import type { NFTWithArtist } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Marketplace() {
  const [nfts, setNfts] = useState<NFTWithArtist[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<NFTWithArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadNFTs = async () => {
      setLoading(true);
      const data = await nftApi.getAllNFTs();
      setNfts(data);
      setFilteredNfts(data);
      setLoading(false);
    };

    loadNFTs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNfts(nfts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = nfts.filter(
        (nft) =>
          nft.title.toLowerCase().includes(query) ||
          nft.description?.toLowerCase().includes(query) ||
          nft.artist?.name.toLowerCase().includes(query)
      );
      setFilteredNfts(filtered);
    }
  }, [searchQuery, nfts]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">NFT Marketplace</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse and discover unique digital artworks
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : filteredNfts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {searchQuery ? 'No NFTs found matching your search' : 'No NFTs available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
