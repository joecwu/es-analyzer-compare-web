import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col, Panel, FormGroup, FormControl, Button, Form, Tabs, Tab, Checkbox } from 'react-bootstrap';
import SearchRespList from '../components/SearchRespList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      key: 1,
      keyword: '',
      tempKeyword: '',
      pageSize: 30,
      song_cbx_01: true,
      song_cbx_02: false,
      song_cbx_03: false,
      song_cbx_04: true,
      song_cbx_05: true,
      song_cbx_06: false,
      song_cbx_07: false,
      song_cbx_08: false,
      song_cbx_09: true,
      song_cbx_10: true,
      song_cbx_11: true,
      song_artist_cbx_01: true,
      song_artist_cbx_02: false,
      song_artist_cbx_03: false,
      song_artist_cbx_04: true,
      song_artist_cbx_05: true,
      song_artist_cbx_06: false,
      song_artist_cbx_07: false,
      song_artist_cbx_08: false,
      song_artist_cbx_09: true,
      song_artist_cbx_10: true,
      song_artist_cbx_11: true,
    };
    this.search = this.search.bind(this);
    this.keywordChange = this.keywordChange.bind(this);
    this.refreshPlaylist = this.refreshPlaylist.bind(this);
    this.refreshSong = this.refreshSong.bind(this);
    this.refreshSongByArtist = this.refreshSongByArtist.bind(this);
    this.refreshSongAll = this.refreshSongAll.bind(this);
    this.refreshArtist = this.refreshArtist.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  keywordChange(event) {
    event.preventDefault();
    this.setState({ tempKeyword: event.target.value });
  }
  search(event) {
    event.preventDefault();
    console.debug('search for keyword', this.state.tempKeyword);
    this.setState({ keyword: this.state.tempKeyword }, () => {
      if (this.state.key == 1) {
        this.refreshSong();
      } else if (this.state.key == 2) {
        this.refreshSongByArtist();
      } else if (this.state.key == 3) {
        this.refreshPlaylist();
      } else if (this.state.key == 4) {
        this.refreshSongAll();
      } else if (this.state.key == 5) {
        this.refreshArtist();
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
  refreshSongAll() {
    this.setState({ refreshSongAll: !this.state.refreshSongAll });
  }
  refreshArtist() {
    this.setState({ refreshArtist: !this.state.refreshArtist });
  }

  handleSelect(key) {
    this.setState({ key });
  }

  handleChange(evt) {
    console.log(evt);
    console.log(evt.target.id);
    this.setState({ [evt.target.id]: evt.target.checked });
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
        <Tabs
          defaultActiveKey={1}
          animation={false}
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="noanim-tab-example"
        >
          <Tab eventKey={1} title="Song">
          <p>
            <Checkbox id="song_cbx_01" checked={this.state['song_cbx_01']} onChange={this.handleChange} inline >1. Original</Checkbox>
            <Checkbox id="song_cbx_02" checked={this.state['song_cbx_02']} onChange={this.handleChange} inline >2. Original (人気順)</Checkbox>
            <Checkbox id="song_cbx_03" checked={this.state['song_cbx_03']} onChange={this.handleChange} inline >3. Original (新着順)</Checkbox>
            <Checkbox id="song_cbx_04" checked={this.state['song_cbx_04']} onChange={this.handleChange} inline >4. Readingform</Checkbox>
            <Checkbox id="song_cbx_05" checked={this.state['song_cbx_05']} onChange={this.handleChange} inline >5. Readingform (score only)</Checkbox>
            <Checkbox id="song_cbx_06" checked={this.state['song_cbx_06']} onChange={this.handleChange} inline >6. Readingform (phrase^3)</Checkbox>
            <Checkbox id="song_cbx_07" checked={this.state['song_cbx_07']} onChange={this.handleChange} inline >7. Readingform (phrase^3, 人気順)</Checkbox>
            <Checkbox id="song_cbx_08" checked={this.state['song_cbx_08']} onChange={this.handleChange} inline >8. Readingform (phrase^3, 新着順)</Checkbox>
            <Checkbox id="song_cbx_09" checked={this.state['song_cbx_09']} onChange={this.handleChange} inline >9. Mix</Checkbox>
            <Checkbox id="song_cbx_10" checked={this.state['song_cbx_10']} onChange={this.handleChange} inline >10. Mix (人気順)</Checkbox>
            <Checkbox id="song_cbx_11" checked={this.state['song_cbx_11']} onChange={this.handleChange} inline >11. Mix (新着順)</Checkbox>
          </p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_01 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2"
                    title="1. Original (mix sort)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_02 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_popularity"
                    title="2. Original (人気順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_03 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_releasedate"
                    title="3. Original (新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_04 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform"
                    title="4. Readingform (mix sort)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_05 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_score"
                    title="5. Readingform (score only)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_06 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_boost_keyword"
                    title="6. Readingform (phrase^3)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_07 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_boost_keyword_popularity"
                    title="7. Readingform (phrase^3, 人気順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_08 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_boost_keyword_releasedate"
                    title="8. Readingform (phrase^3, 新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_09 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_mix"
                    title="9. Mix (mix sort)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_10 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_mix_popularity"
                    title="10. Mix (人気順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_11 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_mix_releasedate"
                    title="11. Mix (新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={2} title="Song by Artist">
          <p>
            <Checkbox id="song_artist_cbx_01" checked={this.state['song_artist_cbx_01']} onChange={this.handleChange} inline >1. Original</Checkbox>
            <Checkbox id="song_artist_cbx_02" checked={this.state['song_artist_cbx_02']} onChange={this.handleChange} inline >2. Original (人気順)</Checkbox>
            <Checkbox id="song_artist_cbx_03" checked={this.state['song_artist_cbx_03']} onChange={this.handleChange} inline >3. Original (新着順)</Checkbox>
            <Checkbox id="song_artist_cbx_04" checked={this.state['song_artist_cbx_04']} onChange={this.handleChange} inline >4. Readingform</Checkbox>
            <Checkbox id="song_artist_cbx_05" checked={this.state['song_artist_cbx_05']} onChange={this.handleChange} inline >5. Readingform (score only)</Checkbox>
            <Checkbox id="song_artist_cbx_06" checked={this.state['song_artist_cbx_06']} onChange={this.handleChange} inline >6. Readingform (phrase^3)</Checkbox>
            <Checkbox id="song_artist_cbx_07" checked={this.state['song_artist_cbx_07']} onChange={this.handleChange} inline >7. Readingform (phrase^3, 人気順)</Checkbox>
            <Checkbox id="song_artist_cbx_08" checked={this.state['song_artist_cbx_08']} onChange={this.handleChange} inline >8. Readingform (phrase^3, 新着順)</Checkbox>
            <Checkbox id="song_artist_cbx_09" checked={this.state['song_artist_cbx_09']} onChange={this.handleChange} inline >9. Mix</Checkbox>
            <Checkbox id="song_artist_cbx_10" checked={this.state['song_artist_cbx_10']} onChange={this.handleChange} inline >10. Mix (人気順)</Checkbox>
            <Checkbox id="song_artist_cbx_11" checked={this.state['song_artist_cbx_11']} onChange={this.handleChange} inline >11. Mix (新着順)</Checkbox>
          </p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_01 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2"
                    title="1. Original (mix sort)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_02 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_popularity"
                    title="2. Original (人気順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_03 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_releasedate"
                    title="3. Original (新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_04 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform"
                    title="4. Readingform (mix sort)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_05 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_score"
                    title="5. Readingform (score only)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_06 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_boost_keyword"
                    title="6. Readingform (phrase^3)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_07 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_boost_keyword_popularity"
                    title="7. Readingform (phrase^3, 人気順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_08 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_boost_keyword_releasedate"
                    title="8. Readingform (phrase^3, 新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_09 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_mix"
                    title="9. Mix (mix sort)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_10 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_mix_popularity"
                    title="10. Mix (人気順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_11 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_mix_releasedate"
                    title="11. Mix (新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={3} title="Playlist">
            <p><b>Notes:</b> Due to data source issue, the search logic of Playlist has no artist alias reference for now, the artist alias will be involved in the future optimization.</p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
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
                    title="3. Original fix score + Artist + Song"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_synonym"
                    title="4. Synonym + Artist + Song"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_readingform"
                    title="5.ReadingForm + Artist + Song"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_mix"
                    title="6.Mix + Artist + Song"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={4} title="Song by (Song + Artist)">
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_readingform_all_boost_keyword"
                    title="1. Readingform (mix sort)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_all_readingform_score"
                    title="2. Readingform (score only)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix"
                    title="3. Mix (mix sort)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_score"
                    title="4. Mix (score only)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_popularity"
                    title="5. Mix (人気順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_releasedate"
                    title="6. Mix (新着順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={5} title="Artist">
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_artist_20180925_v3"
                    searchTemplate="artist_v3_mix"
                    title="1. Mix"
                    refresh={this.state.refreshArtist}
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
