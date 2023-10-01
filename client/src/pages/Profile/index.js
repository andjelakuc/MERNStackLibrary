import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import { useSelector } from "react-redux";
import Staff from "./Staff";
import Reports from "./Reports";
import BasicDetails from "./BasicDetails";
import BorrowedBooks from "./BorrowedBooks";
import Posts from "./Posts";
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
          <TabPane tab="Blogovi" key="4">
            <Posts />
          </TabPane>
        )}

        {role !== "patron" && (
          <TabPane tab="Korisnici" key="5">
            <Users role="patron" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Bibliotekari" key="6">
            <Staff role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admini" key="7">
            <Staff role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Statistika" key="8">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
