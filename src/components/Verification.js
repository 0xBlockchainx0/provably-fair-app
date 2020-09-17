import React, { Component } from 'react';
import { GraphQLClient } from 'graphql-request';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { processBetsStake } from '../services/Stake/generic.js'

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterAPIStake: false,
      enterAPI: false,
      user: '',
      apiKey: '',
      apiKeyStake: '',
      usernameStake: '',
      serverSeedHash: '',
      clientSeed:'',
      session_token: '',
      betData: [],
      cryptoGames: false,
      stake: true,
      primeDice: false,
      bitvest: false,
      verify: false,
      diceResult: 0,
      diceVerify: 0,

      BetIdArray: [],
      betDataById: [],
      betDataEnriched: [],
      userSeedsData: [],
      BetId: null,
      Balance: null,
      Roll: null,

      previousClientSeedStake: '',
      activeClientSeedStake: '',
      previousServerSeedStake: '',
      nonceChecked: false,
      toggleState: false,
      showAlert: false,
      popupResult: '',
      betAmount: 0.0000001,
      betPayout: 2.0,
      betPlaced: false,
      numberBetsVerFailed: 0,
      isNonceManipulated: false,
      viewRecentBetsStake: false,
      client_seed: null,
      server_seed: null,
      server_hash: null,
      nonce: 0,
      games: [
        { name: 'Plinko' },
        { name: 'Mines' },
        { name: 'Chartbet' },
        { name: 'Hilo' },
        { name: 'Blackjack' },
        { name: 'Diamond Poker' },
        { name: 'Roulette' },
        { name: 'Keno' },
        { name: 'Baccarat' },
        { name: 'Dice' }
      ],
      mines: [],
      keno: [],
      numOfRows: [0, 1, 2, 3, 4],
      numOfColumnsKeno: [0, 1, 2, 3, 4, 5, 6, 7],
      numOfColumns: [0, 1, 2, 3, 4, 5, 6, 7],
      active_game: 'chartbet',
      MAX_ROLL: 10001,
      MAX_ROULETTE: 37,
      MAX_CHARTBET: 1000000
    }
  }

  /* Method for get all Bet Data for Stake Operator */

  getAllBetsStake = (apiKeyStake, usernameStake) => {

    console.log('apiKeyStake ', apiKeyStake, usernameStake);

    /* GraphQl Client object with x-access-token for Stake Operator */

    const client = new GraphQLClient('https://api.stake.com/graphql', {
      headers: {
        "x-access-token": apiKeyStake,
      },
    })
    //should take user name as parameter
    let betDataEnriched = [];
    let betDataById = [];
    let name = `\"${usernameStake}\"`;

    /* GraphQL query houseBetList (i.e. game, payout, amountMultiplier, payoutMultiplier, amount, currency, createdAt) for a User of Stake Operator */

    let query3 = `{
            user(name: ${name}) {
              houseBetList(limit: 50, offset: 0) {
                id
                iid
                bet {
                  ... on CasinoBet {
                    game
                    payout
                    amountMultiplier
                    payoutMultiplier
                    amount
                    currency
                    createdAt
                  }
                }
              }
            }
          }`

    client.request(query3).then((bet) => {
      betDataEnriched = bet.user.houseBetList;
      this.setState({ betDataEnriched: betDataEnriched });
      console.log('bet data enriched', betDataEnriched);

      bet.user.houseBetList.map((houseBet) => {
        //  console.log("houseBet : ", houseBet);


        /**Query is for looking up one bet**/

        let variables = {
          iid: houseBet.iid
        }

        let query7 = `query betQuery($iid: String!) {

              bet(iid: $iid) {
                id
                iid
                bet {
                  ... on CasinoBet {
                    id
                    nonce
                    game
                    serverSeed {
                      seed
                      seedHash
                    }
                    clientSeed {
                      seed
                    }
                  }
                }
              }
            }`

        client.request(query7, variables).then((betData) => {
          console.log('betData --', betData);
          if (betData.bet.bet.clientSeed !== 'undefined') {
            betDataById.push(betData);
            this.setState({ betDataById: betDataById });
          }
        })
        console.log('betDataById', betDataById);
      })
    })
  }

  componentDidMount() {
    const { usernameStake, apiKeyStake, serverSeedHash, clientSeed} = this.props;
    this.setState({ usernameStake: usernameStake, apiKeyStake: apiKeyStake, serverSeedHash: serverSeedHash, clientSeed:clientSeed });
    console.log(this.props);
    this.getAllBetsStake(apiKeyStake, usernameStake);
  }

  render() {
    const { enterAPI, enterAPIStake, apiKey, apiKeyStake, usernameStake, serverSeedHash,previousClientSeedStake, betDataById, betDataEnriched, isNonceManipulated, numberBetsVerFailed, popupResult, clientSeed, diceVerify,
      verify, nonce, primeDice, cryptoGames, verification, active_game, betData, numOfRows, numOfColumnsKeno, showAlert} = this.state;
    return (
      <div>
      <div className="VerificationUI-Stake" className="table-responsive" style={{ fontSize: '11px' }}>

        <span className="alert alert-success p-2">
            <span>Nonce</span>
            <span className={"badge badge-md badge-circle badge-floating badge-danger border-white"}>{isNonceManipulated ? "Fail" : "Ok"}</span>
        </span>
        <span className="alert alert-danger p-2">
            <span>Bets Fail</span>
            <span className="badge badge-md badge-circle badge-floating badge-danger border-white">{numberBetsVerFailed}</span>
        </span>
        <div className="form-group">
            <button type="button" className="btn btn-secondary m-2" onClick={processBetsStake(betDataById, betDataEnriched, previousClientSeedStake, clientSeed, serverSeedHash)}> Verify Recent Bets</button>
        </div>
        <div className="Bitvest" style={{ display: 'none' }}>
            <table className="table align-items-center table-flush table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>Game</th>
                        <th>Roll</th>
                        <th>Side</th>
                        <th>Target</th>
                        <th>Nonce</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {betData.map((item, i) => {
                        return <tr key={i}>
                            <td>
                                {item.element.id}
                            </td>
                            <td>
                                {item.element.game}
                            </td>
                            <td>
                                {item.element.roll}
                            </td>
                            <td>
                                {item.element.side}
                            </td>
                            <td>
                                {item.element.target}
                            </td>
                            <td>
                                {item.element.nonce}
                            </td>
                            <td>
                                {item.element.isVerified
                                    ? <a href="#" className="badge badge-pill badge-success">Success</a>
                                    : <a href="#" className="badge badge-pill badge-danger">Failed</a>
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        <div className="Stake" style={{ display: verification ? 'block' : 'none' }}>
            <table className="table align-items-center table-flush table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>Game</th>
                        <th>Payout/Side</th>
                        <th>Nonce</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {betData.map((item, i) => {
                        return <tr key={i}>
                            <td>
                                {item.element.id}
                            </td>
                            <td>
                                {item.element.game}
                            </td>
                            <td>
                                {item.element.payout}{item.element.side}
                            </td>
                            <td>
                                {item.element.nonce}
                            </td>
                            <td>
                                {(item.element.game === 'baccarat' || item.element.game === 'hilo' || item.element.game === 'blackjack' || item.element.game === 'diamondPoker' || item.element.game === 'videoPoker' || item.element.game === 'mines' || item.element.game === 'keno' || item.element.game === 'plinko')
                                    ? <button className="btn btn-info" onClick={() => {
                                        this.setState({ showAlert: true, active_game: item.element.game, popupResult: item.element.isVerified });
                                    }} title="Results"> </button>
                                    : item.element.isVerified
                                }

                                {showAlert &&
                                    <SweetAlert
                                        confirmBtnText="Ok"
                                        confirmBtnBsStyle="info"
                                        title="Bet Results"
                                        onConfirm={this.hideAlertConfirm}
                                        style={{ marginLeft: '0', left: '0%', width: '400px', marginTop: '-255px', overflowX: 'scroll', overflowY: 'scroll', height: '406px' }}
                                    >
                                        {(active_game === 'diamondPoker' || active_game === 'plinko') ?
                                            popupResult.map((item, i) => {
                                                return <p style={{ fontSize: 'x-small' }}>{item + " "}</p>;
                                                <img src={require('../images/diamonds/diamonds/1x/' + item + '.png')} style={{ width: "10%" }} />;
                                            })
                                            : active_game === 'mines' ?
                                                <table>
                                                    <tbody>
                                                        {numOfRows.map((j) => {
                                                            return (<tr key={nonce + '' + j}>
                                                                {numOfRows.map((i) => {
                                                                    return <td key={nonce + '' + j * 5 + i}>
                                                                        <img src={require((popupResult[0] === ((j) * 5 + (i))) || (popupResult[1] === ((j) * 5 + (i))) || (popupResult[2] === ((j) * 5 + (i))) ? '../images/mine.png' : '../images/gem.png')} style={{ width: "90%" }} />
                                                                    </td>
                                                                })}
                                                            </tr>)
                                                        })}
                                                    </tbody>
                                                </table>
                                                : active_game === 'keno' ?
                                                    <table>
                                                        <tbody>
                                                            {numOfRows.map((j) => {
                                                                return (<tr key={nonce + '' + j}>
                                                                    {numOfColumnsKeno.map((i) => {
                                                                        return (<td key={(nonce + '' + j * 8 + i)}>
                                                                            <button className={(popupResult[0] === ((j) * 8 + (i))) || (popupResult[1] === ((j) * 8 + (i))) || (popupResult[2] === ((j) * 8 + (i))) || (popupResult[4] === ((j) * 8 + (i))) || (popupResult[4] === ((j) * 8 + (i))) || (popupResult[5] === ((j) * 8 + (i))) || (popupResult[6] === ((j) * 8 + (i))) || (popupResult[7] === ((j) * 8 + (i))) || (popupResult[8] === ((j) * 8 + (i))) || (popupResult[9] === ((j) * 8 + (i))) ? 'btn btn-success' : 'btn btn-info'}>{(j) * 8 + i + 1} </button>
                                                                        </td>);
                                                                    })}
                                                                </tr>)
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    :
                                                    popupResult.map((item, i) => {
                                                        return <img src={'/images/cards-png/' + item + '.png'} alt="Card" style={{ width: "10%" }} />;
                                                    })}
                                    </SweetAlert>}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

      </div>


      <div className="VerificationUI-CryptoGames table-responsive" style={{ display: verification && cryptoGames ? 'block' : 'none', fontSize: '11px' }}>
          <div className="nav-wrapper">
              <ul className="nav nav-pills nav-fill flex-md-row" id="tabs-icons-text" role="tablist">
                  <li className="nav-item" onClick={() => {
                      this.setState({ gettingStarted: false, settings: true, verification: false, operators: false });
                      this.getServerSeed(apiKey)
                  }}>
                      <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i className="fa fa-cloud-upload-96 mr-2"></i>Settings</a>
                  </li>
                  <li className="nav-item show" onClick={() => {
                      this.setState({ gettingStarted: false, settings: false, verification: true, operators: false });
                  }}>
                      <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i className="fa fa-bell-55 mr-2"></i>Veri-----fication</a>
                  </li>
                  <li className="nav-item" onClick={() => {
                      this.setState({ gettingStarted: false, settings: false, verification: false, operators: true });
                  }}>
                      <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i className="fa fa-calendar-grid-58 mr-2"></i>Casinos</a>
                  </li>
              </ul>
          </div>

          <div className="primeDice" style={{ display: primeDice ? 'block' : 'none' }}>
              <div className="form-group">
                  <button type="button" className="btn btn-secondary m-2" onClick={() => {
                      this.handleVerifyBetPrimeDice(serverSeedHash, clientSeed, nonce);
                      console.log(serverSeedHash, clientSeed, nonce);
                  }}> Verify</button>

              </div>

          </div>

          <div style={{ display: verify ? 'block' : 'none' }}>
              <div className="alert alert-info" role="alert">
                  <strong>Your verified result : {diceVerify}</strong>
              </div>
              <div className="alert alert-primary" role="alert" style={{ fontSize: '11px' }}>
                  ServerSeed : {serverSeedHash}
              </div>
              <div className="alert alert-warning" role="alert" style={{ fontSize: '11px' }}>
                  Client Seed : {clientSeed}
              </div>
          </div>
      </div>
      </div>
    )
  }
}
