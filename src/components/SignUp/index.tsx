import { AppProvider } from "@shopify/polaris";
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "../adminPanel";
import AttrMapping from "../atrrMapping";
import Connect from "../connect/Connect";
import Faqs from "../faqs/Faqs";
import Graph from "../Graphs";
import Listing from "../listing";
import Login from "../Login";
import MultiLevelSelection from "../multiLevelSelection";
import QueryBuilder from "../queryBulider";
import Register from "../Register";
import Welcome from "../welcome/Welcome";
import enTranslations from "@shopify/polaris/locales/en.json";
import Comments from "../comments";

const SignIn: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/graphs" element={<Graph />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/mapping" element={<AttrMapping />} />
      <Route path="/multi" element={<MultiLevelSelection />} />
      <Route path="/queryBuilder" element={<QueryBuilder />} />
      <Route
        path="adminPanel"
        element={
          <AppProvider i18n={enTranslations}>
            <AdminPanel />{" "}
          </AppProvider>
        }
      />
      <Route
        path="/comments"
        element={
          <AppProvider i18n={enTranslations}>
            <Comments />{" "}
          </AppProvider>
        }
      />
    </Routes>
  );
};

export default SignIn;
