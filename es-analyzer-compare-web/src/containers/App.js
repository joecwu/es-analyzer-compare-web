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
      song_cbx_02: true,
      song_cbx_03: true,
      song_cbx_04: true,
      song_cbx_05: true,
      song_cbx_06: true,
      song_cbx_07: true,
      song_cbx_08: true,
      song_cbx_09: true,
      song_cbx_10: true,
      song_cbx_11: true,
      song_artist_cbx_01: true,
      song_artist_cbx_02: true,
      song_artist_cbx_03: true,
      song_artist_cbx_04: true,
      song_artist_cbx_05: true,
      song_artist_cbx_06: true,
      song_artist_cbx_07: true,
      song_artist_cbx_08: true,
      song_artist_cbx_09: true,
      song_artist_cbx_10: true,
      song_artist_cbx_11: true,
      playlist_cbx_01: false,
      playlist_cbx_02: true,
      playlist_cbx_03: true,
      playlist_cbx_04: false,
      playlist_cbx_05: false,
      playlist_cbx_06: true,
      playlist_cbx_07: true,
      playlist_cbx_08: true,
      playlist_cbx_09: true,
      playlist_cbx_10: false,
      playlist_cbx_11: false,
      playlist_cbx_12: false,
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
          <Tab eventKey={1} title="Song by Song Name">
          <p>
            <Checkbox id="song_cbx_01" checked={this.state['song_cbx_01']} onChange={this.handleChange} inline >1. Original (人気順+新着順)</Checkbox>
            <Checkbox id="song_cbx_02" checked={this.state['song_cbx_02']} onChange={this.handleChange} inline >2. New A (人気順+新着順)</Checkbox>
            <Checkbox id="song_cbx_03" checked={this.state['song_cbx_03']} onChange={this.handleChange} inline >3. New B (人気順+新着順)</Checkbox>
          </p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_01 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2"
                    title="1. Original (人気順+新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_02 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_readingform_boost_keyword"
                    title="2. New A (人気順+新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_cbx_03 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_v2_mix"
                    title="3. New B (人気順+新着順)"
                    refresh={this.state.refreshSong}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={2} title="Song by Artist Name">
          <p>
            <Checkbox id="song_artist_cbx_01" checked={this.state['song_artist_cbx_01']} onChange={this.handleChange} inline >1. Original (人気順+新着順)</Checkbox>
            <Checkbox id="song_artist_cbx_02" checked={this.state['song_artist_cbx_02']} onChange={this.handleChange} inline >2. New A (人気順+新着順)</Checkbox>
            <Checkbox id="song_artist_cbx_03" checked={this.state['song_artist_cbx_03']} onChange={this.handleChange} inline >3. New B (人気順+新着順)</Checkbox>
          </p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_01 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2"
                    title="1. Original (人気順+新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_02 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_readingform_boost_keyword"
                    title="2. New A (人気順+新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px', display: this.state.song_artist_cbx_03 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_by_artist_v2_mix"
                    title="3. New B (人気順+新着順)"
                    refresh={this.state.refreshSongByArtist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>
          <Tab eventKey={3} title="Playlist">
          <p>
            <Checkbox id="playlist_cbx_01" checked={this.state['playlist_cbx_01']} onChange={this.handleChange} inline >New A</Checkbox>
            <Checkbox id="playlist_cbx_02" checked={this.state['playlist_cbx_02']} onChange={this.handleChange} inline >New A (v2)</Checkbox>
            <Checkbox id="playlist_cbx_03" checked={this.state['playlist_cbx_03']} onChange={this.handleChange} inline >New A (v3)</Checkbox>
            <Checkbox id="playlist_cbx_04" checked={this.state['playlist_cbx_04']} onChange={this.handleChange} inline >New B</Checkbox>
            <Checkbox id="playlist_cbx_05" checked={this.state['playlist_cbx_05']} onChange={this.handleChange} inline >New B (v2)</Checkbox>
            <Checkbox id="playlist_cbx_06" checked={this.state['playlist_cbx_06']} onChange={this.handleChange} inline >New B (v3)</Checkbox>
            <Checkbox id="playlist_cbx_07" checked={this.state['playlist_cbx_07']} onChange={this.handleChange} inline >New B (v4)</Checkbox>
            <Checkbox id="playlist_cbx_08" checked={this.state['playlist_cbx_08']} onChange={this.handleChange} inline >New B (v5)</Checkbox>
            <Checkbox id="playlist_cbx_09" checked={this.state['playlist_cbx_09']} onChange={this.handleChange} inline >New B (v6)</Checkbox>
            <Checkbox id="playlist_cbx_10" checked={this.state['playlist_cbx_10']} onChange={this.handleChange} inline >New B (v7)</Checkbox>
            <Checkbox id="playlist_cbx_11" checked={this.state['playlist_cbx_11']} onChange={this.handleChange} inline >New C</Checkbox>
            <Checkbox id="playlist_cbx_12" checked={this.state['playlist_cbx_12']} onChange={this.handleChange} inline >New E</Checkbox>
          </p>
            <p><b>Notes:</b> Due to data source issue, the search logic of Playlist has no artist alias reference (except New B) for now, the artist alias will be involved in the coming optimization.</p>
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_01 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist"
                    title="New A"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_02 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_newA_v2"
                    title="New A (v2)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_03 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_newA_v3"
                    title="New A (v3)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_04 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_synonym"
                    title="New B"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_05 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_synonym2"
                    title="New B (v2)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_06 ? 'inline' : 'none' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_mix"
                    title="New B (v3)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_07 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_mix_v4"
                    title="New B (v4)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_08 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_mix_v5"
                    title="New B (v5)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_09 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_mix_v6"
                    title="New B (v6)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_10 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_fix_score_p_artist_mix_v7"
                    title="New B (v7)"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_11 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_mix"
                    title="New C"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={2} style={{ margin: '0px', padding: '1px', display: this.state.playlist_cbx_12 ? 'inline' : 'none'  }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="playlist_v3"
                    searchTemplate="playlist_v2_newE"
                    title="New E"
                    refresh={this.state.refreshPlaylist}
                    pageSize={this.state.pageSize}
                  />
                </Col>
              </Row>
            </Grid>
          </Tab>  
          <Tab eventKey={4} title="Song by (Song Name + Artist Name)">
            <Grid style={{ margin: '0px', width: '100%' }}>
              <Row className="show-grid" style={{ width: '100%' }}>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_readingform_all_boost_keyword"
                    title="1. New A (人気順+新着順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col xs={6} md={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix"
                    title="2. New B (人気順+新着順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                {/* <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_score"
                    title="3. New B (word match)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_popularity"
                    title="4. New B (人気順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col>
                <Col lg={2} md={3} sm={4} style={{ margin: '0px', padding: '1px' }}>
                  <SearchRespList
                    keyword={this.state.keyword}
                    searchIndex="utapass_song_20181001_v3"
                    searchTemplate="song_artist_v2_mix_releasedate"
                    title="5. New B (新着順)"
                    refresh={this.state.refreshSongAll}
                    pageSize={this.state.pageSize}
                  />
                </Col> */}
              </Row>
            </Grid>
          </Tab>
          {/* <Tab eventKey={5} title="Artist">
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
          </Tab> */}
        </Tabs>
      </div>
    );
  }
  /* jshint ignore:end */
}

export default App;
