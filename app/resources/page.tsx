import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Video, FileText, Code } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      category: 'Getting Started',
      icon: BookOpen,
      items: [
        {
          title: 'What is an NFT?',
          description: 'Learn the basics of non-fungible tokens and digital ownership',
          link: '#',
        },
        {
          title: 'Setting Up Your Wallet',
          description: 'Step-by-step guide to connecting your crypto wallet',
          link: '#',
        },
        {
          title: 'Buying Your First NFT',
          description: 'Complete walkthrough of the purchase process',
          link: '#',
        },
      ],
    },
    {
      category: 'For Artists',
      icon: Code,
      items: [
        {
          title: 'Minting Guide',
          description: 'How to create and list your digital artwork as an NFT',
          link: '#',
        },
        {
          title: 'Pricing Strategies',
          description: 'Best practices for pricing your digital art',
          link: '#',
        },
        {
          title: 'Marketing Your Work',
          description: 'Tips for promoting your NFTs and building an audience',
          link: '#',
        },
      ],
    },
    {
      category: 'Video Tutorials',
      icon: Video,
      items: [
        {
          title: 'Platform Overview',
          description: 'Complete tour of the marketplace features',
          link: '#',
        },
        {
          title: 'Wallet Security',
          description: 'Protecting your digital assets and private keys',
          link: '#',
        },
        {
          title: 'Understanding Gas Fees',
          description: 'What they are and how to optimize transaction costs',
          link: '#',
        },
      ],
    },
    {
      category: 'Documentation',
      icon: FileText,
      items: [
        {
          title: 'API Documentation',
          description: 'Technical documentation for developers and integrations',
          link: '#',
        },
        {
          title: 'Smart Contract Details',
          description: 'Information about our blockchain infrastructure',
          link: '#',
        },
        {
          title: 'Terms of Service',
          description: 'Legal terms and conditions for using the platform',
          link: '#',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about NFTs and our platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {resources.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to assist you with any questions
            </p>
            <Button size="lg">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
