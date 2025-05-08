import { Drawer, DrawerContainer, DrawerItem, Header, HeaderLinks, LanguageSelector } from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import i18n from '../../utils/i18n';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Numbers', href: '/' },
  { label: 'Words', href: '/word' },
  { label: 'About', href: '/about' },
  { label: 'Main website', href: 'https://givfnz.com', isExternal: true },
];

export function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Header>
        <Drawer onClick={() => setIsMenuOpen(!isMenuOpen)}></Drawer>
        <a href="#">
          <FontAwesomeIcon icon={faDice} style={{ paddingRight: '7px' }} />
          Giv&apos;s Chooser
        </a>
        <HeaderLinks>
          {navItems.map((item) =>
            item.isExternal ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontWeight: isActive(item.href) ? 'bold' : 'normal',
                }}
              >
                {item.label}
              </Link>
            ),
          )}
          <LanguageSelector onChange={changeLanguage} defaultValue={i18n.language.toLowerCase()}>
            <option value="en-us">English</option>
            <option value="pt-br">Português</option>
          </LanguageSelector>
        </HeaderLinks>
      </Header>
      {isMenuOpen && (
        <DrawerContainer ref={menuRef}>
          {navItems.map((item) => (
            <DrawerItem
              key={item.href}
              href={item.href}
              target={item.isExternal ? '_blank' : undefined}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              style={{
                fontWeight: isActive(item.href) ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </DrawerItem>
          ))}
        </DrawerContainer>
      )}
    </>
  );
}
