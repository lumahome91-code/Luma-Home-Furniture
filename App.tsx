import { useMemo, useState } from 'react';
import { api } from '@appdeploy/client';
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';

type Category = 'All' | 'Living' | 'Bedroom' | 'Dining' | 'Office' | 'Decor';

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tag?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Mara Lounge Sofa',
    category: 'Living',
    price: 1850,
    oldPrice: 2150,
    rating: 4.9,
    reviews: 128,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
    description:
      'A deep, softly tailored sofa with generous cushions and an easy, relaxed silhouette.',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Noma Oak Dining Table',
    category: 'Dining',
    price: 1240,
    rating: 4.8,
    reviews: 74,
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85',
    description:
      'Solid oak dining table with a sculptural edge and room for memorable gatherings.',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Aster Accent Chair',
    category: 'Living',
    price: 680,
    rating: 4.7,
    reviews: 92,
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85',
    description:
      'A curved statement chair that balances soft upholstery with a crisp architectural frame.',
  },
  {
    id: 4,
    name: 'Sora Platform Bed',
    category: 'Bedroom',
    price: 1490,
    rating: 4.9,
    reviews: 61,
    image: '/resources/bedroom-picture-1.jpg',
    description:
      'Low-profile bedroom furniture designed to bring a calm, grounded feeling to the room.',
    tag: 'New',
  },
  {
    id: 5,
    name: 'Linea Sideboard',
    category: 'Dining',
    price: 980,
    rating: 4.6,
    reviews: 48,
    image:
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85',
    description:
      'Streamlined storage with warm wood grain, soft-close doors and generous internal space.',
  },
  {
    id: 6,
    name: 'Arco Desk',
    category: 'Office',
    price: 760,
    oldPrice: 890,
    rating: 4.8,
    reviews: 36,
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
    description:
      'A clean, focused workspace with a tactile timber top and practical proportions.',
    tag: 'Limited',
  },
  {
    id: 7,
    name: 'Miro Floor Lamp',
    category: 'Decor',
    price: 245,
    rating: 4.7,
    reviews: 113,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85',
    description: 'Warm ambient lighting with a quiet sculptural presence.',
  },
  {
    id: 8,
    name: 'Koa Coffee Table',
    category: 'Living',
    price: 540,
    rating: 4.8,
    reviews: 57,
    image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=85',
    description:
      'Rounded edges and a substantial timber base make this an inviting living-room centrepiece.',
  },
  {
    id: 9,
    name: 'Aurelia Luxe Upholstered Bed',
    category: 'Bedroom',
    price: 2890,
    rating: 4.9,
    reviews: 42,
    image: '/resources/bedroom-picture-2.jpg',
    description:
      'A refined upholstered bed with a generous padded headboard, tailored details and a soft hotel-inspired finish.',
    tag: 'Featured',
  },
  {
    id: 10,
    name: 'Solene Shell Bed',
    category: 'Bedroom',
    price: 3950,
    rating: 5,
    reviews: 27,
    image: '/resources/bedroom-picture-3.jpg',
    description:
      'A dramatic sculptural bed with a fan-shaped headboard and deeply cushioned base for a statement bedroom.',
    tag: 'Signature',
  },
  {
    id: 11,
    name: 'Elara Panel Bed',
    category: 'Bedroom',
    price: 3250,
    rating: 4.9,
    reviews: 35,
    image: '/resources/bedroom-picture-4.jpg',
    description:
      'A sophisticated upholstered frame with layered panels, integrated lighting accents and generous proportions.',
  },
  {
    id: 12,
    name: 'Mira Arch Bed',
    category: 'Bedroom',
    price: 2680,
    rating: 4.8,
    reviews: 31,
    image: '/resources/bedroom-picture-5.jpg',
    description:
      'A soft contemporary bed framed by a bold upholstered headboard and mirrored bedside storage.',
    tag: 'New',
  },
  {
    id: 13,
    name: 'Vela Ivory Bed',
    category: 'Bedroom',
    price: 2990,
    rating: 4.9,
    reviews: 29,
    image: '/resources/bedroom-picture-6.jpg',
    description:
      'A light, elegant upholstered bed with a tall modular headboard and polished bedside details.',
  },
  {
    id: 14,
    name: 'Noir Chevron Bed',
    category: 'Bedroom',
    price: 3450,
    rating: 4.9,
    reviews: 24,
    image: '/resources/bedroom-picture-7.jpg',
    description:
      'A moody luxury bed with a geometric padded headboard, low-profile frame and integrated reading lights.',
    tag: 'New',
  },
  {
    id: 15,
    name: 'Linea Slat Bed',
    category: 'Bedroom',
    price: 3150,
    rating: 4.8,
    reviews: 19,
    image: '/resources/bedroom-picture-8.jpg',
    description:
      'A modern statement bed pairing a tall linear headboard with warm ambient lighting and clean upholstery.',
  },
  {
    id: 16,
    name: 'Alder Woodline Bed',
    category: 'Bedroom',
    price: 2490,
    rating: 4.8,
    reviews: 38,
    image: '/resources/bedroom-picture-9.jpg',
    description:
      'A warm walnut-inspired bed with integrated bedside tables, vertical slat details and subtle lighting.',
  },
  {
    id: 17,
    name: 'Haven Timber Bed',
    category: 'Bedroom',
    price: 2750,
    rating: 4.9,
    reviews: 33,
    image: '/resources/bedroom-picture-10.jpg',
    description:
      'A substantial timber bed with built-in warm lighting and matching nightstands for a complete bedroom look.',
    tag: 'Best seller',
  },
  {
    id: 18,
    name: 'Ashford Grey Marble Dining Set',
    category: 'Dining',
    price: 1850,
    rating: 4.8,
    reviews: 18,
    image: '/resources/dining-table-picture-1.jpg',
    description: 'A spacious grey marble-look dining table paired with soft charcoal upholstered chairs for a modern family dining room.',
    tag: 'New',
  },
  {
    id: 19,
    name: 'Walnut Frame Dining Set',
    category: 'Dining',
    price: 2150,
    rating: 4.9,
    reviews: 16,
    image: '/resources/dining-table-picture-2.jpg',
    description: 'A dark stone-top dining table with warm walnut chair frames and black upholstered seats.',
    tag: 'Featured',
  },
  {
    id: 20,
    name: 'Luxe Marble Eight-Seater',
    category: 'Dining',
    price: 2850,
    rating: 4.9,
    reviews: 14,
    image: '/resources/dining-table-picture-3.jpg',
    description: 'A statement marble dining table with plush tufted chairs and an elegant chandelier-ready look.',
  },
  {
    id: 21,
    name: 'Obsidian Black Dining Set',
    category: 'Dining',
    price: 1690,
    rating: 4.7,
    reviews: 21,
    image: '/resources/dining-table-picture-4.jpg',
    description: 'A sleek black dining table and matching contemporary chairs for a clean, minimalist space.',
  },
  {
    id: 22,
    name: 'Celeste Grey & Gold Dining Set',
    category: 'Dining',
    price: 2490,
    rating: 5,
    reviews: 12,
    image: '/resources/dining-table-picture-5.jpg',
    description: 'A polished stone-look table with grey tufted chairs and gold-tone metal bases for a glamorous dining room.',
    tag: 'Signature',
  },

];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutSending, setCheckoutSending] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const visibleProducts = useMemo(
    () =>
      products.filter(product => {
        const matchesCategory =
          category === 'All' || product.category === category;
        const haystack = product.name.toLowerCase();
        return matchesCategory && haystack.includes(query.toLowerCase());
      }),
    [category, query]
  );

  const addToCart = (product: Product) => {
    setCart(current => [...current, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(current => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const toggleLike = (id: number) => {
    setLiked(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site">
      <div className="announcement">
        Complimentary delivery on orders over $1,000 <span>•</span> Designed for
        living well
      </div>

      <header className="header">
        <button
          className="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>
        <button
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          LUMA<span>HOME</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={scrollToShop}>Shop</button>
          <button
            onClick={() => {
              setCategory('Living');
              scrollToShop();
            }}
          >
            Living
          </button>
          <button
            onClick={() => {
              setCategory('Bedroom');
              scrollToShop();
            }}
          >
            Bedroom
          </button>
          <button
            onClick={() => {
              setCategory('Dining');
              scrollToShop();
            }}
          >
            Dining
          </button>
          <button
            onClick={() => {
              setCategory('Office');
              scrollToShop();
            }}
          >
            Office
          </button>
        </nav>
        <div className="header-actions">
          <button
            aria-label="Search"
            onClick={() => setShowSearch(value => !value)}
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Shopping bag"
            className="bag-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && <span>{cart.length}</span>}
          </button>
        </div>
      </header>

      {showSearch && (
        <div className="search-panel">
          <Search size={19} />
          <input
            autoFocus
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setCategory('All');
            }}
            placeholder="Search furniture..."
            aria-label="Search furniture"
          />
          <button
            onClick={() => {
              setQuery('');
              setShowSearch(false);
            }}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">The new collection / 2026</p>
            <h1>
              Spaces made
              <br />
              <em>to feel.</em>
            </h1>
            <p className="hero-text">
              Thoughtful furniture with natural materials, honest proportions
              and timeless comfort.
            </p>
            <button className="primary-button" onClick={scrollToShop}>
              Explore collection <ArrowRight size={17} />
            </button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90"
              alt="Warm contemporary living room"
            />
            <div className="hero-card">
              <span>01 / 04</span>
              <strong>
                Quiet luxury,
                <br />
                made practical.
              </strong>
            </div>
          </div>
        </section>

        <section className="values">
          <div>
            <span>01</span>
            <strong>Considered materials</strong>
            <p>Oak, linen, wool and stone selected for how they age.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Made to last</strong>
            <p>Timeless forms designed to move with your home.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Delivered with care</strong>
            <p>White-glove delivery available across the country.</p>
          </div>
        </section>

        <section className="shop" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated for you</p>
              <h2>
                Furniture for <em>everyday</em> life.
              </h2>
            </div>
            <button
              className="view-all"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
            >
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div
            className="category-row"
            role="tablist"
            aria-label="Furniture categories"
          >
            {(
              [
                'All',
                'Living',
                'Bedroom',
                'Dining',
                'Office',
                'Decor',
              ] as Category[]
            ).map(item => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
                role="tab"
                aria-selected={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.tag && <span className="tag">{product.tag}</span>}
                  <button
                    className={
                      liked.includes(product.id) ? 'like liked' : 'like'
                    }
                    onClick={() => toggleLike(product.id)}
                    aria-label={
                      liked.includes(product.id)
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        liked.includes(product.id) ? 'currentColor' : 'none'
                      }
                    />
                  </button>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                  >
                    Add to bag
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                  </div>
                  <div className="price-wrap">
                    <strong>{formatPrice(product.price)}</strong>
                    {product.oldPrice && (
                      <del>{formatPrice(product.oldPrice)}</del>
                    )}
                  </div>
                </div>
                <div className="rating">
                  <Star size={13} fill="currentColor" /> {product.rating}{' '}
                  <span>({product.reviews})</span>
                  <button onClick={() => setSelected(product)}>Details</button>
                </div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <div className="empty-state">
              <h3>No pieces found.</h3>
              <p>Try another search or browse the full collection.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
              >
                Reset collection
              </button>
            </div>
          )}
        </section>

        <section className="editorial">
          <div className="editorial-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
              alt="Minimal dining room"
              loading="lazy"
            />
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">The Luma approach</p>
            <h2>
              Less, but <em>better.</em>
            </h2>
            <p>
              We believe the pieces around you should earn their place. Our
              collection is edited around comfort, craftsmanship and the simple
              pleasure of coming home.
            </p>
            <button className="text-button" onClick={scrollToShop}>
              Discover our collection <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="reviews">
          <p className="eyebrow">Loved at home</p>
          <h2>
            “The sofa is even better
            <br />
            <em>in real life.</em>”
          </h2>
          <div className="review-meta">
            <div className="stars">★★★★★</div>
            <span>— Amara K., verified customer</span>
          </div>
        </section>

        <section className="newsletter">
          <div>
            <p className="eyebrow">Stay in the know</p>
            <h2>
              Good things for
              <br />
              <em>your home.</em>
            </h2>
          </div>
          <div className="newsletter-form">
            <input
              aria-label="Email address"
              placeholder="Your email address"
              type="email"
            />
            <button onClick={() => alert('Thanks for joining the Luma list.')}>
              Join the list <ArrowRight size={16} />
            </button>
            <small>
              New collections, thoughtful interiors and occasional offers.
            </small>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <button className="logo">
            LUMA<span>HOME</span>
          </button>
          <p>Furniture for the way you live.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Shop</strong>
            <button onClick={scrollToShop}>All furniture</button>
            <button
              onClick={() => {
                setCategory('Living');
                scrollToShop();
              }}
            >
              Living
            </button>
            <button
              onClick={() => {
                setCategory('Bedroom');
                scrollToShop();
              }}
            >
              Bedroom
            </button>
          </div>
          <div>
            <strong>About</strong>
            <button>Our story</button>
            <button>Materials</button>
            <button>Journal</button>
          </div>
          <div>
            <strong>Help</strong>
            <button>Delivery</button>
            <button>Returns</button>
            <a
              href="mailto:lumahome91@gmail.com"
              style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginTop: '0.5rem' }}
            >
              lumahome91@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Luma Home</span>
          <span>Made for modern living.</span>
        </div>
      </footer>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="mobile-drawer"
            onClick={event => event.stopPropagation()}
          >
            <button className="drawer-close" onClick={() => setMenuOpen(false)}>
              <X />
            </button>
            <button onClick={scrollToShop}>Shop all</button>
            {(
              ['Living', 'Bedroom', 'Dining', 'Office', 'Decor'] as Category[]
            ).map(item => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  scrollToShop();
                }}
              >
                {item}
              </button>
            ))}
          </aside>
        </div>
      )}

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <X />
            </button>
            <img src={selected.image} alt={selected.name} />
            <div className="modal-copy">
              <span className="product-category">{selected.category}</span>
              <h2>{selected.name}</h2>
              <div className="modal-rating">
                <Star size={14} fill="currentColor" /> {selected.rating} ·{' '}
                {selected.reviews} reviews
              </div>
              <p>{selected.description}</p>
              <strong>{formatPrice(selected.price)}</strong>
              <button
                className="primary-button"
                onClick={() => {
                  addToCart(selected);
                  setSelected(null);
                }}
              >
                Add to bag <ShoppingBag size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay" onClick={() => setCheckoutOpen(false)}>
          <div
            className="modal"
            onClick={event => event.stopPropagation()}
            style={{ maxWidth: '620px' }}
          >
            <button className="modal-close" onClick={() => setCheckoutOpen(false)}>
              <X />
            </button>
            <div className="modal-copy" style={{ width: '100%' }}>
              <span className="product-category">Secure order request</span>
              <h2>Complete your order</h2>
              <p>
                Enter your details and your order request will be prepared for
                Luma Home at <strong>lumahome91@gmail.com</strong>.
              </p>
              {checkoutSuccess ? (
                <div style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
                  <p><strong>Order request sent.</strong> Thank you. Luma Home will contact you shortly to confirm your order and delivery.</p>
                  <button className="primary-button" type="button" onClick={() => { setCheckoutOpen(false); setCheckoutSuccess(false); }}>
                    Continue shopping <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
              <form
                onSubmit={async event => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const data = new FormData(form);
                  const items = cart
                    .map(item => item.name)
                    .join(', ');
                  const total = formatPrice(
                    cart.reduce((sum, item) => sum + item.price, 0)
                  );
                  setCheckoutSending(true);
                  setCheckoutError('');
                  try {
                    const response = await api.post('/api/orders', {
                      name: String(data.get('name') || ''),
                      email: String(data.get('email') || ''),
                      phone: String(data.get('phone') || ''),
                      address: String(data.get('address') || ''),
                      items: cart.map(item => ({
                        name: item.name,
                        price: item.price,
                      })),
                      total: cart.reduce((sum, item) => sum + item.price, 0),
                    });
                    if (!response.data?.success) {
                      throw new Error(response.data?.error || 'Order could not be sent.');
                    }
                    setCheckoutSuccess(true);
                    setCart([]);
                  } catch (error) {
                    setCheckoutError(
                      error instanceof Error
                        ? error.message
                        : 'We could not send your order. Please try again.'
                    );
                  } finally {
                    setCheckoutSending(false);
                  }
                }}
                style={{ display: 'grid', gap: '12px', marginTop: '18px' }}
              >
                <input name="name" required placeholder="Full name" aria-label="Full name" style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input name="email" required type="email" placeholder="Email address" aria-label="Email address" style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px' }} />
                <textarea name="address" required placeholder="Delivery address" aria-label="Delivery address" rows={4} style={{ padding: '14px', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }} />
                {checkoutError && <p role="alert" style={{ margin: 0, color: '#9b2c2c' }}>{checkoutError}</p>}
                <button className="primary-button" type="submit" disabled={checkoutSending}>
                  {checkoutSending ? 'Sending order...' : 'Send order request'}
                  {!checkoutSending && <ArrowRight size={17} />}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={event => event.stopPropagation()}
          >
            <div className="cart-head">
              <h2>
                Your bag <span>{cart.length}</span>
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">
                <X />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={32} />
                <h3>Your bag is waiting.</h3>
                <p>Add a piece you love and it will appear here.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToShop();
                  }}
                >
                  Browse furniture
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{formatPrice(item.price)}</span>
                        <button onClick={() => removeFromCart(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>
                    {formatPrice(
                      cart.reduce((sum, item) => sum + item.price, 0)
                    )}
                  </strong>
                </div>
                <button
                  className="checkout"
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                >
                  Proceed to checkout <ArrowRight size={17} />
                </button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;