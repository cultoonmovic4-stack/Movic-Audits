import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import SeoHead from '../../components/common/SeoHead';

export function NotFoundPage() {
  return (
    <>
      <SeoHead title="404 — Page Not Found" robots="noindex, follow" />

      <Section variant="canvas" className="flex-1 flex items-center justify-center">
        <Container className="text-center py-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#513229] mb-2 block">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#231815] mb-4">
            Resource Not Found
          </h1>
          <p className="text-base text-[#584C46] max-w-md mx-auto mb-8">
            The page or media record you requested does not exist or has been moved to another location.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <Button variant="primary">Return Home</Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="secondary">Browse Portfolio</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default NotFoundPage;
