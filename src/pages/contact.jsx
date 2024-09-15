// pages/about.js
import Layout from "../components/Layout";

export default function Contact() {
  return <h1>Contact Us</h1>;
}

Contact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
