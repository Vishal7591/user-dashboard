import { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import "./details.scss";
import { Button } from "../Button";

export const Details: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiData = location.state;

  return (
    <div className="details">
      <div className="details-inner">
        <img
          src={apiData.info["x-logo"].url}
          alt={apiData.info.title}
          height={70}
        />
        <h3 style={{ paddingInlineStart: 10 }}>{apiData.info.title}</h3>
      </div>
      <div>
        <h4>Description</h4>
        <p className="details-subheading">{apiData.info.description}</p>
      </div>
      <div>
        <h4>Swagger</h4>
        <p className="details-subheading">{apiData.swaggerUrl}</p>
      </div>
      {apiData?.info?.contact && (
        <div>
          <h4>Contact</h4>
          {apiData?.info?.contact?.email && (
            <div className="details-contact">
              <p className="details-subheading">Email</p>
              <p
                className="details-subheading"
                style={{ marginInlineStart: 10 }}
              >
                {apiData.info.contact.email}
              </p>
            </div>
          )}

          {apiData?.info?.contact?.name && (
            <div className="details-contact">
              <p className="details-subheading">Name</p>
              <p
                className="details-subheading"
                style={{ marginInlineStart: 10 }}
              >
                {apiData.info.contact.name}
              </p>
            </div>
          )}

          {apiData?.info?.contact?.url && (
            <div className="details-contact">
              <p className="details-subheading">URL</p>
              <p
                className="details-subheading"
                style={{ marginInlineStart: 10 }}
              >
                {apiData.info.contact.url}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="details-inner">
        <Button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#00224b",
            width: "20%",
          }}
          dangerouslySetInnerHTML={{ __html: "Explore more APIs" }}
        />
      </div>
    </div>
  );
};
