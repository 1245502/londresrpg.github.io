const { loadHTML, fileExists } = require('./helpers');

describe('HTML Structure', () => {
  let doc;

  beforeEach(() => {
    doc = loadHTML();
  });

  describe('Document Head', () => {
    test('has correct DOCTYPE declaration', () => {
      const html = require('fs').readFileSync(
        require('path').resolve(__dirname, '..', 'index.html'),
        'utf-8'
      );
      expect(html.trim().startsWith('<!DOCTYPE html>')).toBe(true);
    });

    test('has lang attribute set to pt-BR', () => {
      const htmlElement = doc.querySelector('html');
      expect(htmlElement).not.toBeNull();
      expect(htmlElement.getAttribute('lang')).toBe('pt-BR');
    });

    test('has UTF-8 charset meta tag', () => {
      const meta = doc.querySelector('meta[charset]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('charset')).toBe('UTF-8');
    });

    test('has viewport meta tag for mobile responsiveness', () => {
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      const content = viewport.getAttribute('content');
      expect(content).toContain('width=device-width');
      expect(content).toContain('initial-scale=1.0');
    });

    test('has a title element with correct content', () => {
      const title = doc.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe('Londres RPG');
    });

    test('links to style.css stylesheet', () => {
      const link = doc.querySelector('link[rel="stylesheet"]');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toBe('style.css');
    });
  });

  describe('Main Content Structure', () => {
    test('has a container div', () => {
      const container = doc.querySelector('.container');
      expect(container).not.toBeNull();
    });

    test('has the main title "LONDRES RPG"', () => {
      const titulo = doc.querySelector('.titulo');
      expect(titulo).not.toBeNull();
      expect(titulo.textContent).toBe('LONDRES RPG');
      expect(titulo.tagName).toBe('H1');
    });

    test('has a grid layout with boxes', () => {
      const grid = doc.querySelector('.grid');
      expect(grid).not.toBeNull();
      const boxes = grid.querySelectorAll('.box');
      expect(boxes.length).toBe(3);
    });
  });

  describe('Server Info Section', () => {
    test('has "Sobre o Servidor" section with correct heading', () => {
      const boxes = doc.querySelectorAll('.box');
      const aboutBox = boxes[0];
      const heading = aboutBox.querySelector('h2');
      expect(heading.textContent).toBe('Sobre o Servidor');
    });

    test('has a feature list with 5 items', () => {
      const ul = doc.querySelector('ul');
      expect(ul).not.toBeNull();
      const items = ul.querySelectorAll('li');
      expect(items.length).toBe(5);
    });

    test('feature list contains expected items', () => {
      const items = doc.querySelectorAll('ul li');
      const texts = Array.from(items).map(li => li.textContent.trim());
      expect(texts).toContain('Criar ou entrar em uma família');
      expect(texts).toContain('Construir sua própria história');
      expect(texts).toContain('Comprar carros e casas');
      expect(texts).toContain('Conquistar territórios');
      expect(texts).toContain('Se tornar líder');
    });
  });

  describe('Connection Section', () => {
    test('has "Conectar no Servidor" section', () => {
      const boxes = doc.querySelectorAll('.box');
      const connectBox = boxes[1];
      const heading = connectBox.querySelector('h2');
      expect(heading.textContent).toBe('Conectar no Servidor');
    });

    test('displays server IP address', () => {
      const boxes = doc.querySelectorAll('.box');
      const connectBox = boxes[1];
      const ipText = connectBox.querySelector('p');
      expect(ipText.textContent).toContain('181.215.45.74:7015');
    });

    test('has social links container', () => {
      const socialLinks = doc.querySelector('.social-links');
      expect(socialLinks).not.toBeNull();
    });
  });

  describe('Administration Section', () => {
    test('has "Administração" section', () => {
      const boxes = doc.querySelectorAll('.box');
      const adminBox = boxes[2];
      const heading = adminBox.querySelector('h2');
      expect(heading.textContent).toBe('Administração');
    });

    test('displays founder info', () => {
      const boxes = doc.querySelectorAll('.box');
      const adminBox = boxes[2];
      const paragraphs = adminBox.querySelectorAll('p');
      const texts = Array.from(paragraphs).map(p => p.textContent);
      expect(texts.some(t => t.includes('jack_lopes_ofc'))).toBe(true);
    });

    test('displays sub-founder info', () => {
      const boxes = doc.querySelectorAll('.box');
      const adminBox = boxes[2];
      const paragraphs = adminBox.querySelectorAll('p');
      const texts = Array.from(paragraphs).map(p => p.textContent);
      expect(texts.some(t => t.includes('samurai059310'))).toBe(true);
    });
  });

  describe('Footer', () => {
    test('has a footer element', () => {
      const footer = doc.querySelector('.footer');
      expect(footer).not.toBeNull();
    });

    test('footer contains copyright text', () => {
      const footer = doc.querySelector('.footer');
      expect(footer.textContent).toContain('Jeremias 2026');
      expect(footer.textContent).toContain('Todos os direitos reservados');
    });
  });
});
