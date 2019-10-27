import React, { Component, Fragment } from "react";
/* COMPONENTS */
import { Select, Progress, Slider, Card } from "antd";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import GravityAccidentsChart from "./ChartGravityAccidents.jsx";
import ScatterplotChart from "./ScatterPlotChart.jsx";
/* MIDDLEWARES */
/* EXTRAS */
import { UUID } from "../../utils/UUID.js";
import { timingSafeEqual } from "crypto";
/* STYLES */
import "./statistiche.css";

export default class StatisticheIncidenti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SelectValues: [],
      accidents: null,
      elements: [],
      SliderRange: [1, 24]
    };
  }

  componentDidMount() {
    this.setState({ elements: this.getElements() });
    this.setState({ SelectValues: ["incidentiGennaio2019"] });
  }

  handleChangeSelect = (arrayID, elem) => {
    let arraySelected = [];
    if (arrayID.find(e => e === "tutti")) {
      arraySelected = [
        "incidentiGennaio2019",
        "incidentiFebbraio2019",
        "incidentiMarzo2019"
      ];
      this.setSTATE("SelectValues", arraySelected);
    } else {
      arraySelected = arrayID;
      this.setSTATE("SelectValues", arrayID);
    }
    this.props.setAccidents_(arraySelected);
  };

  handleOnAfterChange = range => {
    this.setSTATE("SliderRange", range);
    console.log(range);
    this.props.setSTATEFather("filterHourRange", range);
    this.props.setAccidentsByHourRange_(range);
  };

  render() {
    const { accidents } = this.state;
    let s = this.state;
    let p = this.props;
    return (
      <Fragment>
        <div className="container m-0 p-0">
          <div className="row m-0 p-0">
            <div className="col-6 m-0 p-0">
              <Form>
                <FormGroup>
                  <Label>Dataset : </Label>
                  <Select
                    allowClear={true}
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Seleziona i dataset"
                    value={s.SelectValues}
                    onChange={this.handleChangeSelect}
                  >
                    {s.elements}
                  </Select>
                </FormGroup>
              </Form>
            </div>
          </div>
          <div className="row m-0 p-0 mb-3">
            <div className="col m-0 p-0" id="FasceOrarie">
              <Card
                title={
                  <span className="bck-def">Seleziona una fascia oraria</span>
                }
              >
                <Slider
                  onAfterChange={this.handleOnAfterChange}
                  defaultValue={[6, 12]}
                  range
                  min={1}
                  max={24}
                  marks={this.getMarks()}
                />
              </Card>
            </div>
          </div>
          <div className="row m-0 p-0 mb-3">
            <div className="col m-0 p-0" id="GravityChart">
              <Card
                title={<span className="bck-def">Gravità degli incidenti</span>}
              >
                <GravityAccidentsChart accidents={p.accidents} />
              </Card>
            </div>
          </div>
          <div className="row m-0 p-0">
            <div className="col m-0 p-0" id="ScattePlotChart">
              <Card
                title={<span className="bck-def">Plot degli incidenti</span>}
              >
                <ScatterplotChart accidents={p.accidents} />
              </Card>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  setSTATE(state, value) {
    this.setState({ [state]: value });
  }

  getElements() {
    return [
      <Select.Option
        key={UUID()}
        value={"incidentiGennaio2019"}
        label="incidentiGennaio"
      >
        Incidenti Gennaio 2019
      </Select.Option>,
      <Select.Option
        key={UUID()}
        value={"incidentiFebbraio2019"}
        label="incidentiFebbraio"
      >
        Incidenti Febbraio 2019
      </Select.Option>,
      <Select.Option
        key={UUID()}
        value={"incidentiMarzo2019"}
        label="incidentiMarzo"
      >
        Incidenti Marzo 2019
      </Select.Option>,
      <Select.Option key={UUID()} value={"tutti"} label="Tutti">
        Tutti
      </Select.Option>
    ];
  }

  getMarks() {
    return {
      1: {
        style: {
          color: "#f50"
        },
        label: <strong>01:00</strong>
      },

      6: {
        style: {
          color: "#f50"
        },
        label: <strong>06:00</strong>
      },

      12: {
        style: {
          color: "#f50"
        },
        label: <strong>12:00</strong>
      },

      18: {
        style: {
          color: "#f50"
        },
        label: <strong>18:00</strong>
      },

      24: {
        style: {
          color: "#f50"
        },
        label: <strong>24:00</strong>
      }
    };
  }
}
