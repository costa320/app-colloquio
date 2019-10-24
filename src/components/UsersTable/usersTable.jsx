import React, { Component } from "react";
import { Icon, Table, Descriptions, Drawer } from "antd";
/* COMPONENTS */

/* MIDDLEWARES */
import { getUsers } from "../../utils/axios.middleware/users.api.jsx";
/* MOCKS */
import mock_users from "./users.json";
/* EXTRAS */
import { UUID } from "../../utils/UUID.js";

export default class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loading: true,
      hasData: false,
      pagination: { position: "bottom" },
      drawerVisible: false,
      currentUserSelected: {}
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    let self = this;
    this.setSTATE("loading", true);
    this.setSTATE("hasData", false);
    getUsers()
      .then(res => {
        console.log(res);
        self.setSTATE("userList", res.data);
        self.setSTATE("loading", false);
        self.setSTATE("hasData", true);
      })
      .catch(function(error) {
        console.log(error);
        if (process.env.enviroment === "DEV_START") {
          /* WHEN DEV MODE IS NEEDED */
          self.setSTATE("userList", mock_users);
          self.setSTATE("hasData", true);
        } else {
          self.setSTATE("hasData", false);
        }
        self.setSTATE("loading", false);
      });
  }

  OpendDetails = record => {
    this.setSTATE("currentUserSelected", record);
    this.setSTATE("drawerVisible", true);
  };

  handleCloseDrawer = e => {
    this.setSTATE("currentUserSelected", {});
    this.setSTATE("drawerVisible", false);
  };

  getDescriptionUser(user) {
    return (
      <Descriptions key={UUID()}>
        {Object.keys(user).map((key, i) => {
          return (
            <Descriptions.Item key={UUID()} label={key}>
              {user[key]}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    );
  }

  render() {
    let s = this.state;
    let currentUserSelected = this.state.currentUserSelected;
    return (
      <>
        <Table
          {...this.state}
          columns={this.getColumns()}
          dataSource={s.hasData ? s.userList : null}
        />
        <Drawer
          height={"50%"}
          className="pb-5"
          title="Informazioni aggiuntive dell'utente"
          placement={"bottom"}
          closable={true}
          onClose={this.handleCloseDrawer}
          visible={s.drawerVisible}
        >
          {this.getDescriptionUser(currentUserSelected)}
        </Drawer>
      </>
    );
  }

  setSTATE(state, value) {
    this.setState({ [state]: value });
  }

  getColumns = () => [
    {
      title: "Nome",
      dataIndex: "first_name",
      key: "first_name"
    },
    {
      title: "Cognome",
      dataIndex: "last_name",
      key: "last_name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Sesso",
      dataIndex: "gender",
      key: "gender",
      render: (text, record) =>
        text === "Male" ? (
          <span key={UUID()}>
            <Icon type="man" style={{ color: "#06c" }} />
            Maschio
          </span>
        ) : (
          <span key={UUID()}>
            <Icon type="woman" style={{ color: "lightcoral" }} />
            Femmina
          </span>
        )
    },
    {
      title: "Età",
      dataIndex: "age",
      key: "age",
      render: (text, record) =>
        Number(text) >= 18 ? (
          <span key={UUID()}>
            <Icon
              type="safety-certificate"
              theme="twoTone"
              twoToneColor="green"
            />
            {text}
          </span>
        ) : (
          <span key={UUID()}>
            <Icon type="eye-invisible" theme="twoTone" twoToneColor="red" />
            {text}
          </span>
        )
    },
    {
      title: "Indirizzo IP",
      dataIndex: "ip_address",
      key: "ip_address"
    },
    {
      title: "Dettaglio",
      key: "details",
      render: (text, record) => {
        return (
          <Icon
            key={UUID()}
            style={{ fontSize: "30px", color: "#06C", cursor: "pointer" }}
            type="idcard"
            onClick={() => this.OpendDetails(record)}
          />
        );
      }
    }
  ];
}
