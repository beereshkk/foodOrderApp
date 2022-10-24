import React from "react";

function Home() {
  return (
    <div>
      <div className="home ">
        <div className="name">
          <font>Order your Food.......</font>
        </div>

        <img
          src="data:image/png;base64,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"
          alt="homeImage"
          height={400}
          width={600}
          style={{ border: "10px" }}
        />
      </div>
    </div>
  );
}

export default Home;