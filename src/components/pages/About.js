import AboutSection from "../AboutSection";
import { connect } from "react-redux";
import { useEffect } from "react";
import { resetAllForm } from "../../actions";
// import Cards from '../Cards';

function About(props) {
  useEffect(() => {
    props.resetAllForm();
  }, []);
  return (
    <>
      <AboutSection />
      {/* <Cards /> */}
    </>
  );
}

export default connect(null, { resetAllForm })(About);
