import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import { useSelector } from "react-redux";
const TabPane = Tabs.TabPane;

function Profile() {

  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Knjige" key="1">
          <Books />
        </TabPane>
        <TabPane tab="Korisnici" key="2">
          <Users role="patron"/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
