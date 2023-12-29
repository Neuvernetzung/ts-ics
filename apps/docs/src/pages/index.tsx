import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary")}>
      <div className="container">
        <Heading as="h1">{siteConfig.title}</Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/Getting Started"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Home`}
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
