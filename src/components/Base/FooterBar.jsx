import React from 'react';
import { LocaleConsumer } from '../../contexts/LocaleContext';

function FooterBar() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="footer-bar">
            <p className="text-footer">
              &copy;
              {locale === 'EN'
                ? ' Discussion Forum App. All rights reserved.'
                : ' Aplikasi Forum Diskusi. Seluruh hak cipta dilindungi.'}
            </p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default FooterBar;
