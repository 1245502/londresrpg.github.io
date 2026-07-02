const { loadHTML, fileExists } = require('./helpers');

describe('Links and Accessibility', () => {
  let doc;

  beforeEach(() => {
    doc = loadHTML();
  });

  describe('External Links', () => {
    test('Discord link has correct URL', () => {
      const discordLink = doc.querySelector('a[href*="discord.gg"]');
      expect(discordLink).not.toBeNull();
      expect(discordLink.getAttribute('href')).toBe('https://discord.gg/uvwEt4XX6d');
    });

    test('Discord link opens in new tab', () => {
      const discordLink = doc.querySelector('a[href*="discord.gg"]');
      expect(discordLink.getAttribute('target')).toBe('_blank');
    });

    test('Instagram link has correct URL', () => {
      const instaLink = doc.querySelector('a[href*="instagram.com"]');
      expect(instaLink).not.toBeNull();
      expect(instaLink.getAttribute('href')).toBe('https://www.instagram.com/londres.rpg_samp');
    });

    test('Instagram link opens in new tab', () => {
      const instaLink = doc.querySelector('a[href*="instagram.com"]');
      expect(instaLink.getAttribute('target')).toBe('_blank');
    });

    test('all external links use HTTPS protocol', () => {
      const links = doc.querySelectorAll('a[href^="http"]');
      links.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/^https:\/\//);
      });
    });

    test('social links have the .social class', () => {
      const socialLinks = doc.querySelectorAll('.social');
      expect(socialLinks.length).toBe(2);
    });
  });

  describe('Images', () => {
    test('all images have alt attributes', () => {
      const images = doc.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
        expect(img.getAttribute('alt').trim()).not.toBe('');
      });
    });

    test('Discord icon has descriptive alt text', () => {
      const discordImg = doc.querySelector('a[href*="discord"] img');
      expect(discordImg).not.toBeNull();
      expect(discordImg.getAttribute('alt')).toBe('Discord');
    });

    test('Instagram icon has descriptive alt text', () => {
      const instaImg = doc.querySelector('a[href*="instagram"] img');
      expect(instaImg).not.toBeNull();
      expect(instaImg.getAttribute('alt')).toBe('Instagram');
    });

    test('social icons reference external CDN', () => {
      const images = doc.querySelectorAll('.social img');
      images.forEach(img => {
        expect(img.getAttribute('src')).toContain('cdn.simpleicons.org');
      });
    });
  });

  describe('Accessibility', () => {
    test('document has a main heading (h1)', () => {
      const h1 = doc.querySelector('h1');
      expect(h1).not.toBeNull();
    });

    test('only one h1 exists on the page', () => {
      const h1s = doc.querySelectorAll('h1');
      expect(h1s.length).toBe(1);
    });

    test('heading hierarchy is correct (h1 -> h2)', () => {
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const levels = Array.from(headings).map(h => parseInt(h.tagName[1]));
      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
      }
    });

    test('all h2 elements have text content', () => {
      const h2s = doc.querySelectorAll('h2');
      h2s.forEach(h2 => {
        expect(h2.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    test('page has semantic footer element or class', () => {
      const footer = doc.querySelector('footer') || doc.querySelector('.footer');
      expect(footer).not.toBeNull();
    });

    test('link texts are descriptive (not empty)', () => {
      const links = doc.querySelectorAll('a');
      links.forEach(link => {
        const text = link.textContent.trim();
        const hasImg = link.querySelector('img');
        expect(text.length > 0 || hasImg !== null).toBe(true);
      });
    });
  });

  describe('Asset References', () => {
    test('background image file exists', () => {
      expect(fileExists('image.jpg')).toBe(true);
    });

    test('stylesheet file exists', () => {
      expect(fileExists('style.css')).toBe(true);
    });

    test('index.html file exists', () => {
      expect(fileExists('index.html')).toBe(true);
    });
  });

  describe('SEO Basics', () => {
    test('has a non-empty title', () => {
      const title = doc.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent.trim().length).toBeGreaterThan(0);
    });

    test('has charset defined', () => {
      const charset = doc.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
    });

    test('has viewport meta tag', () => {
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
    });
  });
});
