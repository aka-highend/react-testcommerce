import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverview.container';
import CollectionPageContainer from '../collection/Collection.container';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }
  
  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route 
          exact path={`${match.path}`} 
          component={CollectionsOverviewContainer}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispacthToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispacthToProps)(ShopPage);