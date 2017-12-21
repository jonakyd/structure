// @flow

import { connect } from 'react-redux';
import App from '@components/App/';
import readProducs from '@domains/entities/products/actions'
import { getProducts, getProductsSync } from '@domains/entities/products/selectors';

const mapStateToProps = (state) => ({
  products: getProducts(state),
  // isReading: getProductsSync(state).get('isReading'),
});

const mapDispatchToProps = (dispatch) => ({
  readProducts: () => dispatch(readProducs('START')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
