import { Portal } from '../common';
import { BackdropProps, PORTAL_IDS } from '../../UiElements.types';

import './Backdrop.css';

export const Backdrop = ({ onClick }: BackdropProps) => {
  return (
    <Portal portalId={PORTAL_IDS.backdropHook}>
      <div className="Backdrop" onClick={onClick}></div>
    </Portal>
  );
};
