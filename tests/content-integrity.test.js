const { loadHTML, loadCSS } = require('./helpers');
const fs = require('fs');
const path = require('path');

describe('Content Integrity', () => {
  let doc;

  beforeEach(() => {
    doc = loadHTML();
  });

  describe('Server Information Accuracy', () => {
    test('server IP format is valid (IPv4 with port)', () => {
      const content = doc.body.textContent;
      const ipPortRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/;
      expect(content).toMatch(ipPortRegex);
    });

    test('server name "Londres RPG" appears in content', () => {
      const content = doc.body.textContent;
      expect(content).toContain('Londres RPG');
    });

    test('page mentions SA-MP', () => {
      const content = doc.body.textContent;
      expect(content).toContain('SA-MP');
    });
  });

  describe('HTML Validity', () => {
    test('no duplicate IDs in the document', () => {
      const allElements = doc.querySelectorAll('[id]');
      const ids = Array.from(allElements).map(el => el.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    test('all links have href attributes', () => {
      const links = doc.querySelectorAll('a');
      links.forEach(link => {
        expect(link.hasAttribute('href')).toBe(true);
        expect(link.getAttribute('href').trim()).not.toBe('');
      });
    });

    test('no broken internal stylesheet references', () => {
      const styleLinks = doc.querySelectorAll('link[rel="stylesheet"]');
      styleLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http')) {
          const filePath = path.resolve(__dirname, '..', href);
          expect(fs.existsSync(filePath)).toBe(true);
        }
      });
    });
  });

  describe('Content Completeness', () => {
    test('has at least 3 content sections', () => {
      const boxes = doc.querySelectorAll('.box');
      expect(boxes.length).toBeGreaterThanOrEqual(3);
    });

    test('each section has a heading', () => {
      const boxes = doc.querySelectorAll('.box');
      boxes.forEach(box => {
        const heading = box.querySelector('h2');
        expect(heading).not.toBeNull();
      });
    });

    test('each section has paragraph content', () => {
      const boxes = doc.querySelectorAll('.box');
      boxes.forEach(box => {
        const paragraphs = box.querySelectorAll('p');
        expect(paragraphs.length).toBeGreaterThan(0);
      });
    });

    test('social media section has exactly 2 links', () => {
      const socialLinks = doc.querySelectorAll('.social-links .social');
      expect(socialLinks.length).toBe(2);
    });
  });

  describe('CSS-HTML Integration', () => {
    test('all CSS classes used in HTML exist in the stylesheet', () => {
      const css = loadCSS();
      const classesInHTML = new Set();

      doc.querySelectorAll('[class]').forEach(el => {
        el.classList.forEach(cls => classesInHTML.add(cls));
      });

      const expectedClasses = ['container', 'titulo', 'grid', 'box', 'social-links', 'social', 'footer'];
      expectedClasses.forEach(cls => {
        expect(css).toContain(`.${cls}`);
      });
    });

    test('background image referenced in CSS exists on disk', () => {
      const css = loadCSS();
      const urlMatch = css.match(/url\("([^"]+)"\)/);
      if (urlMatch) {
        const imageFile = urlMatch[1];
        const imagePath = path.resolve(__dirname, '..', imageFile);
        expect(fs.existsSync(imagePath)).toBe(true);
      }
    });
  });

  describe('Text Content Quality', () => {
    test('no placeholder text (lorem ipsum) exists', () => {
      const content = doc.body.textContent.toLowerCase();
      expect(content).not.toContain('lorem ipsum');
      expect(content).not.toContain('placeholder');
    });

    test('copyright year is current (2026)', () => {
      const footer = doc.querySelector('.footer');
      expect(footer.textContent).toContain('2026');
    });

    test('no empty paragraphs', () => {
      const paragraphs = doc.querySelectorAll('p');
      paragraphs.forEach(p => {
        expect(p.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
