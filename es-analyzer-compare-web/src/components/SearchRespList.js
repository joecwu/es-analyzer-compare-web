import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  Button,
  Form,
  FormGroup,
  Image,
  FormControl,
  Table,
  Panel,
  ListGroup,
  ListGroupItem,
  Badge,
  Tooltip,
  OverlayTrigger,
  Popover,
  ButtonToolbar
} from 'react-bootstrap';
import es_type_helper from '../utils/kks_es_type_helper';
import DateTime from '../components/DateTime';

var PropTypes = require('prop-types');

class SearchRespList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      refresh: props.refresh,
      title: props.title,
      respObj: { items: [], took: 0, total: 0 },
      searchIndex: props.searchIndex,
      keyword: props.keyword,
      searchTemplate: props.searchTemplate,
      pageSize: props.pageSize,
      is_loading: false,
    };
    this.fetchItemsFromServer = this.fetchItemsFromServer.bind(this);
  }

  fetchItemsFromServer() {
    console.log('fetchItemsFromServer');
    this.setState({ ['is_loading']: true, ['respObj']: { items: [], took: 0, total: 0 } });
    var requestBody = JSON.stringify({
      id: this.state.searchTemplate,
      params: {
        keyword: this.state.keyword,
        size: this.state.pageSize,
      },
    });
    console.debug(requestBody);
    window
      .fetch(CONFIG.es.search_url.host + this.state.searchIndex + '/_search/template', {
        method: 'POST',
        headers: {
          //   Authorization: CONFIG.es.authorization,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })
      .then(response => response.json())
      .then(esResponse => this.convertToItems(esResponse))
      .catch(error => console.error(error))
      .then(() => this.setState({ ['is_loading']: false }));
  }

  componentWillReceiveProps(props) {
    console.debug('componentWillReceiveProps - ' + props.keyword);
    // const { keyword, id } = this.props;
    if (props.refresh != this.props.refresh) {
      this.setState({ ['keyword']: props.keyword }, () => {
        this.fetchItemsFromServer();
      });
    }
  }

  componentDidMount() {
    // this.fetchItemsFromServer();
  }

  convertToItems(esResponse) {
    var items = [];
    esResponse.hits.hits.map(hitItem => {
      // merge all artist names
      if(hitItem._type == 'playlist') {
        items.push(es_type_helper.extractPlaylistItem(hitItem));
      }else if(hitItem._type == 'song') {
        items.push(es_type_helper.extractSongItem(hitItem));
      }else if(hitItem._type == 'artist') {
        items.push(es_type_helper.extractArtistItem(hitItem));
      }else {
        console.error('unsupported item type', hitITem._type);
      }
    });
    console.debug('search result items.', items);
    this.setState({
      ['respObj']: {
        items: items,
        took: esResponse.took,
        total: esResponse.hits.total,
      },
    });
  }

  render() {
    const tooltip = (content) => {
        return (<Tooltip id="tooltip">
          {content}
        </Tooltip>)
      };
      const popover = (popoverItem) => {
        return (<Popover id="popover-trigger-focus" title={popoverItem.title + ' (' + popoverItem.count + ')'}>
          {popoverItem.content}
        </Popover>)
      };
      const buttonToolbar = (item) => {
        if(typeof item.popover1 === 'undefined') {
          return <div />;
        } else {
          return (
            <ButtonToolbar>
              <OverlayTrigger trigger="focus" placement="bottom" overlay={popover(item.popover1)}>
                <Button bsStyle="info" size="xs" bsClass="btn btn-info btn-xs" style={{margin:"2px"}}>{item.popover1.title}</Button>
              </OverlayTrigger>
              <OverlayTrigger trigger="focus" placement="bottom" overlay={popover(item.popover2)}>
                <Button bsStyle="info" size="xs" bsClass="btn btn-info btn-xs" style={{margin:"2px"}}>{item.popover2.title}</Button>
              </OverlayTrigger>
            </ButtonToolbar>
          )
        }
      }
    const rows = this.state.respObj.items.map(item => (
      /*jshint ignore:start*/
      <div key={item._id} style={{marginBottom: "3px"}}>
        <Badge>{item.score}</Badge>
        <Badge bsClass={'badge popularity'}>{item.popularity}</Badge>
        {buttonToolbar(item)}
        {/* <OverlayTrigger placement="right" overlay={tooltip(item.tooltip)}> */}
        <ListGroupItem header={item.title}>{item.content}</ListGroupItem>
        {/* </OverlayTrigger> */}
        <DateTime value={item.createdAt} timeZone='Asia/Tokyo' />
      </div>
      /*jshint ignore:end*/
    ));
    /*jshint ignore:start*/
    return (
      <div>
        <Panel bsStyle="success" style={{ margin: '0px', padding: '0px' }}>
          <Panel.Heading>
            <Panel.Title componentClass="h4">{this.state.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Image
            src="loading.gif"
            height="30px"
            width="30px"
            style={{ display: !this.state.is_loading ? 'none' : 'inline' }}
            />
            <div>
              {' '}
              <b>took:</b> {this.state.respObj.took} (ms) <b>total:</b> {this.state.respObj.total}{' '}
            </div>
            <ListGroup>{rows}</ListGroup>
          </Panel.Body>
        </Panel>
      </div>
    );
    /*jshint ignore:end*/
  }
}

SearchRespList.propTypes = {
  title: PropTypes.string,
  hideFields: PropTypes.arrayOf(PropTypes.string),
  pageSize: PropTypes.number,
  keyword: PropTypes.string,
  searchTemplate: PropTypes.string,
  searchIndex: PropTypes.string,
};

SearchRespList.defaultProps = {
  title: '',
  hideFields: [],
  pageSize: 30,
  keyword: '',
  searchTemplate: '',
  searchIndex: 'playlist',
};
export default SearchRespList;
