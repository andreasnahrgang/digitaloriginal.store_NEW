import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is an NFT?',
          a: 'NFT stands for Non-Fungible Token. It is a unique digital asset that represents ownership of a specific item or piece of content, verified and secured by blockchain technology. Unlike cryptocurrencies, each NFT is one-of-a-kind and cannot be exchanged on a one-to-one basis.',
        },
        {
          q: 'How do I get started?',
          a: 'To get started, you need to connect a compatible crypto wallet (like MetaMask) to our platform. Once connected, you can browse the marketplace, purchase NFTs, or list your own digital artwork for sale.',
        },
        {
          q: 'What wallets are supported?',
          a: 'We support all major Ethereum-compatible wallets through ThirdWeb integration, including MetaMask, WalletConnect, Coinbase Wallet, and more. Simply click the "Connect Wallet" button to see all available options.',
        },
      ],
    },
    {
      category: 'Buying NFTs',
      questions: [
        {
          q: 'How do I purchase an NFT?',
          a: 'First, connect your wallet and ensure you have sufficient ETH to cover the NFT price and gas fees. Browse the marketplace, select an NFT you like, and click "Purchase NFT". Confirm the transaction in your wallet, and the NFT will be transferred to your wallet address.',
        },
        {
          q: 'What payment methods are accepted?',
          a: 'Currently, we accept ETH (Ethereum) for all NFT purchases. You need to have ETH in your connected wallet to complete transactions.',
        },
        {
          q: 'What are gas fees?',
          a: 'Gas fees are transaction costs paid to the Ethereum network to process and validate your purchase. These fees vary based on network congestion and are paid in addition to the NFT price.',
        },
        {
          q: 'Can I resell my NFT?',
          a: 'Yes! Once you own an NFT, you can list it for resale on our marketplace or any other compatible NFT platform. The original artist may receive royalties from secondary sales.',
        },
      ],
    },
    {
      category: 'For Artists',
      questions: [
        {
          q: 'How do I list my artwork?',
          a: 'Artists can upload their digital artwork through our platform. Your work will be stored on IPFS for permanent, decentralized storage. You set your own prices and retain control over your creations.',
        },
        {
          q: 'What file formats are supported?',
          a: 'We support common image formats including JPEG, PNG, GIF, and WEBP. Maximum file size is 5MB per NFT to ensure optimal performance and storage.',
        },
        {
          q: 'Do I earn royalties on resales?',
          a: 'Yes! Smart contracts can be configured to automatically pay you a percentage of all future sales of your NFT. This ensures ongoing compensation for your creative work.',
        },
        {
          q: 'How do I receive payment?',
          a: 'Payments are sent directly to your connected wallet address in ETH. You have full control over your earnings and can withdraw them at any time.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'What blockchain do you use?',
          a: 'Our platform is built on the Ethereum blockchain, leveraging its robust security and widespread adoption. We use ThirdWeb for smart contract management and IPFS for decentralized storage.',
        },
        {
          q: 'How is my NFT stored?',
          a: 'NFT images are stored on IPFS (InterPlanetary File System), a decentralized storage network. This ensures your artwork remains accessible even if our platform goes offline. The blockchain stores ownership records and metadata.',
        },
        {
          q: 'Is my wallet secure?',
          a: 'Your wallet security is your responsibility. We never have access to your private keys. Always keep your seed phrase secure, never share it with anyone, and be cautious of phishing attempts.',
        },
        {
          q: 'What happens if I lose access to my wallet?',
          a: 'If you lose access to your wallet, you lose access to your NFTs. This is why it is crucial to securely backup your wallet seed phrase. We cannot recover lost wallets or transfer NFTs without the private key.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our NFT marketplace
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((section) => (
            <Card key={section.category}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground">
              Contact our support team for personalized assistance
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
