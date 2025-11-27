import { supabase } from './supabase';
import type { Artist, NFT, NFTWithArtist } from '@/types/types';

export const nftApi = {
  async getAllNFTs(): Promise<NFTWithArtist[]> {
    const { data, error } = await supabase
      .from('nfts')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('is_listed', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  async getNFTById(id: string): Promise<NFTWithArtist | null> {
    const { data, error } = await supabase
      .from('nfts')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching NFT:', error);
      return null;
    }

    return data;
  },

  async getFeaturedNFTs(limit = 6): Promise<NFTWithArtist[]> {
    const { data, error } = await supabase
      .from('nfts')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('is_listed', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured NFTs:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  async getNFTsByArtist(artistId: string): Promise<NFT[]> {
    const { data, error } = await supabase
      .from('nfts')
      .select('*')
      .eq('artist_id', artistId)
      .eq('is_listed', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artist NFTs:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  async createNFT(nft: Partial<NFT>): Promise<NFT | null> {
    const { data, error } = await supabase
      .from('nfts')
      .insert([nft])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating NFT:', error);
      return null;
    }

    return data;
  },

  async updateNFT(id: string, updates: Partial<NFT>): Promise<NFT | null> {
    const { data, error } = await supabase
      .from('nfts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating NFT:', error);
      return null;
    }

    return data;
  },

  async deleteNFT(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('nfts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting NFT:', error);
      return false;
    }

    return true;
  }
};

export const artistApi = {
  async getAllArtists(): Promise<Artist[]> {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artists:', error);
      return [];
    }

    return Array.isArray(data) ? data : [];
  },

  async getArtistById(id: string): Promise<Artist | null> {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching artist:', error);
      return null;
    }

    return data;
  },

  async createArtist(artist: Partial<Artist>): Promise<Artist | null> {
    const { data, error } = await supabase
      .from('artists')
      .insert([artist])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating artist:', error);
      return null;
    }

    return data;
  },

  async updateArtist(id: string, updates: Partial<Artist>): Promise<Artist | null> {
    const { data, error } = await supabase
      .from('artists')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating artist:', error);
      return null;
    }

    return data;
  }
};
