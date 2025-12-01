import { IPFSUploader } from "@/components/ipfs-test";

export default function IPFSPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        IPFS Integration Test
      </h1>
      <IPFSUploader />
    </div>
  );
}
