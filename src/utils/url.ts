/**
 * Returns the base URL path for internal links.
 * When deployed to GitHub Pages under a subdirectory, this ensures
 * all links work correctly.
 *
 * Usage: href={url('/blog/')}
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path since base already ends with /
  const cleanPath = path.replace(/^\//, '');
  return `${base}${cleanPath}`;
}
