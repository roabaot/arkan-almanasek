import Container from "../../common/Container";
import { getServiceCategoriesHome } from "../../../actions/services";
import ServiceHomeClient from "./ServiceHomeClient";

const Service = async () => {
  const { default_services, service_categories } =
    await getServiceCategoriesHome({ debug: true });

  const services = [...default_services, ...service_categories];

  return (
    <div className="section-gap">
      <Container>
        <ServiceHomeClient services={services} />
      </Container>
    </div>
  );
};

export default Service;
