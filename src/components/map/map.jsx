import React, { Component, Fragment } from "react";
/* COMPONENTS */
import GoogleMapReact from "google-map-react";
import { Drawer, Descriptions, Card, Spin } from "antd";
import Marker from "./Marker.jsx";
import StatisticheIncidenti from "../StatisticheIncidenti/StatisticheIncidenti.jsx";
/* MIDDLEWARES */
import { getAccidentsByPeriod } from "../../utils/axios.middleware/accidents.api.jsx";
/* EXTRAS */
/* import incidentiGennaio from "./mock_json/incidenti_stradali_gennaio_2019.json";
import incidentiFebbraio from "./mock_json/incidenti_stradali_febbraio_2019.json";
import incidentiMarzo from "./mock_json/incidenti_stradali_marzo_2019.json"; */
import { UUID } from "../../utils/UUID.js";
/* STYLES */
import "../../assets/styles/css/maps.css";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accidents: null,
      filteredAccidents: null,
      filterHourRange: [6, 12],
      selectedMonths: ["incidentiGennaio2019"],

      ROMA_CENTER: {
        lat: 41.902782,
        lng: 12.496366
      },
      zoom: 11,
      /* DRAWER */
      accident_selected: null,
      VisibleDrawerACCInformation: false,
      /* loading state for this page */
      loading: false
    };
  }

  componentDidMount() {
    /*    this.setState({ accidents: incidentiGennaio }, state => {
      this.setAccidentsByHourRange_(this.state.filterHourRange);
    }); */

    this.initAccidents(this.state.selectedMonths);
  }

  generateAccidents(accidents) {
    return accidents.map(acc => {
      if (acc) {
        console.log("PROCESS ACCIDENT N°: " + acc.ID);
        return (
          <Marker
            key={acc.ID}
            lng={Number(acc.Longitudine)}
            lat={Number(acc.Latitudine)}
            onClick={() => this.handleOpenDrawerACCInformation(acc)}
            text={"" + acc.ID}
            acc={acc}
          />
        );
      }
    });
  }

  initAccidents(selectedMonths) {
    let self = this;
    this.setState({ loading: true });
    getAccidentsByPeriod(selectedMonths)
      .then(res => {
        self.setState({ accidents: res.data }, () => {
          self.setAccidentsByHourRange_(self.state.filterHourRange);
        });
        self.setState({ loading: false });
        /* console.log(res); */
      })
      .catch(err => {
        console.log(err);
        self.setState({ loading: false });
      });
  }

  render() {
    const { accidents } = this.state;
    let s = this.state;
    return (
      <Fragment>
        <Spin spinning={this.state.loading}>
          <div className="container">
            <div className="row mb-5">
              <div className="col">
                <StatisticheIncidenti
                  accidents={s.filteredAccidents}
                  setSTATEFather={this.setSTATE_}
                  setAccidents_={this.setAccidents_}
                  setAccidentsByHourRange_={this.setAccidentsByHourRange_}
                />
              </div>
            </div>
            <div className="row">
              <div className="col" id={"accidentsMap"}>
                <Card
                  title={<span className="bck-def">Mappa degli incidenti</span>}
                >
                  {accidents && (
                    // Important! Always set the container height explicitly
                    <div style={{ height: "100vh", width: "100%" }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "GOOGLE API KEY HERE"
                        }}
                        defaultCenter={s.ROMA_CENTER}
                        defaultZoom={s.zoom}
                      >
                        {s.filteredAccidents &&
                          this.generateAccidents(s.filteredAccidents)}
                      </GoogleMapReact>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
          <Drawer
            title={`Informazioni aggiuntive sull'incidente N° ${
              s.accident_selected ? s.accident_selected.ID : ""
            }`}
            width={"720px"}
            placement={"right"}
            closable={true}
            onClose={this.handleCloseDrawerACCInformation}
            visible={s.VisibleDrawerACCInformation}
          >
            <Descriptions title="">
              {s.accident_selected &&
                Object.keys(s.accident_selected).map(key => {
                  return (
                    <Descriptions.Item
                      key={UUID()}
                      label={<span className="font-weight-bold">{key}</span>}
                    >
                      {s.accident_selected[key]
                        ? s.accident_selected[key]
                        : "ND"}
                    </Descriptions.Item>
                  );
                })}
            </Descriptions>
          </Drawer>
        </Spin>
      </Fragment>
    );
  }

  setAccidents_ = ArrType => {
    this.setState({ selectedMonths: ArrType }, () => {
      this.initAccidents(this.state.selectedMonths);
    });

    /* let arrayAccidents = []; */
    /*     ArrType.forEach(element => {
      switch (element) {
        case "incidentiGennaio2019":
          arrayAccidents = arrayAccidents.concat(incidentiGennaio);
          break;
        case "incidentiFebbraio2019":
          arrayAccidents = arrayAccidents.concat(incidentiFebbraio);
          break;
        case "incidentiMarzo2019":
          arrayAccidents = arrayAccidents.concat(incidentiMarzo);
          break;
      }
    }); */
    /*     this.setState({ accidents: arrayAccidents }, () => {
      this.setAccidentsByHourRange_(this.state.filterHourRange);
    }); */
  };

  setAccidentsByHourRange_ = range => {
    let accidents = this.state.accidents;

    let filteredAccidentsByHour = accidents.map(accident => {
      let oraIncidente = Number(accident.DataOraIncidente.substring(11, 13));
      if (oraIncidente >= range[0] && oraIncidente <= range[1]) {
        return accident;
      }
    });
    this.setSTATE("filteredAccidents", filteredAccidentsByHour);
  };

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }

  setSTATE_ = (state, value) => {
    this.setState({ [state]: value });
  };

  handleOpenDrawerACCInformation = acc => {
    this.setSTATE("accident_selected", acc);
    this.setSTATE("VisibleDrawerACCInformation", true);
  };
  handleCloseDrawerACCInformation = () => {
    this.setSTATE("accident_selected", null);
    this.setSTATE("VisibleDrawerACCInformation", false);
  };
}
