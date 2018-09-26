import React, { Component } from 'react';
import $ from 'jquery';

import './App.css';

import logo from './img/QuickPass.png';

class App extends Component {

  constructor(props) 
  {
    super(props);
    this.state = {
      psuedo_strings: { // Object skeleton
        hex: '',
        ascii: '',
        alpha_num: ''
      }
    };
  }

  componentDidMount() 
  {
    this.generatePsuedoRandCryptoStrings();
    this.resizeInput();
  }

  /**
   * Generate the generated strings and show them to the user
   */
  generatePsuedoRandCryptoStrings()
  { // Get, set, and show the generated strings
    this.fetchPsuedoRandCryptoStrings(obj => {
      this.setState({psuedo_strings: obj}, () => {
        this.displayPsuedoRandCryptoStrings();
      });
    });
  }

  /**
   * Display the generated psuedo-random crypto strings
   * to the user.
   */
  displayPsuedoRandCryptoStrings() 
  {
    $('#hex-string').val(this.state.psuedo_strings.hex).change();
    $('#ascii-string').val(this.state.psuedo_strings.ascii).change();
    $('#alpha_num-string').val(this.state.psuedo_strings.alpha_num).change();
  }

  /**
   * Fetch all psuedo random crypto strings
   * using the server api.
   * 
   * @param {Function} cb
   */
  fetchPsuedoRandCryptoStrings(cb) 
  {
    // Get all psuedo random crypto strings
    fetch('/api/v1/string/all')
      .then(res => res.json())
        .then(data => {
          let obj = { // Create object
            hex: data.hex,
            ascii: data.ascii,
            alpha_num: data.alphaNum 
          };
          cb(obj);
        });
  }

/** ELEMENT MODIFICATIONS **/

  resizeInput() {
    // Resize when user types
    $('input[type=text]').keypress(e => { 
      let element = e.target;
      $('body').append('<span style="display:none;font-size:26px;font-style:arial;" id="measurement">' + $(element).val() + '</span>');
      $(element).css('width', (($('#measurement').width() + 50) + 'px'));
      $('#measurement').remove();
    });
    // Resize when user types
    $('input[type=text]').keyup(e => {
      let element = e.target;
      $('body').append('<span style="display:none;font-size:26px;font-style:arial;" id="measurement">' + $(element).val() + '</span>');
      $(element).css('width', (($('#measurement').width() + 50) + 'px'));
      $('#measurement').remove();
    });
    // Resize on change 
    $('input[type=text]').on('change', e => {
      let element = e.target;
      $('body').append('<span style="display:none;font-size:26px;font-style:arial;" id="measurement">' + $(element).val() + '</span>');
      $(element).css('width', (($('#measurement').width() + 50) + 'px'));
      $('#measurement').remove();
    });
  }

  toggleAbout() {
    // Open / Close About class
    $('.About').slideToggle();
  }

  render() {
    return (
      <div className="App">
        <img alt="" className="App-Logo"src={ logo } />
        <p className="Input-String-Label" id="hex-string-label"> 64 Psuedo-Random Hexadecimal Characters </p>
        <input className="Input-String" id="hex-string" type="text" name="psuedo-crypto-string"/>
        <p className="Input-String-Label" id="ascii-string-label"> 64 Psuedo-Random ASCII Characters </p>
        <input className="Input-String" id="ascii-string" type="text" name="psuedo-crypto-string"/>
        <p className="Input-String-Label" id="alpha_num-string-label"> 64 Psuedo-Random Alpha-Numeric Characters </p>
        <input className="Input-String" id="alpha_num-string" type="text" name="psuedo-crypto-string"/>
        <button onClick={() => { this.generatePsuedoRandCryptoStrings() }}> REGENERATE </button>
        <a onClick={() => { this.toggleAbout() }} className="App-Link"> <h1> What is Qu1ck P@ss? </h1> </a>

        <div className="About">
          <p> Qu1ck P@ss is simply a cryptographic, psuedo-random 
              character generator. This specific application is
              inspired by <a href="https://www.grc.com/passwords.htm" target="_blank"> 
                Gibson's GRC Password Generator</a> 
              . At each page refresh, or click of a button, 3 types
              of 64 random characters are generated: 64 random
              hexadecimal characters, 64 random ASCII characters,
              and then 64 random alpha-numeric characters. I kind
              of cheat and use the new window.crypto function
              'getRandomValues( )'. However, when I generated these
              passwords on the server, I specify a size of a
              UInt8Array array and create an array half the size
              by randomly selecting positions in the original array
              and filling up the new array with those values, while
              not repeating the position. I then return the array
              and create an object based on the 3 stringified
              versions of the psuedo-random values in the arrays.
          </p>
          <button onClick={() => { this.toggleAbout() }}> THUMBS UP </button>
        </div>
      </div>
    );
  }
}

export default App;
