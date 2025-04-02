import { Header, HeaderLinks } from "./header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
export function HeaderComponent() {
  return (
    <Header>
      <a
        href="#"
        style={{ color: "white", textDecoration: "none" }}
      >
        <FontAwesomeIcon
          icon={faDice} 
          style={{ paddingRight: "7px" }}
        />
        Giv's Shuffler
      </a>
      <HeaderLinks>
        <Link to="/">Numbers</Link>
        <Link to="/word">Words</Link>
        <a href="https://givfnz.com" target="_blank" rel="noopener noreferrer">Main website</a>
      </HeaderLinks>
    </Header>
  )
}