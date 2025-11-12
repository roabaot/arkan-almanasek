import Container from "../../common/Container";
import { getServiceCategories } from "../../../actions/services";
import ServiceClient from "./ServiceClient";

const Service = async () => {
  const services = await getServiceCategories();

  return (
    <div className="section-gap">
      <Container>
        <ServiceClient services={services} />
      </Container>
    </div>
  );
};

export default Service;
