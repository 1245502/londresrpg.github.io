const { loadCSS, fileExists } = require('./helpers');

describe('CSS Validation', () => {
  let css;

  beforeAll(() => {
    css = loadCSS();
  });

  describe('File Integrity', () => {
    test('style.css file exists', () => {
      expect(fileExists('style.css')).toBe(true);
    });

    test('CSS is not empty', () => {
      expect(css.trim().length).toBeGreaterThan(0);
    });

    test('has balanced curly braces', () => {
      const openCount = (css.match(/{/g) || []).length;
      const closeCount = (css.match(/}/g) || []).length;
      expect(openCount).toBe(closeCount);
    });
  });

  describe('Reset Styles', () => {
    test('has universal box-sizing reset', () => {
      expect(css).toContain('box-sizing: border-box');
    });

    test('resets margin and padding', () => {
      expect(css).toContain('margin: 0');
      expect(css).toContain('padding: 0');
    });
  });

  describe('Body Styles', () => {
    test('sets font-family', () => {
      expect(css).toContain('font-family:');
    });

    test('has background image setup', () => {
      expect(css).toContain('background-size: cover');
      expect(css).toContain('background-position: center');
      expect(css).toContain('background-repeat: no-repeat');
    });

    test('references image.jpg as background', () => {
      expect(css).toContain('url("image.jpg")');
    });

    test('sets minimum height to 100vh', () => {
      expect(css).toContain('min-height: 100vh');
    });
  });

  describe('Layout Styles', () => {
    test('container has max-width', () => {
      expect(css).toContain('max-width: 900px');
    });

    test('grid uses CSS Grid display', () => {
      expect(css).toContain('display: grid');
    });

    test('grid has gap defined', () => {
      expect(css).toContain('gap: 20px');
    });
  });

  describe('Box Styles', () => {
    test('boxes have border-radius', () => {
      expect(css).toContain('border-radius: 15px');
    });

    test('boxes have backdrop-filter blur', () => {
      expect(css).toContain('backdrop-filter: blur(5px)');
    });

    test('boxes have neon green border', () => {
      expect(css).toContain('border: 1px solid rgba(0,255,136,0.4)');
    });
  });

  describe('Typography', () => {
    test('title uses clamp for responsive font size', () => {
      expect(css).toContain('font-size: clamp(26px, 5vw, 42px)');
    });

    test('h2 uses clamp for responsive font size', () => {
      expect(css).toContain('font-size: clamp(18px, 4vw, 24px)');
    });

    test('paragraphs use clamp for responsive font size', () => {
      expect(css).toContain('font-size: clamp(14px, 3.5vw, 16px)');
    });

    test('uses neon green color (#00ff88)', () => {
      expect(css).toContain('#00ff88');
    });

    test('text has neon glow effect via text-shadow', () => {
      expect(css).toContain('text-shadow');
    });
  });

  describe('Responsive Design', () => {
    test('has mobile media query for max-width 480px', () => {
      expect(css).toContain('@media (max-width: 480px)');
    });
  });

  describe('Social Links', () => {
    test('social links use flexbox column layout', () => {
      const socialSection = css.substring(
        css.indexOf('.social-links'),
        css.indexOf('.social-links') + 200
      );
      expect(socialSection).toContain('display: flex');
      expect(socialSection).toContain('flex-direction: column');
    });

    test('social icons have fixed dimensions', () => {
      expect(css).toContain('width: 22px');
      expect(css).toContain('height: 22px');
    });
  });

  describe('Footer Styles', () => {
    test('footer has top border', () => {
      expect(css).toContain('border-top: 1px solid rgba(0,255,136,');
    });

    test('footer has glow animation', () => {
      expect(css).toContain('@keyframes glowFooter');
      expect(css).toContain('animation: glowFooter');
    });
  });

  describe('Color Scheme Consistency', () => {
    test('primary neon green (#00ff88) is used throughout', () => {
      const matches = css.match(/#00ff88/g) || [];
      expect(matches.length).toBeGreaterThan(5);
    });

    test('text color uses light green (#d0ffe9) for readability', () => {
      expect(css).toContain('#d0ffe9');
    });
  });
});
