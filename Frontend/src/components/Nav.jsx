import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

export default function Nav() {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Recipe', path: '/recipe'},
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // Implement your search logic here
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3" style={{
        backgroundColor: '#121212',           // Dark background
        boxShadow: '0px 2px 15px rgba(73, 32, 9, 0.7)'  // Accent shadow with logo color #492009
      }}>
        <div className="container d-flex justify-content-between align-items-center">

          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={assets.logo} alt="Open Food Logo" width="140" />
          </Link>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav text-uppercase gap-4">
              {menuItems.map((item, index) => (
                <li
                  className="nav-item position-relative"
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    to={item.path}
                    className="nav-link"
                    style={{
                      color: '#f4f6fc',          // Light text for dark bg
                      position: 'relative',
                      fontSize: '1rem',
                      fontWeight: '500',
                      letterSpacing: '0.5px',
                      paddingBottom: '8px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#492009'}
                    onMouseLeave={e => e.target.style.color = '#f4f6fc'}
                  >
                    {item.name}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '3px',
                        width: hoveredIndex === index ? '100%' : '0',
                        backgroundColor: '#492009',  // Logo color accent underline
                        transition: 'width 0.25s ease-in-out',
                      }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
}
