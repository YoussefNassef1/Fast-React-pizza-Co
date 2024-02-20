import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className=" right-0">
      <Button type="primary">Add priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
