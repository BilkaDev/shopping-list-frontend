import ReactDOM from 'react-dom';

import { PortalProps } from '../../UiElements.types';

export function Portal({ children, portalId }: PortalProps) {
  return ReactDOM.createPortal(
    children,
    document.getElementById(portalId) as HTMLElement,
  );
}
