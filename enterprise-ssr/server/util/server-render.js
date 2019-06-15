const serialize = require('serialize-javascript');
const ejs = require('ejs');
const asyncBootstrap = require('react-async-bootstrapper');
const ReactDomServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
      result[storeName] = stores[storeName].toJson()
      return result
    }, {})
}

module.exports = (bundle, template, req, res) => {
    return new Promise((resolve, reject) => {
        const createStoreMap = bundle.createStoreMap;
        const creatApp = bundle.default;
        const routerContext = {};
        const stores = createStoreMap();
        const app = creatApp(stores, routerContext, req.url);

        // 在这里调查了好久，store一直不能传递到jsx里面，
        // 通过asyncBootstrap的第三个参数，把stores放到上下文里面才能在Client端取到
        asyncBootstrap(app, undefined, stores).then(() => {
            if (routerContext.url) {
              res.status(302).setHeader('Location', routerContext.url)
              res.end()
              return
            }
            const helmet = Helmet.rewind()
            const state = getStoreState(stores)
            const content = ReactDomServer.renderToString(app)

            const html = ejs.render(template, {
              appString: content,
              initialState: serialize(state),
              meta: helmet.meta.toString(),
              title: helmet.title.toString(),
              style: helmet.style.toString(),
              link: helmet.link.toString()
            })
            res.send(html)
            resolve()
          }).catch(reject)
        });
};
