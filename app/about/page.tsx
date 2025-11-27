import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Pioneering the future of digital art ownership
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are dedicated to empowering artists and collectors in the digital age. Our
                platform provides a seamless, secure, and transparent marketplace for discovering,
                trading, and owning unique digital artworks. We believe in the transformative power
                of blockchain technology to revolutionize how art is created, shared, and valued.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading destination for digital art enthusiasts, where creativity
                meets innovation. We envision a world where artists have direct access to global
                audiences, and collectors can confidently invest in authentic, verifiable digital
                masterpieces.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Curated Excellence
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every artwork is carefully selected to ensure quality and authenticity
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Secure Transactions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Blockchain-verified ownership with industry-leading security standards
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Artist Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fair compensation and ongoing royalties for creators
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span> Global Community
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with artists and collectors from around the world
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Built on cutting-edge blockchain infrastructure, our platform leverages:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ThirdWeb integration for seamless wallet connectivity and NFT management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>IPFS decentralized storage ensuring permanent artwork availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Smart contracts for transparent, automated transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Advanced metadata management for comprehensive artwork information</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
