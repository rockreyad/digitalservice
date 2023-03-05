import { ReactComponentElement } from "react";

export interface IRoute {
  name: string;
  component?: ReactComponentElement;
  icon?: ReactComponentElement | string;
  secondary?: boolean;
  path: string;
}
