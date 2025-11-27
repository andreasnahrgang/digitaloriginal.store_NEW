import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NFTWithArtist } from '@/types/types';

interface NFTCardProps {
  nft: NFTWithArtist;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Link to={`/nft/${nft.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <img
            src={nft.image_url}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{nft.title}</h3>
          {nft.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {nft.description}
            </p>
          )}
          {nft.artist && (
            <div className="mb-3">
              <span className="text-sm text-muted-foreground">by {nft.artist.name}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          {nft.price !== null && (
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-bold text-primary">{nft.price} ETH</p>
            </div>
          )}
          {nft.is_listed && (
            <Badge variant="outline" className="border-primary text-primary">
              Available
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
