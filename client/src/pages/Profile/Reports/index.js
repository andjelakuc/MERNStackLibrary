import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetReports } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Reports() {
  const [reports, setReports] = React.useState(null);

  const dispatch = useDispatch();
  const getReports = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReports();
      dispatch(HideLoading());
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <div className="h-75 p-1">
      <Row gutter={[16, 16]}>
        {/* Books */}
        <Col span={6}>
          <div className="shadow p-2 bg-primary">
            <h1 className="text-black text-xl font-bold uppercase">
              Knjige
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Ukupno knjiga</h1>
              <h1>{reports?.books?.booksCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="text-md">Ukupno kopija</h1>
              <h1>{reports?.books?.totalBooksCopiesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Dostupnih kopija</h1>
              <h1>{reports?.books?.availableBooksCopiesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Izdatih knjiga</h1>
              <h1>{reports?.books?.issuesBooksCopiesCount}</h1>
            </div>
          </div>
        </Col>

        {/* Users */}
        <Col span={6}>
          <div className="shadow p-2 bg-primary">
            <h1 className="text-black text-xl font-bold uppercase">
              Korisnici
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Ukupno naloga</h1>
              <h1>{reports?.users?.usersCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="text-md">Korisnici</h1>
              <h1>{reports?.users?.patronsCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Bibliotekari</h1>
              <h1>{reports?.users?.librariansCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Admini</h1>
              <h1>{reports?.users?.adminsCount}</h1>
            </div>
          </div>
        </Col>

        {/* Issues */}
        <Col span={6}>
          <div className="shadow p-2 bg-primary">
            <h1 className="text-black text-xl font-bold uppercase">
              Pozajmice
            </h1>
            <hr />

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Ukupno pozajmica</h1>
              <h1>{reports?.issues?.issuesCount}</h1>
            </div>
            <div className="flex justify-between mt-1">
              <h1 className="text-md">Vraćene pozajmice</h1>
              <h1>{reports?.issues?.returnedIssuesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Na čekanju</h1>
              <h1>{reports?.issues?.pendingIssuesCount}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Prekoračene</h1>
              <h1>{reports?.issues?.overdueIssuesCount || 0}</h1>
            </div>
          </div>
        </Col>

        {/* Revenue */}
        <Col span={6}>
          <div className="shadow p-2 bg-primary">
            <h1 className="text-black text-xl font-bold uppercase">
              Prihod
            </h1>
            <hr />
            <div className="flex justify-between mt-1">
              <h1 className="text-md">Ukupan prihod</h1>
              <h1>{reports?.revenue?.totalCollected}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Prihod od članarina</h1>
              <h1>{reports?.revenue?.feeCollected}</h1>
            </div>

            <div className="flex justify-between mt-1">
              <h1 className="text-md">Prihod od prekoračenja</h1>
              <h1>{reports?.revenue?.fineCollected}</h1>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;