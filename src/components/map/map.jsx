import React, { Component, Fragment } from "react";
/* COMPONENTS */
import GoogleMapReact from "google-map-react";
import { Drawer, Descriptions } from "antd";
import Marker from "./Marker.jsx";
/* MIDDLEWARES */
/* EXTRAS */
import mock_DATI from "./incidenti_stradali_gennaio_2019.json";
import { UUID } from "../../utils/UUID.js";
/* STYLES */
import "../../assets/styles/css/maps.css";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accidents: null,
      ROMA_CENTER: {
        lat: 41.902782,
        lng: 12.496366
      },
      zoom: 11,
      /* DRAWER */
      accident_selected: null,
      VisibleDrawerACCInformation: false
    };
  }

  componentDidMount() {
    this.setState({ accidents: mock_DATI });
  }

  generateAccidents(accidents) {
    return accidents.map(acc => {
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
    });
  }

  render() {
    const { accidents } = this.state;
    let s = this.state;
    return (
      <Fragment>
        {accidents && (
          // Important! Always set the container height explicitly
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyC9nCYEkly6_Cu7IDvWkdbbCDaGtb7prms"
              }}
              defaultCenter={s.ROMA_CENTER}
              defaultZoom={s.zoom}
            >
              {this.generateAccidents(s.accidents)}
            </GoogleMapReact>
          </div>
        )}

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
                    {s.accident_selected[key] ? s.accident_selected[key] : "ND"}
                  </Descriptions.Item>
                );
              })}
          </Descriptions>
        </Drawer>
      </Fragment>
    );
  }
  setSTATE(state, value) {
    this.setState({ [state]: value });
  }

  handleOpenDrawerACCInformation = acc => {
    this.setSTATE("accident_selected", acc);
    this.setSTATE("VisibleDrawerACCInformation", true);
  };
  handleCloseDrawerACCInformation = () => {
    this.setSTATE("accident_selected", null);
    this.setSTATE("VisibleDrawerACCInformation", false);
  };
}
