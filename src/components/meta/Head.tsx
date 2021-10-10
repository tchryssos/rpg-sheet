import NextHead from 'next/head';

type HeadProps = {
  title: string;
  meta: string;
};

export const Head: React.FC<HeadProps> = ({
  title = 'Character Sheets',
  meta,
}) => (
  <NextHead>
    {/* Uncomment the following lines if using google fonts */}
    {/* <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="use-credentials"
  />
  <link rel="dns-prefetch" href="https://fonts.gstatic.com/" /> */}
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    <meta content={meta} name="description" />
  </NextHead>
);
