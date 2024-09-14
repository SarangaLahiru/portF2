// pages/about.js
import Layout from "../components/Layout";

export default function About() {
  return <h1>About Us</h1>;
}

About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
