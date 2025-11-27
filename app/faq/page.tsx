'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'What is an NFT?',
      answer:
        'An NFT (Non-Fungible Token) is a unique digital asset verified using blockchain technology. Each NFT represents ownership of a specific item, such as digital art, and cannot be replicated or exchanged on a one-to-one basis like cryptocurrencies.',
    },
    {
      question: 'How do I purchase an NFT?',
      answer:
        'To purchase an NFT, you need to connect a compatible Web3 wallet (such as MetaMask) to our platform. Once connected, browse the marketplace, select an NFT, and complete the transaction using cryptocurrency (typically ETH).',
    },
    {
      question: 'What wallets are supported?',
      answer:
        'Our platform integrates with ThirdWeb, supporting a wide range of wallets including MetaMask, WalletConnect, Coinbase Wallet, and more. You can connect your preferred wallet through the ThirdWeb interface.',
    },
    {
      question: 'Where are NFTs stored?',
      answer:
        'NFT metadata and assets are stored on IPFS (InterPlanetary File System), a decentralized storage network. This ensures your NFTs remain accessible and verifiable even if our platform goes offline.',
    },
    {
      question: 'Can I resell my NFT?',
      answer:
        'Yes, NFTs purchased on our platform can be resold. The blockchain records the ownership history, and artists may receive royalties on secondary sales depending on the smart contract terms.',
    },
    {
      question: 'What are gas fees?',
      answer:
        'Gas fees are transaction costs paid to blockchain miners for processing and validating transactions. These fees vary based on network congestion and are paid in addition to the NFT price.',
    },
    {
      question: 'How do I become a featured artist?',
      answer:
        'We curate our marketplace to showcase exceptional digital artists. If you\'re interested in listing your work, please contact us through our Contact page with your portfolio and artist statement.',
    },
    {
      question: 'What is the maximum file size for NFTs?',
      answer:
        'To ensure optimal performance and storage efficiency, we limit NFT file sizes to 5MB. This applies to images, videos, and other digital assets uploaded to the platform.',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions about our NFT marketplace
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
