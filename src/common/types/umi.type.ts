import { Dispatch } from "redux";
import { History } from "history";

export interface IUmiComponentProps {
  history: History;
  dispatch: Dispatch<any>;
}
