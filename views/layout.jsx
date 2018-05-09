import React from 'react';
import { Header, Jumbotron, Footer } from 'watson-react-components';

// eslint-disable-next-line
const DESCRIPTION = 'Learn more about which companies have been affected by which cyber breaches';
const TITLE = 'Watson Discovery - Data Breach Analysis';

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content={TITLE} />
        <meta name="og:description" content={DESCRIPTION} />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="stylesheet" href="/css/watson-react-components.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {/* IBM Cloud Analytics - begin*/}
        <script type="text/javascript">{`
          window._analytics = { coremetrics: false, optimizely: false, addRoll: false };
        `}</script>
        <meta name="segment" property="watson-demos" value="watson-cognitive-security" />
        <script src={props.bluemixAnalytics} />
        {/* IBM Cloud Analytics  - end*/}
      </head>
      <body>
        <Header
          mainBreadcrumbs="Discovery"
          mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
          subBreadcrumbs={TITLE}
          subBreadcrumbsUrl="/"
        />
        <Jumbotron
          serviceName={TITLE}
          repository="https://github.com/IBM/watson-discovery-analyze-data-breaches"
          documentation="http://www.ibm.com/watson/developercloud/doc/discovery/index.html"
          apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
          startInIBM Cloud="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
          version="GA"
          description={DESCRIPTION}
        />
        <div id="root">
          {props.children}
        </div>
        <div style={{ marginTop: '0rem' }}>
          <Footer />
        </div>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        <script type="text/javascript" src="js/bundle.js" />
        <script type="text/javascript" src="js/ga.js" />
      </body>
    </html>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired,
  bluemixAnalytics: React.PropTypes.string,
};

export default Layout;
