import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { nftApi } from '@/db/api';
import type { NFTWithArtist } from '@/types/types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function NFTDetail() {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<NFTWithArtist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFT = async () => {
      if (!id) return;
      setLoading(true);
      const data = await nftApi.getNFTById(id);
      setNft(data);
      setLoading(false);
    };

    loadNFT();
  }, [id]);

  const handlePurchase = () => {
    toast.info('Connect your wallet to purchase this NFT', {
      description: 'ThirdWeb wallet integration required',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">NFT Not Found</h2>
        <Link to="/marketplace">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden">
              <img
                src={nft.image_url}
                alt={nft.title}
                className="w-full aspect-square object-cover"
              />
            </Card>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                {nft.is_listed && (
                  <Badge variant="outline" className="border-primary text-primary">
                    Available
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{nft.title}</h1>
              {nft.description && (
                <p className="text-lg text-muted-foreground mb-6">{nft.description}</p>
              )}
            </div>

            {nft.artist && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-3">Creator</p>
                  <div>
                    <p className="font-semibold text-xl mb-2">{nft.artist.name}</p>
                    {nft.artist.wallet_address && (
                      <p className="text-sm text-muted-foreground font-mono mb-3">
                        {nft.artist.wallet_address.slice(0, 6)}...
                        {nft.artist.wallet_address.slice(-4)}
                      </p>
                    )}
                    {nft.artist.website && (
                      <a
                        href={nft.artist.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center gap-1"
                      >
                        Visit Artist Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {nft.artist.bio && (
                    <>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{nft.artist.bio}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {nft.price !== null && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Current Price</p>
                  <p className="text-3xl font-bold text-primary mb-4">{nft.price} ETH</p>
                  <Button onClick={handlePurchase} size="lg" className="w-full">
                    Purchase NFT
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Details</h3>
                <div className="space-y-3">
                  {nft.token_id && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token ID</span>
                      <span className="font-mono">{nft.token_id}</span>
                    </div>
                  )}
                  {nft.contract_address && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Contract</span>
                      <span className="font-mono text-sm">
                        {nft.contract_address.slice(0, 6)}...{nft.contract_address.slice(-4)}
                      </span>
                    </div>
                  )}
                  {nft.ipfs_hash && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">IPFS</span>
                      <a
                        href={`https://ipfs.io/ipfs/${nft.ipfs_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        View on IPFS
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span>{new Date(nft.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
