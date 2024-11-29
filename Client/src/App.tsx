import {Tab, Tabs } from "react-bootstrap";
import Layout from "./components/Layout.tsx";
import {useState} from "react";
import CvEditor from "./components/CvEditor.tsx";
import Overview from "./components/Overview.tsx";
import Interview from "./components/Interview.tsx";

export default function App() {

    const defaultCv = "";

    const [cv, setCv] = useState<string>(defaultCv)

    return (
        <Layout>
            <h1 className="text-center">Your AI-Powered Interview Preparation Assistant</h1>

            <Tabs
                defaultActiveKey="editor"
                className="mb-3"
            >
                <Tab eventKey="editor" title="Editor">
                    <CvEditor cv={cv} setCv={setCv}></CvEditor>
                </Tab>

                <Tab eventKey="overview" title="Overview">
                    <Overview cv={cv}></Overview>
                </Tab>

                <Tab eventKey="interview" title="Interview">
                    <Interview cv={cv}></Interview>
                </Tab>
            </Tabs>
        </Layout>
    );
}
