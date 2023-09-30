import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import { useSelector } from "react-redux";
import Staff from "./Staff";
import Reports from "./Reports";
import BasicDetails from "./BasicDetails";
import BorrowedBooks from "./BorrowedBooks";
const TabPane = Tabs.TabPane;

function Profile() {

  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Moje informacije" key="1">
          <BasicDetails />
        </TabPane>

        {role === "patron" && (
             <TabPane tab="Moje knjige" key="2">
             <BorrowedBooks />
           </TabPane>
        )}

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
            <Staff role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admini" key="6">
            <Staff role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Statistika" key="7">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
