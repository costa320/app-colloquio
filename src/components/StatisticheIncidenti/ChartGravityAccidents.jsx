import React, { Component, Fragment } from "react";
/* COMPONENTS */
import { Card } from "antd";
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
/* MIDDLEWARES */
/* EXTRAS */
import { UUID } from "../../utils/UUID.js";
/* STYLES */
import "./statistiche.css";

export default class ChartGravity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accidents: [],
      formattedAccidents: []
    };
  }

  componentDidMount() {
    /*     this.renderChart(this.getData()); */
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    nextProps.accidents &&
      this.setState({ accidents: nextProps.accidents }, () => {
        this.adeguateData(this.state.accidents)
          .then(formatted_accidents => {
            self.setSTATE("formattedAccidents", formatted_accidents);
            document.getElementById("chartGravity").innerHTML = "";
            self.renderChart(formatted_accidents);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  renderChart(data) {
    // 在一行中保存多个城市的数据，需要将数据转换成
    // {month: 'Jan', city: 'Tokyo', temperature: 3.9}
    var ds = new DataSet();
    var dv = ds.createView().source(data);
    // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
    dv.transform({
      type: "fold",
      fields: ["illesi", "feriti", "morti"], // 展开字段集
      key: "tipologia", // key字段
      value: "persone" // value字段
    });
    var chart = new G2.Chart({
      container: "chartGravity",
      forceFit: true,
      height: 350
    });
    chart.source(dv, {
      day: {
        range: [0, 1]
      }
    });
    chart.tooltip({
      crosshairs: {
        type: "line"
      }
    });
    chart.axis("persone", {
      label: {
        formatter: function formatter(val) {
          return val + "";
        }
      }
    });
    chart
      .line()
      .position("DAY*persone")
      .color("tipologia")
      .shape("smooth");
    chart
      .point()
      .position("DAY*persone")
      .color("tipologia")
      .size(4)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    chart.render();
  }

  render() {
    const { accidents } = this.state;
    let s = this.state;
    return (
      <Fragment>
        <div id="chartGravity" className="maxH"></div>
      </Fragment>
    );
  }
  setSTATE(state, value) {
    this.setState({ [state]: value });
  }

  adeguateData(raw_accidents) {
    return new Promise((res, reg) => {
      //day = {"morti": 1, "illesi":3, "feriti": 6, "giorno": 3 }
      let formatted_accidents_byDay = this.getAllDaysStructure(raw_accidents);

      raw_accidents.forEach(acc => {
        if (acc) {
          let giorno = Number(acc.DataOraIncidente.substring(8, 11));
          /* index del giorno trattato in questione*/
          let index = formatted_accidents_byDay.findIndex(
            day => day.DAY === giorno
          );
          formatted_accidents_byDay[index].morti += Number(acc.NUM_MORTI);
          formatted_accidents_byDay[index].feriti += Number(acc.NUM_FERITI);
          formatted_accidents_byDay[index].illesi += Number(acc.NUM_ILLESI);
        }
      });
      res(formatted_accidents_byDay);
    });
  }

  getAllDaysStructure(raw_accidents) {
    let arrayFormattedDays = [];
    raw_accidents.forEach(acc => {
      if (acc) {
        let giorno = Number(acc.DataOraIncidente.substring(8, 11));
        if (!arrayFormattedDays.find(day => day.DAY === giorno)) {
          arrayFormattedDays.push({
            DAY: giorno,
            morti: 0,
            feriti: 0,
            illesi: 0
          });
        }
      }
    });
    return arrayFormattedDays;
  }

  getData() {
    return [
      {
        day: "01",
        illesi: 7.0,
        feriti: 3.9,
        morti: 1
      },
      {
        day: "02",
        illesi: 6.9,
        feriti: 4.2,
        morti: 1
      },
      {
        day: "03",
        illesi: 9.5,
        feriti: 5.7,
        morti: 1
      },
      {
        day: "04",
        illesi: 14.5,
        feriti: 8.5,
        morti: 1
      },
      {
        day: "05",
        illesi: 18.4,
        feriti: 11.9,
        morti: 1
      },
      {
        day: "06",
        illesi: 21.5,
        feriti: 15.2,
        morti: 1
      },
      {
        day: "07",
        illesi: 25.2,
        feriti: 17.0,
        morti: 1
      },
      {
        day: "08",
        illesi: 26.5,
        feriti: 16.6,
        morti: 1
      },
      {
        day: "09",
        illesi: 23.3,
        feriti: 14.2,
        morti: 1
      },
      {
        day: "10",
        illesi: 18.3,
        feriti: 10.3,
        morti: 1
      },
      {
        day: "11",
        illesi: 13.9,
        feriti: 6.6,
        morti: 1
      },
      {
        day: "12",
        illesi: 9.6,
        feriti: 4.8,
        morti: 1
      }
    ];
  }
}
