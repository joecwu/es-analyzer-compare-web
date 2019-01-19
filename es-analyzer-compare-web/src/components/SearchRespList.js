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
} from 'react-bootstrap';

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
    this.setState({ ['is_loading']: true });
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
    console.log('componentWillReceiveProps - ' + props.keyword);
    // const { keyword, id } = this.props;
    if (props.keyword !== this.state.keyword || props.refresh != this.props.refresh) {
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
      items.push({
        _id: hitItem._id,
        _type: hitItem._type,
        score: hitItem._score,
        title: hitItem._source.title,
        content: hitItem._source.content,
        createdAt: typeof hitItem._source.created_at === 'undefined' ? undefined : new Date(hitItem._source.created_at),
        updatedAt: typeof hitItem._source.updated_at === 'undefined' ? undefined : new Date(hitItem._source.updated_at),
        startedAt: typeof hitItem._source.started_at === 'undefined' ? undefined : new Date(hitItem._source.started_at),
      });
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
    const rows = this.state.respObj.items.map(item => (
      /*jshint ignore:start*/
      <div>
        <Badge>{item.score}</Badge>
        <ListGroupItem header={item.title}>{item.content}</ListGroupItem>
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
              took: {this.state.respObj.took} total: {this.state.respObj.total}{' '}
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
