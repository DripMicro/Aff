import DeviceReport from "./DeviceReport";
import CountryReport from "./CountryReport";
import AccountManager from "./AccountManager";

const meta = {
  component: DeviceReport,
};

export default meta;

export const DeviceReports = {
  render: () => <DeviceReport />,
};

export const CountryReports = {
  render: () => <CountryReport />,
};

export const AccountManagers = {
  render: () => 
    <AccountManager
      first_name={"FirstName"}
      last_name={"LastName"}
      mail={"Mail"}
    />,
};
