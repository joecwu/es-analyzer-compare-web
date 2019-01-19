import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import SearchRespList from '../components/SearchRespList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      tempKeyword: ''
    };
    this.search = this.search.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.refreshSearchList = this.refreshSearchList.bind(this);
  }

  keywordChange(event) {
    event.preventDefault();
    this.setState({ tempKeyword: event.target.value });
  }
  search(event) {
    event.preventDefault();
    console.log('search for keyword:' + this.state.tempKeyword);
    this.setState({ keyword: this.state.tempKeyword }, () => {
      this.refreshSearchList();
    });
    //TODO update component's search
  }
  refreshSearchList() {
    this.setState({ refreshSearchList: !this.state.refreshSearchList })
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>ES Search Result Comparison</h3>
        </header>

        <Form inline style={{margin:"10px"}}>
          <FormGroup controlId="formInlineSearch">
            <FormControl
              style={{ width: '300px' }}
              type="text"
              placeholder="keyword to search"
              value={this.state.tempKeyword}
              onChange={this.keywordChange}
            />
            <Button type="submit" onClick={this.search}>
              Search
            </Button>
          </FormGroup>
        </Form>
        <Grid style={{margin:"0px", width: "100%"}}>
          <Row className="show-grid" style={{width: "100%"}}>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v2" searchTemplate="playlist_v2" title="Original" refresh={this.state.refreshSearchList} />
            </Col>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v3" searchTemplate="playlist_v2_fix_score" title="Original fix score" refresh={this.state.refreshSearchList}/>
            </Col>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v3" searchTemplate="playlist_v2_fix_score_p_artist" title="Original fix score + Artist Name^1" refresh={this.state.refreshSearchList}/>
            </Col>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v3" searchTemplate="playlist_v2_fix_score_p_artist_03" title="Original fix score + Artist Name^0.3" refresh={this.state.refreshSearchList}/>
            </Col>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v3" searchTemplate="playlist_v2_fix_score_p_artist_synonym" title="Artist Name^0.3 + Synonym" refresh={this.state.refreshSearchList}/>
            </Col>
            <Col lg={2} md={3} sm={4} style={{margin: "0px", padding: "1px"}}>
              <SearchRespList keyword={this.state.keyword} searchIndex="playlist_v3" searchTemplate="playlist_v2_fix_score_p_artist_readingform" title="Artist Name^1 + ReadingForm" refresh={this.state.refreshSearchList}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
  /* jshint ignore:end */
}

export default App;
