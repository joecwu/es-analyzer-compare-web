import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button, Form, Tabs, Tab } from 'react-bootstrap';
import SearchRespList from '../components/SearchRespList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      key: 1,
      keyword: '',
      tempKeyword: '',
      pageSize: '30'
    };
    this.search = this.search.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.refreshPlaylist = this.refreshPlaylist.bind(this);
    this.refreshSong = this.refreshSong.bind(this);
    this.refreshSongByArtist = this.refreshSongByArtist.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  keywordChange(event) {
    event.preventDefault();
    this.setState({ tempKeyword: event.target.value });
  }
  search(event) {
    event.preventDefault();
    console.log('search for keyword:' + this.state.tempKeyword);
    this.setState({ keyword: this.state.tempKeyword }, () => {
      console.log('tab:' + this.state.key);
      if(this.state.key == 1) {
        this.refreshSong();
      }else if(this.state.key == 2) {
        this.refreshSongByArtist();
      }else if(this.state.key == 3) {
        this.refreshPlaylist();
      }
    });
    //TODO update component's search
  }
  refreshPlaylist() {
    this.setState({ refreshPlaylist: !this.state.refreshPlaylist });
  }
  refreshSong() {
    this.setState({ refreshSong: !this.state.refreshSong });
  }
  refreshSongByArtist() {
    this.setState({ refreshSongByArtist: !this.state.refreshSongByArtist });
  }

  handleSelect(key) {
    this.setState({ key });
  }

  /* jshint ignore:start */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>ES Search Result Comparison</h3>
        </header>

        <Form inline style={{ margin: '10px' }}>
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
        <Tabs defaultActiveKey={1} animation={false} activeKey={this.state.key} onSelect={this.handleSelect} id="noanim-tab-example">
          <Tab eventKey={1} title="Song">
          <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2"
                    title="1. Original"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_popularity"
                    title="2. Original (人気順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_releasedate"
                    title="3. Original (新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform"
                    title="4. Readingform"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_score"
                    title="4. Readingform (score only)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_boost_keyword"
                    title="5. Readingform (Keyword^10)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={2} title="Song by Artist">
          <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2"
                    title="1. Original"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_popularity"
                    title="2. Original (人気順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_releasedate"
                    title="3. Original (新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform"
                    title="4. Readingform"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_score"
                    title="4. Readingform (score only)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_boost_keyword"
                    title="5. Readingform (Keyword^10)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={3} title="Playlist">
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v2"
                    searchTemplate="playlist_v2"
                    title="1. Original"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score"
                    title="2. Original fix score"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist"
                    title="3. Original fix score + Artist Name^1"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_03"
                    title="4. Original fix score + Artist Name^0.3"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_synonym"
                    title="5. Artist Name^0.3 + Synonym"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_readingform"
                    title="6. Artist Name^1 + ReadingForm"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
        </Tabs>
      </div>
    );
  }
  /* jshint ignore:end */
}

export default App;
