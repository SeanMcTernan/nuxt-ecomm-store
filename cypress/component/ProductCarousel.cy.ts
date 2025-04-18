import ProductCarousel from '../../components/ProductCarousel.vue';

describe('ProductCarousel', () => {
  const mockProducts = [
    {
      id: '1',
      title: 'Test Product',
      price: 99.99,
      image: 'test-image.jpg',
      link: '/products/test-product',
    },
  ];

  it('renders with products', () => {
    cy.mount(ProductCarousel, {
      props: {
        title: 'Test Carousel',
        products: mockProducts,
      },
    });

    cy.contains('Test Carousel').should('be.visible');
    cy.contains('Test Product').should('be.visible');
    cy.contains('$99.99').should('be.visible');
  });

  it('has working navigation buttons', () => {
    cy.mount(ProductCarousel, {
      props: {
        title: 'Test Carousel',
        products: mockProducts,
      },
    });

    cy.get('button[aria-label="Scroll products left"]').should('be.visible');
    cy.get('button[aria-label="Scroll products right"]').should('be.visible');
  });
});
