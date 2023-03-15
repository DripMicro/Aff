import { type NextPage } from "next";
import Head from "next/head";
import { InstallReport } from "../../../components/affiliates/reports/InstallReport";
import styles from "./../../index.module.css";

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Install Report</title>
				<meta
					name="description"
					content="Affiliates Creative Materials"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<InstallReport />
			</main>
		</>
	);
};

export default Page;
