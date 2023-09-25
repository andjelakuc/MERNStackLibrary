import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
const TabPane = Tabs.TabPane;

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Knjige" key="1">
          <Books />
        </TabPane>
        <TabPane tab="Korisnici" key="2">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
