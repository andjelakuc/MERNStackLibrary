import React from "react";

function DonateBook() {
  const data = [
    {
      title: "ŽELITE LI DA DONIRATE KNJIGE?",
      heading: "Možete doneti knjigu svakog radog dana",
      desc: "Pomozite nam da proširimo naš asortiman knjiga!",
    },
  ];
  return (
    <div>
      <section className="Branding wrapper">
        <div className="container">
          {data.map((value) => {
            return (
              <div className="box">
                <h3>{value.title}</h3>
                <h2>{value.heading}</h2>
                <p>{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default DonateBook;
