import React from "react";

export default function NewsItems(props) {
  return (
    <div className="my-3 ">
      <div className={`card bg-${props.mode}`}>
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          {props.name}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img
          src={
            !props.image
              ? "https://th.bing.com/th/id/OIP.LX6tdi8Zc5aR1hdTZ09dXgHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              : props.image
          }
          className="card-img-top"
          alt="..."
        />
        <div
          className={`card-body text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text text-secondary">
            <small>
              By {!props.author ? "Unknown" : props.author} on{" "}
              {new Date(props.date).toGMTString()}
            </small>
          </p>
          <a
            href={props.newsurl}
            target="_blank"
            className={`btn btn-sm btn-${
              props.mode === "light" ? "dark" : "light"
            }`}
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
