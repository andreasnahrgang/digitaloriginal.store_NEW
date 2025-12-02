"use client";
import { useState } from "react";
import { uploadNFTToIPFS, isNFTStorageConfigured } from "@/lib/nft-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function IPFSUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isNFTStorageConfigured()) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          NFT_STORAGE_API_KEY is missing from .env file. Please sign up at
          nft.storage and add your key.
        </AlertDescription>
      </Alert>
    );
  }

  const handleUpload = async () => {
    if (!file || !name) return;

    setUploading(true);
    setError(null);

    try {
      const result = await uploadNFTToIPFS(file, {
        name,
        description,
      });
      setResult(result);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>IPFS Upload Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>NFT Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Cool NFT"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of your NFT..."
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Upload Successful!</span>
            </div>
            <div className="text-xs break-all space-y-1 text-muted-foreground">
              <p>
                <strong>Image CID:</strong> {result.imageCID}
              </p>
              <p>
                <strong>Metadata CID:</strong> {result.metadataCID}
              </p>
              <a
                href={result.gatewayURL}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline block mt-2"
              >
                View Metadata on IPFS Gateway →
              </a>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                setResult(null);
                setFile(null);
                setName("");
                setDescription("");
              }}
            >
              Upload Another
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={!file || !name || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading to IPFS...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload to IPFS
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
