import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7uiwbqz6q8lc/conv-7uja2c23lczk/20251127/file-7ujeylhhucjk.png"
              alt="Digital Original"
              className="h-8 mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Discover, collect, and trade extraordinary NFTs from talented artists worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/marketplace" className="hover:text-primary transition-colors">
                  Browse NFTs
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-primary transition-colors">
                  Featured Artists
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-primary transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{currentYear} NFT Marketplace</p>
        </div>
      </div>
    </footer>
  );
}
