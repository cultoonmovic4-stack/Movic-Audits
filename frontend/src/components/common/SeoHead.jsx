import { useEffect } from 'react';

export function SeoHead({
  title,
  description = 'Movic Audits — Professional visual production, photography, and cinematic videography.',
  robots = 'index, follow',
}) {
  useEffect(() => {
    const formattedTitle = title
      ? `${title} — Movic Audits`
      : 'Movic Audits — Visual Production & Media Agency';
    document.title = formattedTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = robots;
  }, [title, description, robots]);

  return null;
}

export default SeoHead;
