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
        {/* <TabPane tab="General" key="1">
          <BasicDetails />
        </TabPane> */}

        {/* {role === "patron" && (
             <TabPane tab="Books Borrowed" key="2">
             <BorrowedBooks />
           </TabPane>
        )} */}

        {role !== "patron" && (
          <TabPane tab="Knjige" key="3">
            <Books />
          </TabPane>
        )}
        {role !== "patron" && (
          <TabPane tab="Korisnici" key="4">
            <Users role="patron" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Bibliotekari" key="5">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admini" key="6">
            <Users role="admin" />
          </TabPane>
        )}
        {/* {role === "admin" && (
          <TabPane tab="Reports" key="7">
            <Reports />
          </TabPane>
        )} */}
      </Tabs>
    </div>
  );
}

export default Profile;
