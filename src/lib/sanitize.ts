import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes rich text HTML content on the server side to mitigate XSS vulnerabilities.
 * Configured specifically for academic law faculty CMS articles and announcements.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return "";
  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      "p", "br", "b", "i", "em", "strong", "a", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table",
      "thead", "tbody", "tr", "th", "td", "span", "hr", "img"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "src", "alt", "title", "class", "style"
    ],
  });
}
