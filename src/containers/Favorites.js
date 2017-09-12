import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '../components/Grid';
import Gif from '../components/Gif';
import GifActions from './../components/Actions';
import ActionCopy from './../components/Actions/copy';
import ActionFavorite from './../components/Actions/favorite';
import Loading from './../components/Loading';
import { remove as removeFavorite } from './../actions/favorite';

class Favorites extends Component {

  removeFavorite = (id) => () => {
    const favorite = this.props.listById[id];
    this.props.removeFavorite(favorite);
  };

  render() {
    const {
      list ,
      listById,
      isLoading
    } = this.props;

    return (
      <div>
        <section className="results">
          <Loading isLoading={isLoading} />
          <Grid
            isEmpty={!list.length}
            emptyMessage={"No gif added to your favorite yet"}
            isLoading={isLoading}
          >
            {
              list.map(id => (
                <Gif key={id} image={listById[id].images.downsized.url}>
                  <GifActions>
                    <ActionFavorite
                      isFavorite={true}
                      action={this.removeFavorite(id)}
                    />
                    <ActionCopy text={listById[id].bitly_url}/>
                  </GifActions>
                </Gif>
              ))
            }
          </Grid>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeFavorite,
}, dispatch);

const mapStateToProps = state => ({
  listById: state.favorites.listById,
  list: state.favorites.list,
  isLoading: false,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
