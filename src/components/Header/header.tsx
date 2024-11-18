import { Header } from "./header"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDice } from '@fortawesome/free-solid-svg-icons';
export function HeaderComponent(){
  return (
    <Header>
      <a
        href="#"
        style={{color: "white", textDecoration: "none"}}
      >
        <FontAwesomeIcon
          icon={faDice}
          style={{paddingRight: "7px"}}
        />
        Giv's Shuffler
      </a>
    </Header>
    )
}