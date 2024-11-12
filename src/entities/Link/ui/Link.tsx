import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import style from "./Link.module.css";

interface LinkProps {
  path: string;
  text: string;
}

const Link: FC<LinkProps> = ({ path, text }) => {
  return (
    <NavLink to={path} className={style.link}>
      <button className={style.link_button}>{text}</button>
    </NavLink>
  );
};

export default Link;
