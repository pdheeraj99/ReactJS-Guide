import React from 'react';

/*
  NOTE: Ee meta tags ni chudataniki, meeru browser's "View Page Source"
  or "Inspect Element" tool use chesi, <head> section ni check cheyyali.
  React veetini automatic ga akkada place chesthundi.
*/

// Example 1: Setting basic SEO and document metadata
function SeoMetaTags() {
  return (
    <>
      {/*
        Common meta tags for search engines and browser behavior.
        'charset' should always be 'utf-8'.
        'viewport' is crucial for responsive design on mobile devices.
      */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="This is an example page demonstrating how to use meta tags in React." />
      <meta name="keywords" content="react, meta, seo, javascript" />
      <meta name="author" content="Juice Maker" />
    </>
  );
}

// Example 2: Setting social media (Open Graph) tags for a blog post
function SocialMediaMetaTags() {
  const post = {
    title: 'My Awesome React Blog Post',
    description: 'Learn how React makes it easy to manage document metadata.',
    imageUrl: 'https://example.com/images/react-post-banner.png',
    url: 'https://example.com/blog/awesome-post'
  };

  return (
    <>
      {/*
        Open Graph (og) tags control how your page looks when shared on social media
        like Facebook, Twitter, LinkedIn, etc.
      */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:image" content={post.imageUrl} />
      <meta property="og:url" content={post.url} />
      <meta property="og:type" content="article" />
    </>
  );
}


export default function MetaExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };
  const exampleBoxStyles = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyles}>
      {/*
        These meta tags will be applied to the whole page because they are
        rendered here at the top level.
      */}
      <SeoMetaTags />

      <h1>&lt;meta&gt; Component Examples</h1>

      <div style={exampleBoxStyles}>
        <h3>Usage: SEO and Document Metadata ✅</h3>
        <p>
          This entire page has metadata for SEO and viewport settings.
          Right-click and "View Page Source" to see them in the `&lt;head&gt;`.
        </p>
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Social Media (Open Graph) Tags ✅</h3>
        {/*
          Imagine this is a specific blog post component. It renders its own meta tags.
          If a description meta tag was already rendered by SeoMetaTags, React might
          override it or render both depending on the exact props.
          Managing conflicting meta tags is an advanced topic.
        */}
        <SocialMediaMetaTags />
        <p>
          This component adds social media sharing tags to the `&lt;head&gt;`.
          If you shared this page on Facebook, it would use this title and description.
        </p>
      </div>
    </div>
  );
}